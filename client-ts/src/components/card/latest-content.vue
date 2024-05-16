<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { HeartIcon } from "@heroicons/vue/24/solid";
import NewContentBadge from "@/components/badges/new-content.vue";

const bg_image = "https://dev-blog-resources.s3.amazonaws.com/canvas_1710820686255.png";

const backgroundStyles = computed((): StyleValue => {
  return {
    "background": `url(${bg_image})`,
  }
})

</script>

<template>
<div class="shadow-none self-center shadow-custom card p-5 w-full my-10 min-w-64 max-w-3xl bg-white shadow-xl">
  <section :style="backgroundStyles" class="featured-image rounded-md">
  </section>
  <div class="card-body pt-0">
    <h1 class="text-3xl font-bold">An Approach to Errors in Typescript</h1>
    <p class="font-light">January 12, 2024</p>
    <div class="flex justify-between">
      <span class="flex">
        <HeartIcon class="fill-rose-700 h-8 text-left"/>
        <span class="text-xs opacity-70">12</span>
      </span>
      <span>
        <NewContentBadge />
      </span>
    </div>
  </div>
</div>
</template>

<style>
.card {
  transition: all .3s ease;
  border: 2px solid transparent;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 0 0 0 #4b3742;
  right: -10px;
  bottom: -6px;
  border: 2px solid #fb7099;
}
section.featured-image {
  position: relative;
  top: -3rem;
}
.featured-image {
  height: 220px;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
</style>