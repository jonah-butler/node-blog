<script setup lang="ts">
import { reactive, ref, toRaw, computed } from 'vue';
import { useRouter } from 'vue-router';
import CategoricalInput from '../components/inputs/categorial-input.vue';
import EditorJSInput from '../components/inputs/editorjs-input.vue';
import MainModal from '../components/modals/modal-main.vue';
import MainButton from '../components/buttons/button-main.vue';
import { type NewBlogPayload } from '@/types/services';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import BasicAlert from '@/components/alerts/basic-alert.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { getUserId } = storeToRefs(userStore);

const router = useRouter();

const loading = ref(false);
const error = ref('');

const payload = reactive<NewBlogPayload>({
  categories: '',
  text: '',
  published: false,
  title: '',
  image: null,
});

const imagePreview = ref('');

const bodyPreviewModal = ref<InstanceType<typeof MainModal>>();
const imagePreviewModal = ref<InstanceType<typeof MainModal>>();

const fileInput = ref<HTMLInputElement>();

const isDisabled = computed((): boolean => {
  return payload.title == '';
});

const previewContents = (): void => {
  bodyPreviewModal.value!.openModal();
};

const selectFeaturedImageFiles = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  if (!target.files) return;
  payload.image = target.files[0];
  buildImagePreview();
};

const buildImagePreview = (): void => {
  if (!payload.image) return;
  const blob = new Blob([payload.image]);
  imagePreview.value = URL.createObjectURL(blob);
};

const clearFeaturedImageFile = (): void => {
  payload.image = null;
  if (!fileInput.value) return;
  fileInput.value.value = '';
  URL.revokeObjectURL(imagePreview.value);
  imagePreview.value = '';
};

const previewImage = (): void => {
  imagePreviewModal.value!.openModal();
};

const createBlog = async (): Promise<void> => {
  loading.value = true;
  try {
    const blog = await BlogService.newBlog(toRaw(payload));
    if (blog.published) {
      // redirect to live view
      router.push(`/blog/${blog.slug}`);
    } else {
      // redirect to protected draft view
      router.push(`/admin/${getUserId.value}/drafts/${blog.slug}`);
    }
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
</script>

<template>
  <section class="container my-3">
    <div class="card h-full w-full bg-base-100 p-6">
      <h2>New Blog</h2>

      <!-- publish status -->
      <section class="my-3">
        <div class="label">
          <span class="label-text-alt">Post Status</span>
        </div>
        <select
          v-model="payload.published"
          class="max-w-x select select-secondary"
        >
          <option selected value="false">draft</option>
          <option value="true">published</option>
        </select>
      </section>

      <!-- featured image -->
      <section class="my-3">
        <div class="label">
          <span class="label-text-alt">Featured Image</span>
        </div>
        <input
          @input="selectFeaturedImageFiles"
          ref="fileInput"
          type="file"
          class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
        />
        <div>
          <MainButton
            v-if="payload.image"
            @click="clearFeaturedImageFile"
            class="mt-3"
            text="clear image"
            size="btn-xs"
          />
          <MainButton
            v-if="payload.image"
            @click="previewImage"
            class="mt-3"
            text="preview image"
            size="btn-xs"
          />
        </div>
        <MainModal ref="imagePreviewModal" id="imagePreview" :useVHTML="false">
          <img :src="imagePreview" alt="" />
        </MainModal>
      </section>

      <!-- title -->
      <section class="my-3">
        <div class="label">
          <span class="label-text-alt">Title</span>
        </div>
        <input
          v-model="payload.title"
          type="text"
          placeholder="enter a title"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
      </section>

      <!-- categorical input -->
      <section class="my-3">
        <CategoricalInput
          v-model:data="payload.categories"
          label="Categories"
        />
      </section>

      <!-- conents -->
      <section class="my-3">
        <MainButton
          class="mb-3 text-center"
          text="preview contents"
          @click="previewContents"
        />
        <MainModal
          ref="bodyPreviewModal"
          id="contents_preview"
          :useVHTML="true"
          :contents="payload.text"
        />
        <EditorJSInput v-model:contents="payload.text" />
      </section>
      <MainButton
        :disabled="isDisabled"
        :loading="loading"
        text="Create Blog"
        @click="createBlog"
      />
      <BasicAlert
        v-if="error"
        type="alert-error"
        :message="error"
        :useDismiss="false"
      />
    </div>
  </section>
</template>

<style scoped></style>
