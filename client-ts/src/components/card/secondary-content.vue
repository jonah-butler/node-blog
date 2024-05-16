<script setup lang="ts">
import {computed, type StyleValue} from "vue";
import { HeartIcon } from "@heroicons/vue/24/solid";
import { type SecondaryContentCardProps } from "./props";
import Blob1 from "@/assets/svgs/blob1.svg";
import Blob2 from "../../assets/svgs/blob2.svg";
import Blob3 from "../../assets/svgs/blob3.svg";
import Blob4 from "../../assets/svgs/blob4.svg";

const props = defineProps<SecondaryContentCardProps>();

const blobSources = [
  Blob1,
  Blob2,
  Blob3,
  Blob4,
];

const blobStyles = computed((): StyleValue => {
  return {
    "background-image": `url(${blobSources[props.index]})`
  }
});

const cardStyles = computed((): any => ({
  "bg-pink-gradient": props.index === 0,
  "bg-blue-gradient": props.index === 1,
  "bg-teal-gradient": props.index === 2,
  "bg-green-gradient": props.index === 3,
}));

</script>

<template>
  <div class="shadow-none mx-3 overflow-hidden min-h-60 max-w-md z-10 shadow-custom card p-5 my-10 shadow-xl" :class="cardStyles">
    <div class="card-body pt-0 text-white">
      <h1 class="text-3xl font-bold">An Approach to Errors in Typescript</h1>
      <p class="font-light">January 12, 2024</p>
      <div class="flex justify-between">
        <span class="flex">
          <HeartIcon class="fill-rose-700 h-8 text-left"/>
          <span class="text-xs opacity-70">12</span>
        </span>
      </div>
    </div>
    <div class="blob" :style="blobStyles"></div>
  </div>
</template>

<style scoped>
/* 4 colored bg style classes */
.bg-pink-gradient {
  background: linear-gradient(130deg,#f06c93,#d84f78);
}
.bg-blue-gradient {
  background: linear-gradient(130deg,#2191fb,#1588f5);
}
.bg-teal-gradient {
  background: linear-gradient(130deg,#09dc9d,#0fbc88);
}
.bg-green-gradient {
  background: linear-gradient(130deg,#6ce037,#5fda27);
}
/* blob styling */
.blob {
  background-repeat: no-repeat;
  position: absolute;
  top: -8rem;
  right: -9rem;
  width: 100%;
  height: 300%;
  opacity: 0.6;
  z-index: -1;
}
</style>