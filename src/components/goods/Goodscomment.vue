<template>
  <comment :id="id"></comment>
</template>

<script>
import comment from "../subcomponents/comment";
export default {
  name: "Goodscomment",
  data() {
    return {
      id: this.$route.params.id
    };
  },

  methods: {},
  components: {
    comment
  }
};
</script>

<style>
</style>