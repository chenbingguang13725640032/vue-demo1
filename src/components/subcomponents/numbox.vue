<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" value="1" ref="numbox" @change="gwchange" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../mui/dist/js/mui.min.js";
export default {
  name: "numbox",
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    gwchange() {
      this.$emit("func", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    max: function(newVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style>
</style>