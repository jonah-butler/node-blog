<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import JumpingDotsLoader from '@/components/loaders/jumping-dots.vue';
import { type SingleBlog, type LikedBlogPayload } from '@/types/services';
import BlogDetailsHeader from '@/components/layout/blog-show-details-header.vue';
import { type BlogShowImageHeaderProps } from '@/components/layout/props';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { type BlogLikeInjector } from './injectors';
import BasicBadge from '@/components/badges/basic-badge.vue';
import MainLink from '@/components/links/main-link.vue';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();
const { isAuthenticated, getUserId } = storeToRefs(userStore);

const router = useRouter();

const headerProps = computed((): BlogShowImageHeaderProps => {
  return {
    url: blogData.value.post1.featuredImageLocation ?? '',
    title: blogData.value.post1.title,
    createdAt: blogData.value.post1.createdAt,
    rating: blogData.value.post1.rating,
    views: blogData.value.post1.views,
    readTime: calculatedReadTime.value,
  };
});

const calculatedReadTime = computed((): number => {
  if (!blogData.value.post1.text) return 0;

  return Math.ceil(blogData.value.post1.text.split(' ').length / 238);
});

const loading = ref(false);

const blogData = ref<SingleBlog>({} as SingleBlog);
const error = ref('');

const getBlog = async (): Promise<void> => {
  loading.value = true;
  try {
    blogData.value = await BlogService.getBlog(props.slug);
    console.log(blogData.value);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

const updateBlogRating = async (liked: boolean): Promise<boolean> => {
  const payload: LikedBlogPayload = {
    liked,
    rating: blogData.value.post1.rating,
    slug: blogData.value.post1.slug,
  };

  try {
    blogData.value.post1 = await BlogService.likeBlog(payload);
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

// use this in LikeCount component
provide<BlogLikeInjector>('updateBlogRating', {
  updateBlogRating,
});

const route = useRoute();

watch(route, () => {
  getBlog();
});

const editBlog = (): void => {
  router.push(
    `/admin/${getUserId.value}/edit/blog/${blogData.value.post1._id}`,
  );
};

getBlog();
</script>

<template>
  <article v-if="!loading" class="post w-full">
    <BlogDetailsHeader :data="headerProps" />
    <section class="container p-8">
      <button
        v-if="isAuthenticated"
        @click="editBlog"
        class="bg-deep-purple btn btn-circle ml-5"
      >
        <PencilSquareIcon class="h-5 fill-white" />
      </button>
      <div class="row p-4">
        <div class="col-xsmall-12 col-md-2 dir-col">
          <BasicBadge
            v-for="category in blogData.post1.categories"
            @categoryCallback="browseCategory"
            :key="category"
            :text="category"
          />
        </div>
        <div
          class="post__content col-xsmall-12 col-md-10 dir-col"
          v-html="blogData.post1.text"
        ></div>
      </div>
      <div class="flex flex-wrap justify-between">
        <!-- next/previous post section -->
        <MainLink
          v-if="blogData.nextPost"
          prefix="Newer Post"
          :title="blogData.nextPost.title"
          :slug="`/blog/${blogData.nextPost.slug}`"
        />
        <MainLink
          v-if="blogData.previousPost"
          prefix="Older Post"
          :title="blogData.previousPost.title"
          :slug="`/blog/${blogData.previousPost.slug}`"
        />
      </div>
    </section>
  </article>
  <article v-if="loading">
    <JumpingDotsLoader />
  </article>
</template>
