<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      class="mui-input-numbox"
      type="number"
      :value="num"
      readonly
      ref="numbox"
      @change="gwchange"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../mui/dist/js/mui.min.js";
export default {
  name: "numboxfb",
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    gwchange() {
      console.log(this.$refs.numbox.value + "---" + this.id);
      this.$store.commit("updatecarcount", {
        id: this.id,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["num", "id"]
};
</script>

<style>
</style>