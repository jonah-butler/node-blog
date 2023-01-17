<template>
  <div class="site-content"></div>
</template>

<script>
import helpers from '@/assets/scripts/helpers';
import hljs from 'highlight.js';
import router from '@/router/index';

export default {
  name: 'Random',
  components: {},
  data() {
    return {
      blog: '',
      loading: false,
      error: null,
    };
  },
  created() {
    this.retrieveRandomPost();
  },
  methods: {
    highlightPost() {
      const x = document.querySelectorAll('pre');
      x.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
    async retrieveRandomPost() {
      this.loading = true;
      const res = await fetch('https://jonahbutler-dev.herokuapp.com/random');
      this.blog = await res.json();
      router.push({ name: 'BlogShow', params: { slug: this.blog.slug } });
      this.loading = false;
    },
    dateFormat(date) {
      return helpers.dateFormat(date);
    },
  },
};
</script>

<style lang="css" scoped>
.post-title{
  font-size: 75px;
  color: #3d4656;
  margin: 0;
}

.date{
  color: #d46082;
  font-weight: 600;
  width: fit-content;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
