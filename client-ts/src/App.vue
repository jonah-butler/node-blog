<script setup lang="ts">
import { RouterView } from "vue-router";
import TopNavigation from "@/components/navigation/top-navigation.vue";

</script>

<template>
  <div>
    <TopNavigation />
    <div class="rounded-b-md bg-off_white site-content flex justify-center p-3">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.site-content {
  min-height: 86vh;
}
</style>
