<template>
  <div class="newsinfo-container">
    <h3 class="maxtitle">{{newsinfo.title}}</h3>
    <p class="mintitle">
      <span>发表时间：{{newsinfo.add_time}}</span>
      <span>点击:{{newsinfo.click}}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>
    <h3>发表评论</h3>
    <hr />
    <textarea
      placeholder="请输入您要BB的内容(最多B个120多字)"
      maxlength="120"
      v-model="msg"
      ref="textarea"
      @click="focus"
    ></textarea>
    <mt-button type="primary" size="large" @click="pushpage">发表评论</mt-button>
    <div class="msg-list">
      <div class="msg-item" v-for="(item,i) in comment" :key="item.add_time">
        <div class="msg-title">第{{i + 1}}楼 用户：{{item.user_name}} 发表时间：2019</div>
        <div class="msg-body">{{item.content==="undefined"?"此用户没写":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="page">加载更多</mt-button>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "Newsinfo",
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {},
      msg: "",
      pageindex: 1,
      comment: []
    };
  },
  created() {
    console.log(this.$route);
    this.getnewsinfo();
    this.getcomment();
  },
  methods: {
    getnewsinfo() {
      this.$http
        .get("/api/getnew/" + this.id)
        .then(res => {
          this.newsinfo = res.data.message[0];
        })
        .catch(err => {
          MessageBox("提示", "请求参数错误");
        });
    },
    // 加载更多
    getcomment() {
      this.$http
        .get("/api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          this.comment = this.comment.concat(res.data.message);
        })
        .catch(err => {
          Toast("加载更多评论参数错误");
        });
    },
    page() {
      this.pageindex++;
      this.getcomment();
    },
    // 发表评论
    pushpage() {
      if (this.msg.trim() === "") {
        return Toast("评论内容不能为空");
      }
      this.$http
        .post("/api/postcomment/" + this.id, { content: this.msg.trim() })
        .then(res => {
          var person = {
            user_name: "匿名用户",
            add_time: Date.now(),
            content: this.msg.trim()
          };
          this.comment.unshift(person);
          this.msg = "";
        })
        .catch(err => {
          Toast("发表评论参数错误");
        });
    },
    focus() {
      if (this.msg === "") {
        this.$refs.textarea.placeholder = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.newsinfo-container {
  padding: 0 4px;

  .maxtitle {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .mintitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    color: lightseagreen;
  }
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .msg-list {
    margin-top: 10px;
    .msg-item {
      font-size: 13px;
      .msg-title {
        background-color: gray;
        line-height: 30px;
      }
      .msg-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>