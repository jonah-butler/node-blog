<script setup lang="ts">
import { computed } from 'vue';
import { type ButtonMainEmits } from './emits';
import { type ButtonMainProps } from './props';

const props = defineProps<ButtonMainProps>();
const emit = defineEmits<ButtonMainEmits>();

const buttonStyles = computed((): string => {
  let styles = '';
  if (props.size) {
    styles += 'btn-' + props.size;
  }

  if (props.type) {
    styles += ' btn-' + props.type;
  } else {
    styles += 'bg-deep-purple ';
  }

  return styles;
});

const handleClick = (): void => {
  emit('click');
};
</script>

<template>
  <span>
    <button
      @click="handleClick"
      :disabled="disabled"
      class="btn my-3 mr-3 text-white"
      :class="buttonStyles"
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
