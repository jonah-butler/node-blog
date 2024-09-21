<script setup lang="ts">
import { computed, ref, type StyleValue } from 'vue';
import { type BlogShowImageHeader } from './props';
import { dateOptions, formatDate } from '@/services/formatting';
import LikeCount from './like-count.vue';
import palette, { type RGBARecord } from '@jayimbee/palette';

const props = defineProps<BlogShowImageHeader>();

const imageColorPalette = ref<RGBARecord[]>([]);
const textShadowPalette = ref<RGBARecord>({} as RGBARecord);

const backgroundStyles = computed((): StyleValue => {
  return {
    'background-image': `url(${props.data.url})`,
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

  return red * 0.299 + green * 0.587 + blue * 0.114 > 140 ? '#000' : '#fff';
});

const quantizeImage = async (): Promise<void> => {
  try {
    const cacheBustedUrl = `${props.data.url}?cacheBuster=${new Date().getTime()}`;
    const imageData = await palette.extractImageDataFromSrc(cacheBustedUrl, 8);
    imageColorPalette.value = palette.quantize(imageData);
    console.log(imageColorPalette.value);
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
.post__details-container {
  min-height: 600px;
  max-height: 600px;
}

.post__details-container::after {
  content: '';
  background-image: linear-gradient(180deg, rgba(0, 71, 101, 0) 15%, #f4f5f7);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

@media (max-width: 820px) {
  .post__inner-details-container {
    bottom: 80px !important;
  }
  .post__inner-details-container > h1 {
    font-size: 60px;
    line-height: 66px !important;
  }
}

.post__inner-details-container {
  position: absolute;
  bottom: 15px;
  left: 3rem;
  z-index: 1;
}

.post__inner-details-container > h1 {
  transition: text-shadow 1.7s ease;
  transition: color 1s ease;
  letter-spacing: 2px;
  line-height: 85px;
  color: black;
}
</style>
