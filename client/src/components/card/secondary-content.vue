<script setup lang="ts">
import Blob1 from '@/assets/svgs/blob1.svg';
import { dateOptions, formatDate } from '@/services/formatting';
import { HeartIcon } from '@heroicons/vue/24/solid';
import { computed, type StyleValue } from 'vue';
import { useRouter } from 'vue-router';
import Blob2 from '../../assets/svgs/blob2.svg';
import Blob3 from '../../assets/svgs/blob3.svg';
import { type SecondaryContentCardProps } from './props';

const props = defineProps<SecondaryContentCardProps>();

const router = useRouter();

const blobSources = [Blob1, Blob2, Blob3];

const blobStyles = computed((): StyleValue => {
  return {
    'background-image': `url(${blobSources[props.index]})`,
    transform: `rotate(${randomRotation()}deg)`,
  };
});

const randomRotation = (): number => {
  return Math.ceil(Math.random() * 360);
};

const cardClass = computed((): any => ({
  '': props.index,
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
    class="shadow-custom content-card card z-10 my-3 ml-3 mr-5 min-h-60 min-w-80 max-w-sm overflow-hidden bg-base-100 p-3 shadow-none shadow-xl"
    :style="cardStyles"
    :class="cardClass"
  >
    <div class="card-body mb-1 p-3">
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
    <!-- <div
      v-if="useBlob !== undefined ? useBlob : true"
      class="blob"
      :style="blobStyles"
    ></div> -->
  </div>
</template>

<style scoped>
/* blob styling */
.blob {
  background-repeat: no-repeat;
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: -1;
}
</style>
