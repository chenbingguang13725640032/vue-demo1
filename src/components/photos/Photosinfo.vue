<template>
  <div class="pi-container">
    <div class="piheader">
      <div class="title">{{photosinfo.title}}</div>
      <div class="flex">
        <p>时间：{{photosinfo.add_time}}</p>
        <p>点击：{{photosinfo.click}}次</p>
      </div>
    </div>
    <hr />
    <div class="thumbs">
      <vue-preview :slides="thumb"></vue-preview>
    </div>
    <div class="center" v-html="photosinfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment";
import { Toast } from "mint-ui";
export default {
  name: "photosinfo",
  data() {
    return {
      id: this.$route.params.id,
      photosinfo: {},
      thumb: []
    };
  },
  created() {
    this.getphotosinfo();
    this.getthumbs();
  },
  methods: {
    getphotosinfo() {
      this.$http
        .get("/api/getimageInfo/" + this.id)
        .then(res => {
          this.photosinfo = res.data.message[0];
        })
        .catch(err => {
          Toast("获取图片详情参数错误");
        });
    },
    getthumbs() {
      this.$http
        .get("/api/getthumimages/" + this.id)
        .then(res => {
          this.thumb = res.data.message;
          this.thumb.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.src = item.src;
            item.msrc = item.src;
          });
        })
        .catch(err => {
          Toast("获取缩略图数据失败");
        });
    }
  },
  components: {
    comment
  }
};
</script>

<style scoped lang="scss">
.pi-container {
  .piheader {
    .title {
      font-size: 14px;
      text-align: center;
      margin: 15px 0;
      color: lightseagreen;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
      }
    }
  }
  .center {
    font-size: 13px;
    line-height: 29px;
  }

  h3 {
    font-size: 18px;
  }

  textarea {
    height: 84px;
    font-size: 14px;
  }

  .msg-list {
    list-style: none;
    padding: 0;
    .msg-item {
      .msg-p1 {
        background-color: grey;
        line-height: 30px;
        color: black;
        margin: 0;
      }
      .msg-p2 {
        line-height: 35px;
        color: black;
        margin: 0;
      }
    }
  }
}

.thumbs {
  /deep/ .my-gallery {
    //deep深层作用选择器
    display: flex;
    flex-wrap: wrap; //默认换行
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        box-shadow: 0 0 8px #999;
        border-radius: 5px;
      }
    }
  }
}
</style>