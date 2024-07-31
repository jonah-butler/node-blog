<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, type StyleValue } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/solid';
import { type SecondaryContentCardProps } from './props';
import Blob1 from '@/assets/svgs/blob1.svg';
import Blob2 from '../../assets/svgs/blob2.svg';
import Blob3 from '../../assets/svgs/blob3.svg';
import { dateOptions, formatDate } from '@/services/formatting';

const props = defineProps<SecondaryContentCardProps>();

const router = useRouter();

const blobSources = [Blob1, Blob2, Blob3];

const blobStyles = computed((): StyleValue => {
  return {
    'background-image': `url(${blobSources[props.index]})`,
  };
});

const cardClass = computed((): any => ({
  'bg-pink-gradient': props.index === 0,
  'bg-blue-gradient': props.index === 1,
  'bg-teal-gradient': props.index === 2,
  '': props.index === -1,
}));

const cardStyles = computed((): StyleValue => {
  return {
    'background-color': props.backgroundColor
      ? `${props.backgroundColor} !important`
      : '',
  };
});

const navigate = (slug: string): void => {
  router.push(slug);
};
</script>

<template>
  <div
    @click="navigate(`/blog/${blog.slug}`)"
    class="shadow-custom content-card card z-10 mx-3 my-5 min-h-60 max-w-sm overflow-hidden p-5 shadow-none shadow-xl"
    :style="cardStyles"
    :class="cardClass"
  >
    <div class="card-body pt-0 text-white">
      <h1 class="text-3xl font-bold">{{ blog.title }}</h1>
      <p class="font-light">
        {{ formatDate(blog.createdAt, dateOptions.monthDayYear) }}
      </p>
      <div class="flex justify-between">
        <span class="flex">
          <HeartIcon class="h-8 fill-rose-700 text-left" />
          <span class="text-xs opacity-70">{{ blog.rating }}</span>
        </span>
      </div>
    </div>
    <div
      v-if="useBlob !== undefined ? useBlob : true"
      class="blob"
      :style="blobStyles"
    ></div>
  </div>
</template>

<style scoped>
/* blob styling */
.blob {
  background-repeat: no-repeat;
  position: absolute;
  top: -8rem;
  right: -9rem;
  width: 100%;
  height: 300%;
  opacity: 0.6;
  z-index: -1;
}
</style>
