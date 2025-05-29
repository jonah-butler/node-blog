<script setup lang="ts">
import BasicBadge from '@/components/badges/basic-badge.vue';
import BlogDetailsHeader from '@/components/layout/blog-show-details-header.vue';
import { type BlogShowImageHeaderProps } from '@/components/layout/props';
import MainLink from '@/components/links/main-link.vue';
import JumpingDotsLoader from '@/components/loaders/jumping-dots.vue';
import MainModal from '@/components/modals/modal-main.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { useUserStore } from '@/stores/user';
import { type SingleBlog } from '@/types/services';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { computed, provide, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type BlogLikeInjector } from './injectors';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const imageModal = ref<InstanceType<typeof MainModal>>();

const selectedImage = ref('');

const userStore = useUserStore();
const { isAuthenticated, getUserId } = storeToRefs(userStore);

const router = useRouter();

const headerProps = computed((): BlogShowImageHeaderProps => {
  return {
    url: blogData.value.blog.featuredImageLocation ?? '',
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

const setupImageListeners = (): void => {
  const post = document.querySelector('.post__content');
  const imageTags = post!.querySelectorAll('img');
  if (!imageTags) return;

  Array.from(imageTags).forEach((img): void => {
    img.addEventListener('click', () => {
      selectedImage.value = img.getAttribute('src') || '';
      openImagePreviewModal();
    });
  });
};

const openImagePreviewModal = (): void => {
  if (!imageModal.value) return;

  imageModal.value.openModal();
};

const getBlog = async (): Promise<void> => {
  loading.value = true;
  try {
    blogData.value = await BlogService.getBlog(props.slug);
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

const browseCategory = async (category: string): Promise<void> => {
  router.push(`/blog/category/${category}`);
};

// use this in LikeCount component
provide<BlogLikeInjector>('updateBlogRating', {
  updateBlogRating,
});

const route = useRoute();

const blogText = computed((): string => {
  return blogData.value.post1?.text ?? '';
});

watch(loading, (n, o) => {
  if (o && !n && blogText.value.length) {
    setTimeout((): void => {
      setupImageListeners();
    }, 1);
  }
});

watch(route, () => {
  getBlog();
});

const editBlog = (): void => {
  router.push(
    `/admin/${getUserId.value}/blog/edit/${blogData.value.blog.slug}`,
  );
};

getBlog();
</script>

<template>
  <div class="w-full max-w-screen-2xl">
    <article v-if="!loading" class="post w-full">
      <BlogDetailsHeader :data="headerProps" />
      <section class="container p-8">
        <button
          v-if="isAuthenticated"
          @click="editBlog"
          class="btn btn-circle ml-5 bg-secondary-vibrant"
        >
          <PencilSquareIcon class="h-5 fill-white" />
        </button>
        <div class="row items-start p-2 sm:p-4">
          <div
            class="col-small-12 col-md-2 category-container top-0 flex-row flex-col overflow-scroll md:!sticky"
          >
            <BasicBadge
              v-for="category in blogData.blog.categories"
              @categoryCallback="browseCategory"
              :key="category"
              :text="category"
            />
          </div>
          <div
            class="post__content col-small-12 col-md-10 dir-col"
            v-html="blogData.blog.text"
          ></div>
        </div>
        <div class="flex flex-wrap justify-between">
          <!-- next/previous post section -->
          <MainLink
            v-if="blogData.previous"
            prefix="Older Post"
            :title="blogData.previous.title"
            :slug="`/blog/${blogData.previous.slug}`"
          />
          <MainLink
            v-if="blogData.next"
            prefix="Newer Post"
            :title="blogData.next.title"
            :slug="`/blog/${blogData.next.slug}`"
          />
        </div>
      </section>
      <MainModal
        id="imageModal"
        ref="imageModal"
        :useClose="false"
        :useVHTML="false"
      >
        <img :src="selectedImage" />
      </MainModal>
    </article>
    <article class="post w-full text-center" v-if="loading">
      <JumpingDotsLoader />
    </article>
  </div>
</template>

<style>
/* quick and dirty patch until i figure out a full tailwind solution */
@media (max-width: 766px) {
  .category-container {
    flex-direction: row;
  }
}

#imageModal > .modal-box {
  max-width: 70%;
}
</style>
