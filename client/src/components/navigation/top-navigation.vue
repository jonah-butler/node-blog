<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import MainModal from '../modals/modal-main.vue';
import { type Blog, type SearchQuery } from '@/types/services';
import { BlogService, BlogServiceError } from '@/services/api/blog.service';

const router = useRouter();
const userStore = useUserStore();

const { logoutUser } = userStore;

const searchModal = ref<InstanceType<typeof MainModal>>();

const query = ref('');
const error = ref('');
const searching = ref(false);
const debounce = ref<number | null>(null);

const searchResults = ref<Blog[] | null>(null);

const { isAuthenticated, getUserProfileImage, getUserId } =
  storeToRefs(userStore);

const openSearchModal = (): void => {
  if (!searchModal.value) return;

  searchModal.value.openModal();
};

const openAdminPage = (): void => {
  closeDropdownOnClick();
  router.push(`/admin/${getUserId.value}`);
};

const logout = (): void => {
  closeDropdownOnClick();
  logoutUser();
};

const navigate = (slug: string): void => {
  if (searchModal.value) {
    searchModal.value.closeModal();
  }
  cleanup();
  router.push(`/blog/${slug}`);
};

const cleanup = (): void => {
  searchResults.value = null;
  query.value = '';
};

const closeDropdownOnClick = (): void => {
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    dropdown.removeAttribute('open');
  }
};

const debouncedSearch = (): void => {
  if (query.value.length === 0) {
    searchResults.value = null;
  }

  if (query.value.length < 2) return;

  searching.value = true;

  if (debounce.value !== null) {
    window.clearTimeout(debounce.value);
  }
  debounce.value = window.setTimeout(() => {
    search();
  }, 1000);
};

const cleanUpSearch = (): void => {
  query.value = '';
  searchResults.value = null;
};

const search = async (): Promise<void> => {
  try {
    if (!query.value) {
      searching.value = false;
      return;
    }
    const payload: SearchQuery = {
      query: query.value,
    };
    searchResults.value = await BlogService.searchBlogs(payload);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    searching.value = false;
  }
};
</script>

<template>
  <div class="bg-off_white navbar rounded-t-md px-5">
    <MainModal
      @close="cleanUpSearch"
      ref="searchModal"
      id="searchModal"
      :useVHTML="false"
      :useClose="true"
    >
      <label class="input input-bordered flex items-center gap-2">
        <input
          @keyup="debouncedSearch"
          type="text"
          class="grow"
          placeholder="Search"
          v-model="query"
        />
        <span
          v-if="searching"
          class="loading loading-spinner text-secondary"
        ></span>
      </label>
      <section class="results mt-4 max-h-64 overflow-scroll">
        <div v-if="searchResults !== null">
          <div v-if="searchResults.length === 0">
            <img
              class="empty-results-image"
              src="@/assets/images/doge-pixel.png"
              alt="pixel style headshot of doge coin dog"
            />
            <p class="text-center">Try again</p>
          </div>
          <div v-if="searchResults.length > 0">
            <table class="table table-zebra">
              <tbody>
                <tr
                  class="cursor-pointer"
                  @click="navigate(result.slug)"
                  v-for="(result, i) in searchResults"
                  :key="result._id"
                >
                  <th>{{ i + 1 }}</th>
                  <td>{{ result.title }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainModal>
    <!-- home -->
    <div class="navbar-start">
      <img
        class="max-w-10"
        src="@/assets/images/code-bracket.svg"
        alt="svg of open and close html code bracket with forward slash in middle"
      />
    </div>

    <!-- main links -->
    <div class="navbar-center">
      <ul class="menu menu-horizontal p-2">
        <li class="link">
          <RouterLink to="/">Blog</RouterLink>
        </li>
        <li class="link">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li class="link">
          <a @click="openSearchModal">Search</a>
        </li>
        <li class="link">
          <RouterLink to="/projects">Projects</RouterLink>
        </li>
        <li class="link">
          <RouterLink to="/random">Random</RouterLink>
        </li>
        <li class="link">
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
      </ul>
    </div>

    <!-- authenticated-->
    <div v-if="isAuthenticated" class="navbar-end">
      <details class="dropdown dropdown-end">
        <summary class="btn m-1 border-none hover:bg-transparent">
          <div class="avatar">
            <div
              class="w-12 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
            >
              <img :src="getUserProfileImage" />
            </div>
          </div>
        </summary>
        <ul
          class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <span class="justify-between" @click="openAdminPage">Profile</span>
          </li>
          <li><span @click="logout">Logout</span></li>
        </ul>
      </details>
    </div>

    <div v-else class="navbar-end"></div>
  </div>
</template>

<style scoped>
tr:hover {
  background: #ffc2d4 !important;
}

.empty-results-image {
  max-height: 200px;
  margin: 0 auto;
}
</style>
