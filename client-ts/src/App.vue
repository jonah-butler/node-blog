<script setup lang="ts">
import { RouterView } from "vue-router";
// import TopNavigation from "@/components/navigation/top-navigation.vue";

</script>

<template>
  <div>
    <!-- <TopNavigation /> -->
    <div class="navbar bg-base-100">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
