<script setup lang="ts">
import { BlogService, BlogServiceError } from '@/services/api/blog.service';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';
import { type Blog } from '@/types/services';
import { MoonIcon, SunIcon } from '@heroicons/vue/16/solid';
import palette from '@jayimbee/palette';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, type StyleValue } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ButtonMain from '../buttons/button-main.vue';
import MainModal from '../modals/modal-main.vue';

const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();

const { logoutUser } = userStore;
const { toggleTheme, getTheme } = themeStore;

const searchModal = ref<InstanceType<typeof MainModal>>();

const LIMIT = 10;

const query = ref('');
const offset = ref(0);
const error = ref('');
const searching = ref(false);
const debounce = ref<number | null>(null);

const searchResults = ref<Blog[] | null>(null);
const hasMore = ref(false);

const { isAuthenticated, getUserProfileImage, getUserId } =
  storeToRefs(userStore);

const hamburgerStyles = computed((): StyleValue => {
  return {
    transform: `${open.value ? 'rotate(5deg)' : ''}`,
  };
});

interface ColorMap {
  side1: string;
  side2: string;
  side3: string;
  side4: string;
  side5: string;
  side6: string;
  [key: string]: string;
}

const sides = reactive<ColorMap>({
  side1: 'oklch(var(--secondary-vibrant))',
  side2: 'oklch(var(--secondary-vibrant))',
  side3: 'oklch(var(--secondary-vibrant))',
  side4: 'oklch(var(--secondary-vibrant))',
  side5: 'oklch(var(--secondary-vibrant))',
  side6: 'oklch(var(--secondary-vibrant))',
});

// this is busted right now - fix eventually
const changeColor = (side: number): void => {
  const color = `side${side}`;

  const rgb = palette.hexToRGBARecord(sides[color]);
  const complementary = palette.complementary(rgb);
  if (
    complementary !== sides[color] &&
    complementary !== 'hsl(180.00, 0.00%, 0.00%)'
  ) {
    sides[color] = complementary;
  } else {
    const randomColor = getRandomHexColor();
    sides[color] = randomColor;
  }
};

function getRandomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

const openSearchModal = (): void => {
  if (!searchModal.value) return;

  searchModal.value.openModal();
};

const navigateToHome = (): void => {
  router.push('/');
};

const openAdminPage = (): void => {
  closeDropdownOnClick();
  router.push(`/admin/${getUserId.value}`);
};

const logout = (): void => {
  closeDropdownOnClick();
  logoutUser();
  navigateToHome();
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
  offset.value = 0;
  hasMore.value = false;
};

const search = async (useOffset = false): Promise<void> => {
  try {
    if (!query.value) {
      searching.value = false;
      return;
    }

    if (useOffset) {
      offset.value += LIMIT;
    }

    const response = await BlogService.searchBlogs(query.value, offset.value);

    searchResults.value = response.blogs;
    hasMore.value = response.hasMore;
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    searching.value = false;
  }
};

const open = ref(false);

const openMenu = (): void => {
  open.value = !open.value;
};
</script>

