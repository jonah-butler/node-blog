<script setup lang="ts">
import BasicAlert from '@/components/alerts/basic-alert.vue';
import JumpingDotsLoader from '@/components/loaders/jumping-dots.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { type Blog } from '@/types/services';
import { computed, ref } from 'vue';
import LatestContentCard from '../components/card/latest-content.vue';
import SecondaryContentCard from '../components/card/secondary-content.vue';
import MainLink from '../components/links/main-link.vue';
import SecondaryLink from '../components/links/secondary-link.vue';
import { generateRandomNumber } from '../utilities/random';

const loading = ref(true);
const moreBlogsLoading = ref(false);

const hasMore = ref(true);

const error = ref('');
const offset = ref(0);
const offsetLimit = 10;

const blogs = ref<Blog[]>([]);

const latestBlog = ref<Blog>({} as Blog);
const secondaryBlogs = ref<Blog[]>([]);
const remainingBlogs = ref<Blog[]>([]);

const hasLatestBlog = computed((): boolean => {
  return Object.keys(latestBlog.value).length > 0;
});

const hasSecondaryBlogs = computed((): boolean => {
  return Object.keys(secondaryBlogs.value).length > 0;
});

const hasRemainingBlogs = computed((): boolean => {
  return Object.keys(remainingBlogs.value).length > 0;
});

const getBlogs = async (): Promise<void> => {
  loading.value = true;

  try {
    const response = await BlogService.getBlogs();

    blogs.value = response.blogs;
    hasMore.value = response.hasMore;

    // get latest blog
    latestBlog.value = blogs.value[0];

    // most recent 6 blogs after latest
    secondaryBlogs.value = blogs.value.slice(1, 7);

    // remaining blogs
    remainingBlogs.value = blogs.value.slice(7);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

const handleAlertClick = (): void => {
  error.value = '';
  getBlogs();
};

const loadMoreBlogs = async (): Promise<void> => {
  moreBlogsLoading.value = true;

  try {
    offset.value += offsetLimit;

    const response = await BlogService.getBlogs(offset.value);
    if (response.blogs.length) {
      remainingBlogs.value.push(...response.blogs);
      hasMore.value = response.hasMore;
    }
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    moreBlogsLoading.value = false;
  }
};

getBlogs();
</script>

<template>
  <div class="flex w-full flex-wrap justify-center p-4">
    <Transition name="fade" mode="out-in">
      <section class="max-w-7xl" v-if="!loading" key="content">
        <div class="flex w-full flex-wrap justify-center">
          <!-- newest blog -->
          <LatestContentCard
            v-if="hasLatestBlog"
            :blog="latestBlog"
          ></LatestContentCard>
        </div>
        <div
          v-if="hasSecondaryBlogs"
          class="flex w-full flex-wrap justify-center"
        >
          <!-- next 6 latest blogs -->
          <SecondaryContentCard
            v-for="blog in secondaryBlogs"
            :key="blog._id"
            :blog="blog"
            :index="generateRandomNumber(0, 2)"
            :useBlob="true"
          />
        </div>
        <div
          v-if="hasRemainingBlogs"
          class="flex w-fit flex-col flex-wrap sm:mx-5 md:mx-20"
        >
          <!-- all other blogs -->
          <MainLink
            v-for="blog in remainingBlogs"
            :key="blog._id"
            :createdAt="blog.createdAt"
            :title="blog.title"
            :slug="`/blog/${blog.slug}`"
          />

          <SecondaryLink
            v-if="hasMore"
            :loading="moreBlogsLoading"
            title="Load More"
            @click="loadMoreBlogs"
          />
        </div>
      </section>
      <section v-else-if="error" key="loader">
        <!-- make this look better eventually - incorporate into its own component -->
        <BasicAlert
          @dismissCallback="handleAlertClick"
          :message="error"
          :useDismiss="true"
          dismissText="dismiss"
        />
      </section>
      <section v-else>
        <JumpingDotsLoader />
      </section>
    </Transition>
  </div>
</template>

<style></style>
