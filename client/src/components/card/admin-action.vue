<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type AdminActionCardProps } from './props';

const props = defineProps<AdminActionCardProps>();

const router = useRouter();

const navigate = (): void => {
  router.push(props.route);
};
</script>

<template>
  <div
    class="shadow-custom content-card bg-secondary-vibrant card m-5 max-h-52 w-96 text-white"
    @click="navigate"
  >
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped></style>
