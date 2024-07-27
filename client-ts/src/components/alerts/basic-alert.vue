<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import { type BasicAlert } from './props';
import { type BasicAlertEmits } from './emits';

defineProps<BasicAlert>();

const emits = defineEmits<BasicAlertEmits>();

const handleClick = (): void => {
  emits('dismissCallback');
};
</script>

<template>
  <div role="alert" class="alert my-4" :class="type">
    <ExclamationTriangleIcon class="h-8 fill-white" />
    <span class="text-white">{{ message }}</span>
    <div>
      <button
        v-if="useDismiss"
        @click="handleClick"
        class="btn btn-warning bg-white hover:bg-zinc-100"
      >
        {{ dismissText || 'dismiss' }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
