<script setup lang="ts">
import { dateOptions, formatDate } from '@/services/formatting';
import palette, { type RGBARecord } from '@jayimbee/palette';
import { computed, ref, type StyleValue } from 'vue';
import { useRouter } from 'vue-router';
import LikeCount from './like-count.vue';
import { type BlogShowImageHeader } from './props';

const props = defineProps<BlogShowImageHeader>();

const router = useRouter();

const imageColorPalette = ref<RGBARecord[]>([]);
const textShadowPalette = ref<RGBARecord>({} as RGBARecord);

const backgroundStyles = computed((): StyleValue => {
  return {
    'background-image': `url("${props.data.url}")`,
    'background-position': 'inherit',
    'background-size': 'cover',
  };
});

const dynamicTextShadow = computed((): StyleValue => {
  if (Object.keys(imageColorPalette.value).length) {
    return {
      'text-shadow': `2px 2px 0px rgba(${imageColorPalette.value[0].r}, ${imageColorPalette.value[0].g}, ${imageColorPalette.value[0].b}, ${imageColorPalette.value[0].a}),
      4px 4px 0px rgba(${imageColorPalette.value[1].r}, ${imageColorPalette.value[1].g}, ${imageColorPalette.value[1].b}, ${imageColorPalette.value[1].a}),
      6px 6px 0px rgba(${imageColorPalette.value[2].r}, ${imageColorPalette.value[2].g}, ${imageColorPalette.value[2].b}, ${imageColorPalette.value[2].a})`,

      color: `${computedHeaderColor.value}`,
    };
  } else {
    return {
      'text-shadow': '0px 0px 0px rgb(211, 94, 130)',
    };
  }
});

const computedHeaderColor = computed((): string => {
  const red = imageColorPalette.value[3].r;
  const green = imageColorPalette.value[3].g;
  const blue = imageColorPalette.value[3].b;

  return red * 0.299 + green * 0.587 + blue * 0.114 > 159 ? '#000' : '#fff';
});

const navigateToUserPage = (): void => {
  router.push(`/blog/user/${props.data.author.username}`);
};

const quantizeImage = async (): Promise<void> => {
  try {
    const cacheBustedUrl = `${props.data.url}?cacheBuster=${new Date().getTime()}`;
    const imageData = await palette.extractImageDataFromSrc(cacheBustedUrl, 8);
    imageColorPalette.value = palette.quantize(imageData);

    textShadowPalette.value =
      imageColorPalette.value[imageColorPalette.value.length - 1];
  } catch (err) {
    console.log(err);
  }
};

quantizeImage();
</script>

<template>
  <div
    class="post__details-container relative overflow-hidden bg-white"
    :style="backgroundStyles"
  >
    <div class="post__inner-details-container">
      <h1 class="font-size-75 mb-3 font-extrabold" :style="dynamicTextShadow">
        {{ data.title }}
      </h1>
      <div class="mb-3">
        <div @click="navigateToUserPage" class="avatar cursor-pointer">
          <div
            class="mr-3 w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
          >
            <img :src="data.author.profileImageLocation" />
          </div>
        </div>
        <span class="font-semibold text-red-700">
          {{ formatDate(data.createdAt, dateOptions.monthDayYear) }}
        </span>
        <span class="ml-5 text-xs font-light">
          {{ data.readTime }} minute read
        </span>
      </div>
      <div class="flex">
        <LikeCount :rating="data.rating" :interactive="true" />
        <span class="ml-5 flex">
          <span class="text-xs opacity-70">{{ data.views }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1536px) {
  .post__details-container {
    border-radius: 10px 10px 0 0 !important;
  }
}
.post__details-container {
  min-height: 500px;
  max-height: 600px;
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

html[data-theme='black'] .post__details-container::after {
  background-image: linear-gradient(180deg, rgba(0, 71, 101, 0) 15%, #000000);
}

@media (max-width: 820px) {
  .post__inner-details-container {
    bottom: 80px !important;
    left: 1rem !important;
  }
  .post__inner-details-container > h1 {
    font-size: 45px;
    line-height: 60px !important;
  }
}

.post__inner-details-container {
  position: absolute;
  bottom: 15px;
  left: 3rem;
  z-index: 1;
}

.post__inner-details-container > h1 {
  transition: all 0.5s ease;
  letter-spacing: 2px;
  line-height: 85px;
  color: black;
}
</style>
