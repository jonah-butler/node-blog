<script setup lang="ts">
import { RouterView } from "vue-router";
import TopNavigation from "@/components/navigation/top-navigation.vue";

</script>

<template>
  <div>
    <TopNavigation />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
