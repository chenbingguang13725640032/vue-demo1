<template>
  <div class="Member-container">
    <div class="header">
      <div></div>
    </div>
    <p class="author">陈炳光</p>
    <div class="mui-card">
      <div class="mui-card-header">项目名称:Vue小项目</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>项目框架:Vue2.x</p>
          <p>UI框架:Mint-ui,mui</p>
          <p>打包工具:Vue-cli</p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">作者：陈炳光</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>微信：cbg13725640032</p>
          <p>电话：13725640032</p>
          <p>邮箱：1245184483@qq.com</p>
        </div>
        <hr />
        <div class="flex">
          <a id="icon-phone">
            <span class="mui-icon mui-icon-phone" style="line-height: 1px;"></span>
          </a>
          <a href="javaScript:void(0)">联系我</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Me"
};
</script>

<style lang="scss" scoped>
.Member-container {
  .header {
    display: flex;
    overflow: hidden;
    justify-content: center;
    padding-top: 19px;
    div {
      width: 126px;
      height: 126px;
      background-image: url(../../assets/logo/webwxgetmsgimg_看图王.jpg);
      background-size: cover;
      background-position: 7px 12%;
      border-radius: 50%;
      border: 1px solid gainsboro;
    }
  }
  .author {
    text-align: center;
    padding-top: 7px;
    font-size: 15px;
  }
  .mui-card {
    box-shadow: 0px 0px 5px #999;
    text-align: left;
    .mui-card-content-inner {
      position: relative;
      padding: 11px;
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    a {
      color: #2b7fdb;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>