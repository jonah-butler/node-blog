<script setup lang="ts">
import { type BasicBadgeEmits } from './emits';
import { type Badge } from './props';

defineProps<Badge>();
const emits = defineEmits<BasicBadgeEmits>();

const handleClick = (category: string): void => {
  emits('categoryCallback', category);
};
</script>

<template>
  <div
    @click="handleClick(text)"
    class="badge relative m-1 cursor-pointer whitespace-nowrap p-3 text-xs text-white"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.badge {
  font-family: 'Source Code Pro';
  top: 0;
  transition: all 0.2s ease;
  background: oklch(var(--secondary-vibrant));
}
.badge:hover {
  top: -2px;
}
.badge:active {
  transform: scale(0.95);
}
</style>
