<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type MainLink } from './props';
import { dateOptions, formatDate } from '@/services/formatting';

defineProps<MainLink>();

const router = useRouter();

const navigate = (slug: string): void => {
  console.log(slug);
  router.push(slug);
};
</script>

<template>
  <div class="main-link-container container my-2">
    <p v-if="createdAt" class="font-light">
      {{ formatDate(createdAt, dateOptions.monthDayYear) }}
    </p>
    <p v-if="prefix" class="text-xs font-medium">{{ prefix }}</p>
    <h1
      @click="navigate(`${slug}`)"
      class="main-link relative z-10 p-2 text-xl font-bold"
    >
      {{ title }}
    </h1>
  </div>
</template>

<style scoped>
.main-link-container {
  width: fit-content;
}
.main-link:before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: -0.5rem;
  border-radius: 20px;
  background: #fa709a;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
  z-index: -1;
}
.main-link:hover {
  cursor: pointer;
  color: white;
}
.main-link:hover:before {
  width: 100%;
  height: 100%;
  opacity: 1;
  left: 0rem;
}
</style>
