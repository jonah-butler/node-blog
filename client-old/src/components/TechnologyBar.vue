<template>
  <div class="flex-container-full justify-center flex-center dir-col">
    <div class="container margin-auto">
      <h3>{{technology}}</h3>
      <div class="skill-container">
        <div
        :style="width"
        class="skill"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnologyBar',
  data() {
    return {

    };
  },
  props: {
    technology: String,
    percent: String,
  },
  computed: {
    width() {
      return `width: ${this.percent}%`;
    },
  },
};
</script>

<style lang="css" scoped>
  .skill {
        background-color: #178bf7;
        color: white;
        padding: .5%;
        text-align: right;
        font-size: 13px;
        border-radius: 15px;
        width: 0%;
        transition: width 3s ease;
    }

    .skill-container{
      background-color: rgb(192, 192, 192);
      border-radius: 15px;
      min-width: 340px;
      max-width: 500px;
    }
</style>
