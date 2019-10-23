<template>
  <div>
    <h3>发表评论</h3>
    <hr />
    <textarea
      maxlength="120"
      placeholder="请输入你要BB的内容（最多b个120字）"
      v-model="msg"
      @click="focus"
      ref="textarea"
    ></textarea>
    <mt-button type="primary" size="large" style="margin-bottom:5px;" @click="pushpage">发表评论</mt-button>
    <transition-group appear tag="div">
      <div class="ly" v-for="(item,i) in comment" :key="item.add_time">
        <p>第{{i+1}}楼&nbsp;&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：2019-10-11 12:12:12</p>
        <p>{{item.content==="undefined"?"此用户没写":item.content}}</p>
      </div>
    </transition-group>
    <mt-button type="danger" size="large" plain @click="page">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "Goodscomment",
  data() {
    return {
      msg: "",
      comment: [],
      pageindex: 1
    };
  },
  created() {
    this.getcomment();
  },
  methods: {
    focus() {
      if (this.msg === "") {
        this.$refs.textarea.placeholder = "";
      }
    },
    getcomment() {
      this.$http
        .get("/api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          this.comment = this.comment.concat(res.data.message);
        })
        .catch(err => {
          Toast("获取评论参数错误");
        });
    },
    page() {
      this.pageindex++;
      this.getcomment();
    },
    pushpage() {
      if (this.msg === "") {
        return Toast("不能发表空评论");
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
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 20px;
}

textarea {
  font-size: 14px;
  height: 88px;
  margin: 0;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-leave-active {
  position: absolute;
}

.ly {
  p:first-child {
    color: black;
    background-color: gray;
    line-height: 30px;
  }
  p:last-child {
    color: black;
  }
}
</style>