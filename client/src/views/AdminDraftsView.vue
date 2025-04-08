<script setup lang="ts">
import BasicAlert from '@/components/alerts/basic-alert.vue';
import ButtonMain from '@/components/buttons/button-main.vue';
import MainLink from '@/components/links/main-link.vue';
import Loader from '@/components/loaders/jumping-dots.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { useUserStore } from '@/stores/user';
import { type Blog } from '@/types/services';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore();

const { getUserId } = storeToRefs(userStore);

const loading = ref(false);
const error = ref('');

const LIMIT = 10;

const drafts = ref<Blog[]>([]);
const hasMore = ref(false);
const offset = ref(0);

const getDrafts = async (useOffset = false): Promise<void> => {
  loading.value = true;

  if (useOffset) {
    offset.value += LIMIT;
  }

  try {
    const response = await BlogService.getDrafts(offset.value);

    drafts.value = response.blogs;
    hasMore.value = response.hasMore;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
      autoDismissAlert(4);
    }
  } finally {
    loading.value = false;
  }
};

const autoDismissAlert = (timeout: number): void => {
  setTimeout((): void => {
    error.value = '';
  }, timeout * 1000);
};

getDrafts();
</script>

<template>
  <section>
    <BasicAlert
      v-if="error"
      :message="error"
      :useDismiss="false"
      type="alert-error"
    />
    <Loader v-if="loading" />
    <div v-else-if="!loading && drafts && drafts.length">
      <h1>Drafts</h1>
      <MainLink
        v-for="draft in drafts"
        :key="draft._id"
        :slug="`/admin/${getUserId}/drafts/${draft.slug}`"
        :title="draft.title"
      />

      <ButtonMain
        v-if="hasMore"
        @click="getDrafts(true)"
        text="Load More"
        :loading="loading"
        :disabled="loading"
      />
    </div>
    <div v-else-if="!loading && drafts.length === 0">
      <BasicAlert message="No drafts available" type="alert-warning" />
    </div>
  </section>
</template>

<style scoped></style>
