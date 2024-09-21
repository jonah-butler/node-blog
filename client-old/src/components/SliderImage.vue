<template>
  <div class="img-container">
    <img
    @load="loadImage"
    :src="src"
    alt="">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
  },
  methods: {
    loadImage() {
      console.log('images loaded');
      this.$emit('loaded', true);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
