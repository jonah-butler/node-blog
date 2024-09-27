<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type CategoricalProps } from './props';
import { type CategoricalEmits } from './emits';

const props = defineProps<CategoricalProps>();
const emits = defineEmits<CategoricalEmits>();

const setupCategories = (): string[] => {
  if (Array.isArray(props.data)) {
    return props.data;
  }
  if (props.data === '') {
    return [];
  }

  return JSON.parse(props.data);
};

const values = ref<string[]>(setupCategories());
const inputValue = ref('');
const input = ref<HTMLInputElement>();

const keyDownListener = (): void => {
  input.value?.addEventListener('keydown', (e): void => {
    if (inputValue.value == '') return;
    if (e.key === 'Enter') {
      const sanitized = sanitizeInput();
      if (!valueExists(sanitized)) {
        values.value.push(sanitized);
        inputValue.value = '';
        emits('update:data', JSON.stringify(values.value));
      }
    }
  });
};

const sanitizeInput = (): string => {
  const regex = /[^a-zA-Z0-9-\s]/g;
  return inputValue.value.replace(regex, '');
};

const valueExists = (sanitizedValue: string): boolean => {
  return (
    values.value.findIndex((value: string): boolean => {
      return value == sanitizedValue;
    }) !== -1
  );
};

const removeCategory = (index: number): void => {
  values.value.splice(index, 1);
  emits('update:data', JSON.stringify(values.value));
};

onMounted((): void => {
  keyDownListener();
});
</script>

<template>
  <div class="max-w-96">
    <div class="label">
      <span class="label-text-alt">{{ label }}</span>
    </div>
    <div>
      <span
        v-for="(value, i) in values"
        :key="value"
        class="badge badge-secondary my-3 mr-1"
      >
        {{ value }}
        <svg
          @click="removeCategory(i)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="ml-2 inline-block h-4 w-4 cursor-pointer stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </span>
    </div>
    <label
      class="input input-bordered input-secondary flex w-full max-w-xs items-center gap-2"
    >
      <input
        type="text"
        class="grow"
        placeholder="Start Typing"
        v-model="inputValue"
        ref="input"
      />
      <kbd class="kbd kbd-sm">enter</kbd>
    </label>
  </div>
  <div class="label">
    <span class="label-text-alt text-stone-400">
      only alpha-numeric characters, spaces and dashes allowed
    </span>
  </div>
</template>

<style scoped></style>
