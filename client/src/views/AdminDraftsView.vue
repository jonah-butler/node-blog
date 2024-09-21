<script setup lang="ts">
import { ref } from 'vue';
import MainLink from '@/components/links/main-link.vue';
import Loader from '@/components/loaders/jumping-dots.vue';
import { type Blog } from '@/types/services';
import BasicAlert from '@/components/alerts/basic-alert.vue';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { getUserId } = storeToRefs(userStore);

const loading = ref(false);
const error = ref('');

const drafts = ref<Blog[]>([]);

const getDrafts = async (): Promise<void> => {
  loading.value = true;

  try {
    drafts.value = await BlogService.getDrafts();
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
    <Loader v-if="loading" />
    <div v-else-if="!loading && drafts.length">
      <h1>Drafts</h1>
      <BasicAlert
        v-if="error"
        :message="error"
        :useDismiss="false"
        type="alert-error"
      />
      <MainLink
        v-for="draft in drafts"
        :key="draft._id"
        :slug="`/admin/${getUserId}/drafts/${draft.slug}`"
        :title="draft.title"
      />
    </div>
  </section>
</template>

<style scoped></style>
