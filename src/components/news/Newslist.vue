<template>
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.id"
        @click="lujin($route.path)"
      >
        <router-link :to="'/Home/Newslist/Newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "Newslist",
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getnewslist();
  },
  methods: {
    getnewslist() {
      this.$http
        .get("/api/getnewslist")
        .then(res => {
          this.newslist = res.data.message;
        })
        .catch(err => {
          MessageBox("提示", "请求参数错误");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: lightseagreen;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>