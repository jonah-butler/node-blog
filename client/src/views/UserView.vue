<script setup lang="ts">
import ButtonMain from '@/components/buttons/button-main.vue';
import SecondaryContent from '@/components/card/secondary-content.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { UserService, UserServiceError } from '@/services/api/user.service';
import { type Blog, type UserProfileResponse } from '@/types/services';
import { onMounted, ref } from 'vue';

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const user = ref<UserProfileResponse>({} as UserProfileResponse);
const blogs = ref<Blog[]>([] as Blog[]);
const hasMore = ref(false);
const offset = ref(0);
const error = ref('');

const loadingBlogs = ref(false);

onMounted(async (): Promise<void> => {
  await loadUser();

  if (!user.value._id) return;

  await loadBlogs();
});

const loadBlogs = async (): Promise<void> => {
  loadingBlogs.value = true;
  try {
    const moreBlogs = await BlogService.getUserBlogs(
      user.value._id,
      offset.value,
    );

    blogs.value.push(...moreBlogs.blogs);
    hasMore.value = moreBlogs.hasMore;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
      clearError();
    }
  } finally {
    loadingBlogs.value = false;
  }
};

const loadMoreBlogs = (): void => {
  offset.value += 10;
  loadBlogs();
};

const loadUser = async (): Promise<void> => {
  try {
    const response = await UserService.getPublicUserProfile(props.username);
    user.value = response;
  } catch (err) {
    if (err instanceof UserServiceError) {
      error.value = err.message;
      clearError();
    }
  }
};

const clearError = (): void => {
  setTimeout((): void => {
    error.value = '';
  }, 6000);
};
</script>

<template>
  <div class="w-full max-w-screen-2xl">
    <div v-if="error" class="toast z-20">
      <div class="alert alert-error">
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- clean this up and consolidate the 3 versions of headers -->
    <div
      class="user__details-container post__details-container relative flex w-full overflow-hidden bg-white"
    >
      <div
        class="post__inner-details-container z-10 flex w-full justify-center"
      >
        <div class="container m-auto flex justify-center">
          <div class="align-center mb-3 flex justify-center">
            <span>
              <div class="tooltip tooltip-bottom" :data-tip="user.username">
                <div class="avatar">
                  <div
                    class="mr-3 w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
                  >
                    <img :src="user.profileImageLocation" />
                  </div>
                </div>
              </div>
            </span>
            <span>
              <h1>{{ user.username }}</h1>
            </span>
          </div>
        </div>
      </div>
    </div>

    <section
      v-if="blogs.length !== 0"
      class="container-full flex w-full flex-wrap justify-center"
    >
      <SecondaryContent
        v-for="blog in blogs"
        :key="blog._id"
        :blog="blog"
        :useBlob="false"
        :index="-1"
      />

      <div class="mt-5 w-full text-center" v-if="hasMore">
        <ButtonMain
          @click="loadMoreBlogs"
          text="Load More"
          :disabled="loadingBlogs"
          :loading="loadingBlogs"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  letter-spacing: 2px;
  text-shadow:
    oklch(var(--secondary-vibrant)) 2px 2px 0px,
    oklch(var(--secondary-vibrant)) 6px 6px 0px;
}
@media (min-width: 1536px) {
  .post__details-container {
    border-radius: 10px 10px 0 0 !important;
  }
}

.post__details-container {
  min-height: 300px;
  max-height: 300px;
  width: 100%;
}

.post__details-container::after {
  content: '';
  background-image: linear-gradient(180deg, rgba(0, 71, 101, 0) 15%, #ffffff);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

/* consolidate this eventually too */
html[data-theme='black'] .post__details-container::after {
  background-image: linear-gradient(180deg, rgba(0, 71, 101, 0) 15%, #000000);
}

.user__details-container {
  background-size: 'cover';
  background-position: 'inherit';
  background-image: url('https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg19.png');
}
</style>
