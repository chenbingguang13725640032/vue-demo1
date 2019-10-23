<template>
  <div>
    <div class="mui-content">
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getzhuangtai[item.id]"
              @change="ztgb(item.id,$store.getters.getzhuangtai[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{item.title}}</h1>
              <span>{{item.sell_price}}</span>
              <numboxfb :num="$store.getters.getgoodscount[item.id]" :id="item.id"></numboxfb>
              <a href="#" @click.prevent="remove(index,item.id)">删除</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" style="position:relative">
            <div style="display:flex;flex-direction:column;">
              <span>总价</span>
              <p style="margin:0">
                已勾选商品
                <span style="color:red;font-size:16px;">{{$store.getters.getsum.num}}</span>件,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计 ￥
                <span style="color:red;font-size:18px;">{{$store.getters.getsum.sum}}</span>
              </p>
            </div>
            <mt-button
              type="danger"
              size="small"
              style="position:absolute;bottom:20px;right:20px;"
            >去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numboxfb from "../subcomponents/numboxfb";
import { Toast } from "mint-ui";
export default {
  name: "Shopcar",
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      var arr = [];
      this.$store.state.car.forEach(item => {
        arr.push(item.id);
      });
      if (arr.length <= 0) {
        return;
      }
      this.$http
        .get("/api/goods/getshopcarlist/" + arr.join(","))
        .then(res => {
          console.log(res);
          this.goodslist = res.data.message;
        })
        .catch(err => {
          Toast("获取购物车商品列表参数错误");
        });
    },
    remove(index, id) {
      this.goodslist.splice(index, 1);
      this.$store.commit("caritemremove", id);
    },
    ztgb(id, zhuangtai) {
      console.log(id + "---" + zhuangtai);
      this.$store.commit("updatecarzhuangtai", {
        id,
        zhuangtai
      });
    }
  },
  components: {
    numboxfb
  }
};
</script>

<style scoped lang="scss">
.mui-content {
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;

    img {
      width: 60px;
      height: 60px;
    }
    .info {
      h1 {
        font-size: 13px;
      }
      span {
        color: red;
      }
    }
  }
}
</style>