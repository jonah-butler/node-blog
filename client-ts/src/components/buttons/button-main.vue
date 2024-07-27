<script setup lang="ts">
import { type ButtonMainProps } from './props';
import { type ButtonMainEmits } from './emits';

defineProps<ButtonMainProps>();
const emit = defineEmits<ButtonMainEmits>();

const handleClick = (): void => {
  emit('click');
};
</script>

<template>
  <span>
    <button
      @click="handleClick"
      :disabled="disabled"
      class="bg-deep-purple btn my-3 mr-3 text-white"
      :class="size"
    >
      <span v-if="!loading">{{ text }}</span>
      <span v-else class="loading loading-spinner text-secondary"></span>
    </button>
  </span>
</template>

<style scoped>
.btn-main:hover {
  background-color: #633c7f !important;
}
</style>
