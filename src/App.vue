<template>
  <div class="app-container">
    <mt-header fixed title="陈炳光vue-webapp1" ref="header">
      <span slot="left" @click="goback" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab" style="display:flex;justify-content:space-around">
      <span @click="lujin($route.path)">
        <router-link class="mui-tab-item--cbg mui-active" to="/Home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
      </span>
      <span @click="lujin($route.path)">
        <router-link class="mui-tab-item--cbg" to="/Search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </span>
      <span @click="lujin($route.path)">
        <router-link class="mui-tab-item--cbg" to="/Shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <i class="iconfont icon-qicheqianlian-1"></i>
            <span class="mui-badge">{{$store.getters.getallcount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
      </span>
      <span @click="lujin($route.path)">
        <router-link class="mui-tab-item--cbg" to="/Me">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">我</span>
        </router-link>
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    if (this.$route.path === "/Home") {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
  updated() {
    this.lujin(this.$route.path);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/Home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;

  .mint-header {
    z-index: 99;
  }
  .mui-bar-tab .mui-tab-item--cbg.router-link-active {
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-item--cbg {
    display: table-cell;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item--cbg .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-item--cbg .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
