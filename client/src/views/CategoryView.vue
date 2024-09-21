<script setup lang="ts">
import { computed, type StyleValue, ref } from 'vue';
import palette, { type RGBARecord } from '@jayimbee/palette';
import Loader from '@/components/loaders/jumping-dots.vue';
import { BlogService, BlogServiceError } from '../services/api/blog.service';
import { type Blog } from '@/types/services';
import SecondaryContent from '@/components/card/secondary-content.vue';

const props = defineProps<{
  category: string;
}>();

const loading = ref(false);
const error = ref('');

const blogs = ref<Blog[]>([]);

const backgrounds = [
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg1.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg2.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg3.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg4.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg5.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg6.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg7.png',
  // 'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg8.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg9.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg10.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg11.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg12.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg13.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg14.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg15.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg16.png',
  // 'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg17.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg18.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg19.png',
  'https://dev-blog-resources.s3.amazonaws.com/category-backgrounds/bg20.png',
];

const backgroundStyles = computed((): StyleValue => {
  return {
    'background-image': `url(${randomBackground.value})`,
    'background-position': 'inherit',
    'background-size': 'cover',
  };
});

const imageColorPalette = ref<RGBARecord[]>([]);
const complementaryColor = ref('');

const dynamicTextShadow = computed((): StyleValue => {
  if (Object.keys(imageColorPalette.value).length) {
    return {
      'text-shadow': `2px 2px 0px ${complementaryColor.value},
      6px 6px 0px ${complementaryColor.value}`,
      // color: `rgba(${imageColorPalette.value[3].r}, ${imageColorPalette.value[3].g}, ${imageColorPalette.value[3].b}`,
      color: 'white',
    };
  } else {
    return {
      'text-shadow': '0px 0px 0px rgb(211, 94, 130)',
    };
  }
});

const quantizeImage = async (): Promise<void> => {
  try {
    const cacheBustedUrl = `${randomBackground.value}?cacheBuster=${new Date().getTime()}`;
    const imageData = await palette.extractImageDataFromSrc(cacheBustedUrl, 8);
    imageColorPalette.value = palette.quantize(imageData);
    complementaryColor.value = palette.complementary(
      imageColorPalette.value[0],
    );
  } catch (err) {
    console.log(err);
  }
};

const randomBackground = computed((): string => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
});

const getBlogs = async (): Promise<void> => {
  loading.value = true;
  try {
    blogs.value = await BlogService.getCategories(props.category);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

quantizeImage();
getBlogs();
</script>

<template>
  <section class="w-full">
    <div
      :style="backgroundStyles"
      class="category-header relative overflow-hidden bg-white"
    >
      <div class="inner-container">
        <h1 class="font-size-75 mb-3 font-extrabold" :style="dynamicTextShadow">
          {{ category }}
        </h1>
      </div>
    </div>
    <article class="p-3 text-center">
      <Loader v-if="loading" />
      <div class="container-full flex w-full flex-wrap justify-center" v-else>
        <SecondaryContent
          v-for="blog in blogs"
          :key="blog._id"
          :blog="blog"
          :index="-1"
          :useBlob="false"
          :backgroundColor="complementaryColor"
        />
      </div>
    </article>
  </section>
</template>

<style scoped>
.category-header {
  min-height: 400px;
  max-height: 400px;
  width: 100%;
}

.inner-container {
  position: absolute;
  bottom: 15px;
  left: 3rem;
  z-index: 1;
}

.inner-container h1 {
  transition: text-shadow 0.7s ease;
  letter-spacing: 2px;
  line-height: 85px;
}

@media (max-width: 820px) {
  .inner-container  {
    bottom: 50px !important;
  }
  .inner-container > h1 {
    font-size: 60px;
    line-height: 66px !important;
  }
  .category-header {
    min-height: 300px !important;
  }
}
</style>
