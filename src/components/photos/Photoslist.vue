<template>
  <div>
    <div
      id="sliderSegmentedControl"
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item',item.id===0?'mui-active':'']"
          v-for="item in nav"
          :key="item.id"
          @click="getlist(item.id)"
        >{{item.title}}</a>
      </div>
    </div>
    <ul class="list">
      <li v-for="item in list" :key="item.id" @click="lujin($route.path)">
        <router-link :to="'/Home/Photoslist/Photosinfo/' + item.id">
          <img v-lazy="item.img_url" />
          <div class="list-body">
            <p class="title">{{item.title}}</p>
            <p class="center">{{item.zhaiyao}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from "../../mui/dist/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  name: "Photoslist",
  data() {
    return {
      nav: [],
      list: [] //导航栏数据
    };
  },

  created() {
    this.getnav();
    this.getlist(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getnav() {
      this.$http
        .get("/api/getimgcategory")
        .then(res => {
          res.data.message.unshift({ title: "全部", id: 0 });
          this.nav = res.data.message;
        })
        .catch(err => {
          Toast("获取导航栏数据参数错误");
        });
    },
    getlist(id) {
      this.$http
        .get("/api/getimages/" + id)
        .then(res => {
          this.list = res.data.message;
        })
        .catch(err => {
          Toast("获取图片列表参数错误");
        });
    }
  }
};
</script>

<style scoped lang="scss">
* {
  touch-action: pan-y;
}

.list {
  list-style: none;
  margin: 5px 0 0 0;
  padding: 0;
  li {
    position: relative;
    box-shadow: 0 0 6px gray;
    text-align: center;
    margin: 8px 10px;
    background-color: gray;
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    img {
      width: 100%;
      vertical-align: middle;
    }
    .list-body {
      text-align: left;
      position: absolute;
      bottom: 0;
      background: rgba(32, 32, 32, 0.4);
      max-height: 100px;
      .title {
        font-size: 14px;
        color: white;
      }
      .center {
        font-size: 13px;
        color: white;
      }
    }
  }
}
</style>