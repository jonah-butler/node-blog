<script setup lang="ts">
import { inject, ref } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline';
import { type LikeCount } from './props';
import { type BlogLikeInjector } from '@/views/injectors';

defineProps<LikeCount>();

const injector = inject<BlogLikeInjector>('updateBlogRating');

const liked = ref(false);
const updating = ref(false);

const likeBlog = async (like: boolean): Promise<void> => {
  if (updating.value) return;

  if (injector) {
    updating.value = true;
    const success = await injector.updateBlogRating(like);
    if (success) {
      // deselecting like should updated in memory value of liked
      // so outlined heart displays when like is clicked every 2nd time
      liked.value = like;
    }
    updating.value = false;
  }
};

defineExpose({
  likeBlog,
});
</script>

<template>
  <span class="flex">
    <button v-if="interactive" class="heart-btn btn btn-ghost h-0 min-h-0 p-0">
      <div class="h-8 w-8">
        <HeartIconOutline
          v-if="!liked"
          @click="likeBlog(true)"
          class="interactive-heart h-8 cursor-pointer stroke-rose-700 text-left hover:border-transparent"
        />
        <HeartIcon
          @click="likeBlog(false)"
          v-else
          class="h-8 fill-rose-700 text-left"
        />
      </div>
    </button>
    <HeartIcon v-else class="h-8 fill-rose-700 text-left" />
    <span class="text-xs opacity-70">{{ rating }}</span>
  </span>
</template>

<style scoped>
.heart-btn:hover {
  background-color: transparent !important;
}
.interactive-heart {
  transition: all 0.2s ease;
}
.interactive-heart:active {
  height: 1.8rem;
}
</style>
