<script setup lang="ts">
import { RouterView } from "vue-router";
import TopNavigation from "@/components/navigation/top-navigation.vue";

</script>

<template>
  <div>
    <TopNavigation />
    <div class="bg-white rounded-b-md site-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.site-content {
  min-height: 86vh;
}
</style>
