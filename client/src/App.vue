<script setup lang="ts">
import TopNavigation from '@/components/navigation/top-navigation.vue';
import { useThemeStore } from '@/stores/theme';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

const themeStore = useThemeStore();

const { getTheme, setTheme } = themeStore;

onMounted((): void => {
  setTheme(getTheme());
});
</script>

<template>
  <div>
    <TopNavigation />
    <div class="site-content flex justify-center rounded-b-md bg-base-100">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.site-content {
  min-height: 86vh;
}
</style>
