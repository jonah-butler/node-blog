<script setup lang="ts">
import { type Badge } from './props';
import { type BasicBadgeEmits } from './emits';

defineProps<Badge>();
const emits = defineEmits<BasicBadgeEmits>();

const handleClick = (category: string): void => {
  emits("categoryCallback", category);
}

</script>

<template>
  <div
    @click="handleClick(text)"
    class="bg-deep-purple badge relative m-1 cursor-pointer p-3 text-xs text-white"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.badge {
  font-family: 'Source Code Pro';
  top: 0;
  transition: all 0.2s ease;
}
.badge:hover {
  top: -2px;
}
.badge:active {
  transform: scale(0.95);
}
</style>