<template>
  <div
    class="navbar flex-col rounded-t-md bg-base-100 px-5 text-black dark:text-white"
  >
    <div class="navbar relative flex">
      <section class="theme-container w-6 cursor-pointer">
        <SunIcon
          v-show="getTheme() === 'light'"
          class="h-6 w-6"
          @click="toggleTheme"
          fill="black"
        />
        <MoonIcon
          class="h-6 w-6"
          v-show="getTheme() === 'black'"
          @click="toggleTheme"
          fill="black"
        />
      </section>

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
              <div v-if="hasMore">
                <ButtonMain
                  text="Load More"
                  size="xs"
                  :loading="searching"
                  :disabled="searching"
                  @click="search(true)"
                />
              </div>
            </div>
          </div>
        </section>
      </MainModal>
      <!-- home -->
      <div class="navbar-start">
        <RouterLink to="/blog">
          <section
            class="standard die d6"
            style="
              transform: rotateX(-25deg) rotateY(45deg) rotateZ(0deg);
              --orientation: rotate(360deg);
            "
          >
            <div
              @click="changeColor(1)"
              class="_010 side top"
              :style="{ '--sideTopColor': sides.side1 }"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                key="1"
              >
                <defs>
                  <pattern
                    id="dotsFront1"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side1" />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront1)"
                />
              </svg>
            </div>
            <div
              @click="changeColor(2)"
              class="_0-10 side bottom six"
              :style="{ '--sideBottomColor': sides.side2 }"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                :key="2"
              >
                <defs>
                  <pattern
                    id="dotsFront2"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side2" />
                  </pattern>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront2)"
                />
              </svg>
            </div>
            <div
              @click="changeColor(3)"
              class="_100 side left"
              :style="{ '--sideLeftColor': sides.side3 }"
            >
              <svg
                role="img"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                key="3"
              >
                <defs>
                  <pattern
                    id="dotsFront3"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side3" />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront3)"
                />
              </svg>
            </div>
            <div
              @click="changeColor(4)"
              class="_-100 side right"
              :style="{ '--sideRightColor': sides.side4 }"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                :key="4"
              >
                <defs>
                  <pattern
                    id="dotsFront4"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side4" />
                  </pattern>
                </defs>

                <!-- Background fill with the dot pattern -->
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront4)"
                />
              </svg>
            </div>
            <div
              @click="changeColor(5)"
              class="_00-1 side back"
              :style="{ '--sideBackColor': sides.side5 }"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                :key="5"
              >
                <defs>
                  <pattern
                    id="dotsFront5"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side5" />
                  </pattern>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront5)"
                />
              </svg>
            </div>
            <div
              @click="changeColor(6)"
              class="_001 side front"
              :style="{ '--sideFrontColor': sides.side6 }"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                :key="6"
              >
                <defs>
                  <pattern
                    id="dotsFront6"
                    width="3"
                    height="3"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1.5" :fill="sides.side6" />
                  </pattern>
                </defs>

                <!-- Background fill with the dot pattern -->
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  fill="url(#dotsFront6)"
                />
              </svg>
            </div>
          </section>
        </RouterLink>
      </div>

      <!-- main links -->
      <div class="navbar-center">
        <ul class="menu menu-horizontal p-2">
          <li
            @click="openMenu"
            class="block active:bg-transparent sm:hidden"
            :style="hamburgerStyles"
          >
            <img
              class="max-w-20"
              src="@/assets/images/hamburger.png"
              alt="svg of open and close html code bracket with forward slash in middle"
              :style="hamburgerStyles"
            />
          </li>
          <span class="hidden sm:flex">
            <li class="link">
              <RouterLink class="p-2" to="/">Blog</RouterLink>
            </li>
            <li class="link">
              <RouterLink class="p-2" to="/about">About</RouterLink>
            </li>
            <li class="link">
              <a class="p-2" @click="openSearchModal">Search</a>
            </li>
            <li class="link">
              <RouterLink class="p-2" to="/projects">Projects</RouterLink>
            </li>
            <li class="link">
              <RouterLink class="p-2" to="/random">Random</RouterLink>
            </li>
            <li class="link">
              <RouterLink class="p-2" to="/contact">Contact</RouterLink>
            </li>
          </span>
        </ul>
      </div>

      <!-- authenticated-->
      <div v-if="isAuthenticated" class="navbar-end">
        <details class="dropdown dropdown-end bg-transparent shadow-none">
          <summary class="btn m-1 border-none bg-transparent shadow-none">
            <div class="avatar">
              <div
                class="w-12 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
              >
                <img :src="getUserProfileImage" />
              </div>
            </div>
          </summary>
          <ul
            class="menu dropdown-content z-[1] w-52 rounded-box border-base-300 bg-base-200 p-2 shadow"
          >
            <li>
              <span class="justify-between" @click="openAdminPage"
                >Profile</span
              >
            </li>
            <li><span @click="logout">Logout</span></li>
          </ul>
        </details>
      </div>

      <div v-else class="navbar-end"></div>
    </div>
    <div class="navbar flex min-h-0 flex-col p-0">
      <div v-if="open" class="sm:hidden">
        <ul class="menu flex-row justify-center p-2 text-center">
          <li class="link">
            <RouterLink class="p-2" to="/">Blog</RouterLink>
          </li>
          <li class="link">
            <RouterLink class="p-2" to="/about">About</RouterLink>
          </li>
          <li class="link">
            <a class="p-2" @click="openSearchModal">Search</a>
          </li>
          <li class="link">
            <RouterLink class="p-2" to="/projects">Projects</RouterLink>
          </li>
          <li class="link">
            <RouterLink class="p-2" to="/random">Random</RouterLink>
          </li>
          <li class="link">
            <RouterLink class="p-2" to="/contact">Contact</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-container {
  position: absolute;
  top: -10px;
  top: -32%;
  left: 50%;
  transform: translate(-50%, -50%);
}

