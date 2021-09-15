<template>
  <div class="site-content container-full">
    <div class="flex-container-full flex-center">
      <h1 class="">Drafts</h1>
    </div>
    <div
    @click="changeRoute(draft.slug)"
    v-for="draft in drafts"
    :key="draft.title"
    class="blog row justify-center">
    <div class="detail-container">
      <p class="old-blog-date">{{ draft.createdAt }}</p>
      <h3 class="old-blog-title primary-btn-link">
        {{ draft.title }}
      </h3>
    </div>
    </div>
  </div>
</template>

<script>
import BlogServices from '@/services/BlogServices';

export default {
  name: 'Drafts',
  components: {},
  created() {
    // eslint-disable-next-line
    if (this.$store.state) {
      // eslint-disable-next-line
      this.retrieveDrafts({ user: this.$store.state.user });
    } else {
      this.$router.push({ name: 'Blog' });
    }
  },
  data() {
    return {
      drafts: null,
    };
  },
  methods: {
    async retrieveDrafts(user) {
      const drafts = (await BlogServices.drafts(user)).data;
      this.drafts = drafts;
    },
    changeRoute(slug) {
      this.$router.push({
        name: 'DraftShow',
        params: {
          slug,
        },
        path: `/drafts/${slug}`,
      });
    },
  },
  props: {
    id: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>

</style>
