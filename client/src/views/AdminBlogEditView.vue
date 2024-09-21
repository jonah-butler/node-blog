<script setup lang="ts">
import { ref, reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { type Blog, type NewBlogPayload } from '@/types/services';
import Loader from '@/components/loaders/jumping-dots.vue';
import MainButton from '../components/buttons/button-main.vue';
import MainModal from '../components/modals/modal-main.vue';
import ConfirmationModal from '../components/modals/confirmation-modal.vue';
import CategoricalInput from '../components/inputs/categorial-input.vue';
import EditorJSInput from '../components/inputs/editorjs-input.vue';
import BasicAlert from '@/components/alerts/basic-alert.vue';

const userStore = useUserStore();
const { getUser, getUserId } = storeToRefs(userStore);

const router = useRouter();

const error = ref('');

const loading = ref(false);
const updating = ref(false);

const blog = ref<Blog>({} as Blog);

const imagePreviewModal = ref<InstanceType<typeof MainModal>>();
const bodyPreviewModal = ref<InstanceType<typeof MainModal>>();
const confirmationModal = ref<InstanceType<typeof ConfirmationModal>>();

const fileInput = ref<HTMLInputElement>();

const imagePreview = ref('');

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const blogToEdit = reactive<NewBlogPayload>({
  categories: '',
  text: '',
  published: false,
  title: '',
  image: null,
  id: props.id,
});

const isDisabled = computed((): boolean => {
  return blogToEdit.title == '';
});

const hasDefaultFeaturedImage = computed((): boolean => {
  return (
    blog.value.featuredImageKey === '' &&
    blog.value.featuredImageTag === '' &&
    blog.value.featuredImageLocation !== ''
  );
});

const retrieveBlog = async (): Promise<void> => {
  loading.value = true;

  const payload = {
    _id: props.id,
    user: getUser.value,
  };

  try {
    blog.value = await BlogService.getEditBlog(payload);

    blogToEdit.categories = JSON.stringify(blog.value.categories);
    blogToEdit.published = blog.value.published;
    blogToEdit.text = blog.value.text;
    blogToEdit.title = blog.value.title;

    imagePreview.value = blog.value.featuredImageLocation;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

const selectFeaturedImageFiles = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  if (!target.files) return;
  blogToEdit.image = target.files[0];
  buildImagePreview();
};

const buildImagePreview = (): void => {
  if (!blogToEdit.image) return;
  const blob = new Blob([blogToEdit.image]);
  imagePreview.value = URL.createObjectURL(blob);
};

const deleteImage = async (): Promise<void> => {
  // clear local instance
  blogToEdit.image = null;
  if (!fileInput.value) return;
  fileInput.value.value = '';
  URL.revokeObjectURL(imagePreview.value);
  imagePreview.value = '';

  if (!blog.value.featuredImageLocation) return;

  try {
    const payload = {
      uri: blog.value.featuredImageLocation,
      blogId: blog.value._id,
    };

    const response = await BlogService.deleteFeaturedImage(payload);
    imagePreview.value = response.featuredImageLocation;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
      autoDismissAlert(4);
    }
  }
};

const previewImage = (): void => {
  imagePreviewModal.value!.openModal();
};

const openConfirmationModal = (): void => {
  confirmationModal.value!.openModal();
};

const closeConfirmationModal = (): void => {
  confirmationModal.value!.closeModal();
};

const previewContents = (): void => {
  bodyPreviewModal.value!.openModal();
};

const updateBlog = async (): Promise<void> => {
  updating.value = true;

  try {
    const updatedBlog = await BlogService.updateBlog(toRaw(blogToEdit));
    console.log('updated blog', updatedBlog);
    if (updatedBlog.published) {
      router.push(`/blog/${updatedBlog.slug}`);
    } else {
      console.log('here');
      router.push(`/admin/${getUserId.value}/drafts/${updatedBlog.slug}`);
    }
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
      autoDismissAlert(4);
    }
  } finally {
    updating.value = false;
  }
};