tr:hover {
  background: oklch(var(--secondary-vibrant)) !important;
}

.empty-results-image {
  max-height: 200px;
  margin: 0 auto;
}

.die {
  width: 40px;
  height: 40px;
  transform-style: preserve-3d;
  transform-origin: center center;
  transform: rotateX(0deg) rotateY(45deg) rotateZ(0deg);
  transition: transform 0.3s ease-in-out;
  position: relative;
  margin: 10px 20px;
  cursor: pointer;
  animation: rotate-horizontal 10s ease-in-out infinite;
}

.die > .side {
  position: absolute;
  width: 40px;
  height: 40px;
  /* border: 1.1px dashed #fa709a; */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease;
  user-select: none;
}

.die > .side.top {
  border: 1.5px dashed var(--sideTopColor);
}
.die > .side.bottom {
  border: 1.5px dashed var(--sideBottomColor);
}
.die > .side.front {
  border: 1.5px dashed var(--sideFrontColor);
}
.die > .side.back {
  border: 1.5px dashed var(--sideBackColor);
}
.die > .side.left {
  border: 1.5px dashed var(--sideLeftColor);
}
.die > .side.right {
  border: 1.5px dashed var(--sideRightColor);
}

.die > .side.top:hover {
  background: var(--sideTopColor);
}
.die > .side.bottom:hover {
  background: var(--sideBottomColor);
}
.die > .side.front:hover {
  background: var(--sideFrontColor);
}
.die > .side.back:hover {
  background: var(--sideBackColor);
}
.die > .side.left:hover {
  background: var(--sideLeftColor);
}
.die > .side.right:hover {
  background: var(--sideRightColor);
}

.d6 > .top {
  /* transform: rotateX(90deg) translateZ(20px); */
  transform: rotateX(89.7deg) translateZ(20px);
}

.d6 > .bottom {
  /* transform: rotateX(-90deg) translateZ(20px); */
  transform: rotateX(-89.7deg) translateZ(20px);
}

.d6 > .right {
  transform: translateZ(20px);
}

.d6 > .left {
  /* transform: rotateX(-90deg) translateZ(20px); */
  transform: rotateY(-89.7deg) translateZ(20px);
}

.d6 > .back {
  /* transform: rotateY(90deg) translateZ(20px); */
  transform: rotateY(89.7deg) translateZ(20px);
}

.d6 > .front {
  transform: rotateY(180deg) translateZ(20px);
}

.side > span {
  font-size: 40px;
  font-weight: bold;
  top: 30px;
  left: 45px;
  color: black;
  transition: all 0.4s ease;
}

.angled .side._010 > span:before {
  position: absolute;
  content: '>';
  font-size: 20px;
  width: 50px;
  height: 15px;
  color: black;
  font-weight: 800;
  top: -10px;
  left: 0px;
}

.angled.side-100.flipped90 .side._-100 span {
  transform: rotate(90deg);
}

.angled.side-100.flipped270 .side._-100 span {
  transform: rotate(270deg);
}
.angled.side100.flipped90 .side._100 span {
  transform: rotate(90deg);
}

.angled.side100.flipped270 .side._100 span {
  transform: rotate(270deg);
}

/* menu d6 styles */
.die.menu {
  width: 600px;
  height: 600px;
}

.die.menu > .side {
  width: 600px;
  height: 600px;
  border: 1px solid transparent;
}

.die.menu > .side > span {
  color: white;
  font-size: 50px;
}

.die.menu > .side.top {
  transform: rotateX(90deg) translateZ(301px) !important;
  background: #662c8f;
}
.die.menu > .side.bottom {
  transform: rotateX(-90deg) translateZ(301px) !important;
  background: #72369a;
}
.d6.menu > .side.right {
  transform: translateZ(300px) !important;
  background: #7e41a4;
}
.d6.menu > .side.left {
  transform: rotateY(-90deg) translateZ(300px);
  background: #8d4fb0;
}
.d6.menu > .side.back {
  transform: rotateY(90deg) translateZ(300px);
  background: #9b71b2;
}
.d6.menu > .side.front {
  transform: rotateY(180deg) translateZ(300px);
  background: #a586b7;
}

@keyframes rotate-horizontal {
  0% {
    transform: rotateX(-25deg) rotateY(45deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(-25deg) rotateY(405deg) rotateZ(0deg);
  }
}
</style>
