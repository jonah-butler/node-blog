<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { BlogService, BlogServiceError } from '../services/api/blog.service';

const router = useRouter();

const getRandomBog = async (): Promise<void> => {
  try {
    const randomBlog = await BlogService.getRandomBlog();
    router.push(`/blog/${randomBlog.blog.slug}`);
  } catch (err) {
    if (err instanceof BlogServiceError) {
      router.push('/');
    }
  }
};

onBeforeMount(async (): Promise<void> => {
  await getRandomBog();
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
