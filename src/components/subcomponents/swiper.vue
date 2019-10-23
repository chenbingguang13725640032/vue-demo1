<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img" class="lunbo" :class="[size===true?'min':'']" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper",
  data() {
    return {};
  },
  methods: {},
  props: ["list", "size"]
};
</script>

<style scoped lang="scss">
.mint-swipe {
  height: 200px;
  text-align: center;
  .lunbo {
    height: 100%;
  }
}

.min {
  min-width: 100%;
}
</style>