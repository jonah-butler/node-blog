<script setup lang="ts">
import { computed } from 'vue';
import AdminActionCard from '../components/card/admin-action.vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { getUserId } = storeToRefs(userStore);

const newBlogRoute = computed((): string => {
  return `/admin/${getUserId.value}/create/blog`;
});

const browserUserDrafts = computed((): string => {
  return `/admin/${getUserId.value}/drafts`;
});
</script>

<template>
  <div class="flex w-full flex-wrap justify-center self-start">
    <AdminActionCard
      title="New Blog"
      description="create a new piece of content"
      :route="newBlogRoute"
    />
    <AdminActionCard
      title="View Drafts"
      description="browse posts currently in draft"
      :route="browserUserDrafts"
    />
  </div>
</template>

<style scoped></style>
