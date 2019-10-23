<template>
  <div>
    <h3>{{desc.title}}</h3>
    <hr />
    <div class="connent" v-html="desc.content"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Goodsdesc",
  data() {
    return {
      id: this.$route.params.id,
      desc: {}
    };
  },
  created() {
    this.getdesc();
  },
  methods: {
    getdesc() {
      this.$http
        .get("/api/goods/getdesc/" + this.id)
        .then(res => {
          this.desc = res.data.message[0];
        })
        .catch(err => {
          Toast("获取商品介绍参数错误");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  color: #26a2ff;
  font-size: 20px;
  text-align: center;
}

.connent {
  p {
    img {
      width: 100%;
    }
  }
}
</style>