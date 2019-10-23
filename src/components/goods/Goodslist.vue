<template>
  <div>
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="pushrouter(item.id)">
        <img :src="item.img_url" alt />
        <h3>{{item.title}}</h3>
        <div class="info">
          <p>
            <span>￥{{item.sell_price}}</span>
            <span>￥{{item.market_price}}</span>
          </p>
          <p>
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="page">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Goodslist",
  data() {
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      this.$http
        .get("/api/getgoods?pageindex=" + this.pageindex)
        .then(res => {
          this.goodslist = this.goodslist.concat(res.data.message);
        })
        .catch(err => {
          Toast("获取图片列表信息错误");
        });
    },
    page() {
      this.pageindex++;
      this.getgoodslist();
    },
    pushrouter(id) {
      this.$router.push("/Home/Goodslist/Goodsinfo/" + id);
      this.lujin(this.$route.path);
    }
  }
};
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 8px;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;
    img {
      width: 100%;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .info {
      background-color: #eee;
      p:first-child {
        padding: 10px 0;
        margin: 0;
        span:first-child {
          font-size: 16px;
          font-weight: bold;
          color: red;
          padding-right: 20px;
        }
        span:last-child {
          text-decoration: line-through;
        }
      }
      p:last-child {
        margin: 0;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding: 2px 5px;
      }
    }
  }
}
</style>