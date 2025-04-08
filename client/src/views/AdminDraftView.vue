<script setup lang="ts">
import BasicBadge from '@/components/badges/basic-badge.vue';
import BlogDetailsHeader from '@/components/layout/blog-show-details-header.vue';
import { type BlogShowImageHeaderProps } from '@/components/layout/props';
import MainLink from '@/components/links/main-link.vue';
import JumpingDotsLoader from '@/components/loaders/jumping-dots.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { useUserStore } from '@/stores/user';
import { type SingleBlog } from '@/types/services';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { computed, provide, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type BlogLikeInjector } from './injectors';

const userStore = useUserStore();
const { isAuthenticated, getUserId } = storeToRefs(userStore);

const router = useRouter();

// this is not good and needs more security

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const headerProps = computed((): BlogShowImageHeaderProps => {
  return {
    url: blogData.value.blog.featuredImageLocation,
    title: blogData.value.blog.title,
    createdAt: blogData.value.blog.createdAt,
    rating: blogData.value.blog.rating,
    views: blogData.value.blog.views,
    readTime: calculatedReadTime.value,
  };
});

const calculatedReadTime = computed((): number => {
  if (!blogData.value.blog.text) return 0;

  return Math.ceil(blogData.value.blog.text.split(' ').length / 238);
});

const loading = ref(false);

const blogData = ref<SingleBlog>({} as SingleBlog);
const error = ref('');

const getDraft = async (): Promise<void> => {
  loading.value = true;
  try {
    blogData.value = await BlogService.getDraft(props.slug);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

const updateBlogRating = async (liked: boolean): Promise<boolean> => {
  if (liked) return liked;

  try {
    const response = await BlogService.likeBlog(blogData.value.blog._id);
    blogData.value.blog = response.blog;
    return true;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
    return false;
  }
};

const browseCategory = (category: string): void => {
  console.log(category);
};

const editBlog = (): void => {
  router.push(
    `/admin/${getUserId.value}/drafts/edit/${blogData.value.blog.slug}`,
  );
};

// use this in LikeCount component
provide<BlogLikeInjector>('updateBlogRating', {
  updateBlogRating,
});

const route = useRoute();

watch(route, () => {
  getDraft();
});

getDraft();
</script>

<template>
  <article class="post w-full">
    <article v-if="!loading" class="post w-full">
      <BlogDetailsHeader :data="headerProps" />
      <section class="container p-8">
        <button
          v-if="isAuthenticated"
          @click="editBlog"
          class="bg-secondary-vibrant btn btn-circle ml-5"
        >
          <PencilSquareIcon class="h-5 fill-white" />
        </button>

        <div class="row p-4">
          <div class="col-xsmall-12 col-md-2 dir-col">
            <BasicBadge
              v-for="category in blogData.blog.categories"
              @categoryCallback="browseCategory"
              :key="category"
              :text="category"
            />
          </div>
          <div
            class="post__content col-xsmall-12 col-md-10 dir-col"
            v-html="blogData.blog.text"
          ></div>
        </div>
        <div class="flex flex-wrap justify-between">
          <!-- next/previous post section -->
          <!-- update slug values for drafts -->
          <MainLink
            v-if="blogData.next"
            prefix="Newer Post"
            :title="blogData.next.title"
            :slug="blogData.next.slug"
          />
          <MainLink
            v-if="blogData.previous"
            prefix="Older Post"
            :title="blogData.previous.title"
            :slug="blogData.previous.slug"
          />
        </div>
      </section>
    </article>
    <article class="text-center" v-if="loading">
      <JumpingDotsLoader />
    </article>
  </article>
</template>
