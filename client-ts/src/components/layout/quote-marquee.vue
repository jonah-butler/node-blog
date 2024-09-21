<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { generateRandomNumber } from '@/utilities/random';

const activeQuote = ref(0);
// const timeout = ref<ReturnType<typeof setInterval>>();

const quotes = [
  'Did you know sharks are older than trees?',
  'Babies have close to 100 more bones than an adult',
  'The first person who ever got a speeding ticket was going 8 mph',
  'The severed head of a slug can grow a whole new body',
  'The wood frog can hold its pee for up to 8 months',
  'The phenomenon of feeling lost in a mall is known as the Gruen Transfer',
  'The human mouth loses up to 30 percent of taste bud sensitivity in an airplane',
  'Your nostrils work one at a time',
  'Only 2 mammals have an appetite for spicy foods: the human and tree shrew',
  "Rabbits can't vomit",
  'The human body emits a low level glow that is around 1,000 times less intense than normal visible light levels',
  'Cotton candy was invented by a dentist',
];

const randomQuote = computed((): string => {
  return quotes[activeQuote.value];
});

onBeforeMount((): void => {
  activeQuote.value = generateRandomNumber(0, quotes.length - 1);
});
</script>

<template>
  <div class="w-100 py-6">
    {{ randomQuote }}
  </div>
</template>

<style scoped></style>