const autoDismissAlert = (timeout: number): void => {
  setTimeout((): void => {
    error.value = '';
  }, timeout * 1000);
};

retrieveBlog();
</script>

<template>
  <section class="container my-3">
    <div class="card h-full w-full bg-base-100 p-6">
      <h2>Edit Blog</h2>
      <section v-if="!loading">
        <!-- publish status -->
        <section class="my-3">
          <div class="label">
            <span class="label-text-alt">Post Status</span>
          </div>
          <select
            v-model="blogToEdit.published"
            class="max-w-x select select-secondary"
          >
            <option value="false">draft</option>
            <option value="true">published</option>
          </select>
        </section>

        <!-- featured image -->
        <section class="my-3">
          <div class="label">
            <span class="label-text-alt">Featured Image</span>
          </div>
          <div role="tablist" class="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              class="tab"
              aria-label="Current Image"
              checked
            />
            <div role="tabpanel" class="tab-content p-2">
              <div class="label">
                <span class="label-text-alt">Current Image</span>
              </div>
              <div v-if="imagePreview.length">
                <input
                  type="text"
                  :placeholder="imagePreview"
                  class="input input-bordered mb-3 w-full max-w-xs"
                  disabled
                />
                <img
                  v-if="imagePreview.length"
                  @click="previewImage"
                  :src="imagePreview"
                  class="max-w-64 cursor-pointer"
                />
              </div>
              <p v-else>No image uploaded</p>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              class="tab"
              aria-label="New Image"
            />
            <div role="tabpanel" class="tab-content p-2">
              <div class="label">
                <span class="label-text-alt">Current Image</span>
              </div>
              <input
                type="text"
                :placeholder="imagePreview"
                class="input input-bordered mb-3 w-full max-w-xs"
                disabled
              />
              <div>
                <input
                  @input="selectFeaturedImageFiles"
                  ref="fileInput"
                  type="file"
                  class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                />
              </div>
              <div>
                <div>
                  <MainButton
                    v-if="
                      blogToEdit.image ||
                      (blog.featuredImageLocation && !hasDefaultFeaturedImage)
                    "
                    @click="previewImage"
                    class="mt-3"
                    text="preview image"
                    size="btn-xs"
                  />
                  <MainButton
                    v-if="
                      blogToEdit.image ||
                      (blog.featuredImageLocation && !hasDefaultFeaturedImage)
                    "
                    @click="openConfirmationModal"
                    class="mt-3"
                    text="delete image"
                    size="btn-xs"
                  />
                  <ConfirmationModal
                    ref="confirmationModal"
                    id="confirmationModal"
                    cancelButtonText="cancel"
                    confirmButtonText="delete"
                    @cancel="closeConfirmationModal"
                    @confirm="deleteImage"
                  >
                    <div>Delete the following image?</div>
                    <p>{{ blog.featuredImageLocation }}</p>
                  </ConfirmationModal>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <MainModal
            ref="imagePreviewModal"
            id="imagePreview"
            :useVHTML="false"
            :useClose="true"
          >
            <img :src="imagePreview" alt="" />
          </MainModal>
        </section>

        <!-- title -->
        <section class="my-3">
          <div class="label">
            <span class="label-text-alt">Title</span>
          </div>
          <input
            v-model="blogToEdit.title"
            type="text"
            placeholder="enter a title"
            class="input input-bordered input-secondary w-full max-w-xs"
          />
        </section>

        <!-- categorical input -->
        <section class="my-3">
          <CategoricalInput
            v-model:data="blogToEdit.categories"
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
            :contents="blogToEdit.text"
            :useClose="true"
          />
          <EditorJSInput v-model:contents="blogToEdit.text" />
        </section>
        <div>
          <MainButton
            :disabled="isDisabled"
            :loading="updating"
            text="Update Blog"
            @click="updateBlog"
          />
          <BasicAlert
            v-if="error"
            type="alert-error"
            :message="error"
            :useDismiss="false"
          />
        </div>
      </section>
      <div v-else>
        <Loader />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
