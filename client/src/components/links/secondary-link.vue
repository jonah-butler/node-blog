<script setup lang="ts">
import { type SecondaryLink } from './props';

// create basic emitter so
// it can have dynamic click functionality
// from parent component

defineProps<SecondaryLink>();
</script>

<template>
  <div class="secondary-link-container container z-10 my-3">
    <span
      v-if="loading"
      class="secondary-link loading loading-spinner loading-sm relative p-2 text-xl"
    ></span>
    <h1 v-else class="secondary-link relative p-2 text-xl">
      {{ title }}
    </h1>
  </div>
</template>

<style scoped>
.secondary-link-container {
  width: fit-content;
}
.secondary-link:before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: -0.5rem;
  border-radius: 20px;
  background: oklch(var(--secondary-vibrant-complementary));
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
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
