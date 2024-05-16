<script setup lang="ts">
import { type SecondaryLink } from "./props";

defineProps<SecondaryLink>();

</script>

<template>
  <div class="container my-3 secondary-link-container z-10">
    <h1 class="text-xl secondary-link relative p-2">{{ title }}</h1>
  </div>
</template>

<style scoped>
.secondary-link-container {
  width: fit-content;
}
.secondary-link:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: -0.5rem;
  border-radius: 20px;
  background: #09dc9d;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  transition: all .2s ease;
  z-index: -1;
}
.secondary-link:hover {
  cursor: pointer;
  color: white;
}
.secondary-link:hover:before {
  width: 100%;
  height: 100%;
  opacity: 1;
  left: 0rem;
}
</style>
