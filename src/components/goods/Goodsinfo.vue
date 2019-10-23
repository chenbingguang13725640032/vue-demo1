<template>
  <div style="background-color:#eee;overflow:hidden;">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
     <div class="ball" v-show="flag" ref="ball"></div>
     </transition>
  <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
          <swiper :list="lunbotu"></swiper>
					</div>
				</div>
			</div>
      <div class="mui-card">
      	<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
              <p class="p1">
                <span>市场价：<del>${{goodsinfo.market_price}}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span class="sp1">￥{{goodsinfo.sell_price}}</span></span>
                <div class="gm" style="margin-bottom:8px;">
                  <span style="color:#8f8f94;">购买数量：</span>
                  <numbox @func="getcount" :max="goodsinfo.stock_quantity"></numbox>
                </div>
              <mt-button type="primary" size="small">立即购买</mt-button>
               <mt-button type="danger" size="small" @click="ballflag">加入购物车</mt-button>
              </p>
					</div>
				</div>
      </div>
         <div class="mui-card">
      	<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <div class="info">
              <p>商品货号：{{goodsinfo.goods_no}}</p>
              <p>库存情况：{{goodsinfo.stock_quantity}}</p>
              <p>上架时间：{{goodsinfo.add_time}}</p>
            </div>
					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评论</mt-button>
        </div>
      </div>
      </div>
</template>

<script>
import swiper from "../subcomponents/swiper"
import { Toast } from "mint-ui"
import numbox from "../subcomponents/numbox"
export default {
    name:"Goodsinfo",
    data(){
        return {
          id:this.$route.params.id,
          lunbotu:[],
          goodsinfo:{},
          flag:false,
          gwnum:1
        }
    },
    created(){
      this.getlunbo();
      this.getgoodsinfo()
    },
    methods:{
      getlunbo(){
        this.$http.get("/api/getthumimages/" + this.id).then(res=>{
          res.data.message.forEach(item=>{
            item.img = item.src; 
          })
          
          this.lunbotu = res.data.message;
          
        })
        .catch(err=>{
          Toast("获取轮播图参数错误")
        })
      },
      getgoodsinfo(){
        this.$http.get("/api/goods/getinfo/" + this.id).then(res=>{
          this.goodsinfo = res.data.message[0];
        })
        .catch(err=>{
          Toast("获取商品信息参数错误")
        })
      },
      godesc(id){
        this.$router.push({name:"Goodsdesc",params:{id:id}})
        this.lujin(this.$route.path)
      },
      gocomment(id){
        this.$router.push({name:"Goodscomment",params:{id:id}})
        this.lujin(this.$route.path)
      },
      ballflag(){
        this.flag = !this.flag;
        var goodsinfo = {
          id:this.id,
          count:this.gwnum,
          price:this.goodsinfo.sell_price,
          zhuangtai:true
        }
        this.$store.commit("addcar",goodsinfo)
      },
      beforeEnter(el){
        el.style.transform = "translate(0,0)";
      },
      enter(el,done){
        el.offsetWidth;
        var badge = document.getElementsByClassName("mui-badge")[0];
        var shang = badge.getBoundingClientRect().top - this.$refs.ball.getBoundingClientRect().top;
        var zuo = badge.getBoundingClientRect().left - this.$refs.ball.getBoundingClientRect().left;
        el.style.transform = "translate(" + zuo + "px" + "," + shang + "px" + ")";
        el.style.transition = "all .5s cubic-bezier(0.4,-0.3,1,0.68)";
        done()
      },
      afterEnter(el){
        this.flag = !this.flag;
      },
      gwchange(){
        this.gwnum = this.$refs.numbox.value;
      },
      getcount(count){
        this.gwnum = count;
      
      }
    },
    components:{
      numbox,
      swiper
    }
}
</script>

<style scoped lang="scss">
 

  .p1{
    .sp1{
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
   
  }

  .mui-card-footer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button{
      margin: 8px 0;
    }
  }

  
    .ball{
     width: 15px;
     height: 15px;
     border-radius: 50%;
     background-color: red; 
     position:absolute;
     z-index: 99;
     top: 409px;
     left: 152px;
   
    }
 
</style>