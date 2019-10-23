<template>
  <div>
    <swiper :list="lunbotulist" :size="true"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
        @click="lujin($route.path)"
      >
        <router-link to="/Home/Newslist">
          <img src="../../assets/logo/xinwen.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
        @click="lujin($route.path)"
      >
        <router-link to="/Home/Photoslist">
          <img src="../../assets/logo/tupian.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
        @click="lujin($route.path)"
      >
        <router-link to="/Home/Goodslist">
          <img src="../../assets/logo/gowuche.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="toast">
        <a href="#">
          <img src="../../assets/logo/liuyan.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="toast">
        <a href="#">
          <img src="../../assets/logo/shiping.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/Me">
          <img src="../../assets/logo/dianhua.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper";
import { MessageBox } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      lunbotulist: []
    };
  },
  created() {
    this.getlunbotu();
  },
  methods: {
    getlunbotu() {
      this.$http
        .get("/api/getlunbo")
        .then(res => {
          res.data.message[0].img =
            "http://p0.ssl.cdn.btime.com/t013820cd357428f71e.jpg?size=580x313";
          res.data.message[1].img =
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571842402640&di=fe5a2da57bfddf946d06853c4d366ed7&imgtype=0&src=http%3A%2F%2Fwww.people.com.cn%2Fmediafile%2Fpic%2F20140915%2F82%2F15048173394312543494.jpg";
          res.data.message[2].img =
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2843126538,2276819968&fm=26&gp=0.jpg";
          this.lunbotulist = res.data.message;
        })
        .catch(err => {
          MessageBox("提示", "请求参数错误");
        });
    },
    toast() {
      MessageBox("暂无数据接口开发");
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped lang="scss">
.mui-grid-9 {
  background-color: white;
  border: none;
  li {
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }
}
</style>