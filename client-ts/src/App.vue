<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopNavigation from '@/components/navigation/top-navigation.vue';
</script>

<template>
  <div>
    <TopNavigation />
    <div class="bg-off_white site-content flex justify-center rounded-b-md">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.site-content {
  min-height: 86vh;
}
</style>
