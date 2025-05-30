<script setup lang="ts">
import NewContentBadge from '@/components/badges/new-content.vue';
import { dateOptions, formatDate } from '@/services/formatting';
import { HeartIcon } from '@heroicons/vue/24/solid';
import { computed, type StyleValue } from 'vue';
import { useRouter } from 'vue-router';
import { type ContentCardProps } from './props';

const props = defineProps<ContentCardProps>();

const router = useRouter();

const bg_image = props.blog.featuredImageLocation;

const backgroundStyles = computed((): StyleValue => {
  return {
    background: `url(${bg_image})`,
  };
});

const navigate = (slug: string): void => {
  router.push(slug);
};
</script>

<template>
  <div
    @click="navigate(`/blog/${blog.slug}`)"
    class="shadow-custom content-card card my-3 ml-3 mr-5 w-full min-w-64 max-w-3xl self-center bg-base-100 p-5 shadow-none shadow-xl"
  >
    <section
      :style="backgroundStyles"
      class="featured-image hidden rounded-md sm:block"
    ></section>
    <div class="card-body p-3">
      <h1 class="text-3xl font-bold">{{ blog.title }}</h1>
      <p class="color-base-100">
        {{ formatDate(blog.createdAt, dateOptions.monthDayYear) }}
      </p>
      <div class="flex justify-between">
        <span class="flex">
          <HeartIcon class="h-8 fill-rose-700 text-left" />
          <span class="text-xs opacity-70">{{ blog.rating }}</span>
        </span>
        <span>
          <NewContentBadge />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
section.featured-image {
  position: relative;
  top: -3rem;
}
.featured-image {
  height: 220px;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
</style>
