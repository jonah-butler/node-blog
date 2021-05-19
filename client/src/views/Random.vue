<template>
  <div class="site-content">
    <!-- <div class="post">

      <div v-if="loading">
        <Loader/>
      </div>

      <div v-if="error">
        {{ error }}
      </div>
    <transition name="fade">
      <div v-if="blog">
        <h1 class="post-title">{{ blog.title }}</h1>
        <div class="date">{{ dateFormat(blog.createDate) }}</div>
        <div v-html="blog.sanitizedHTML" class="flex-container-sm direction-col">
        </div>
        <button class="primary-btn-link" @click="promptUserDelete()">Delete Post?</button>
        <router-link class="primary-btn-link"
        :to="{ name: 'BlogEdit', params: {id:blog._id} }">
          Edit Post?
        </router-link>
      </div>
    </transition>
      </div> -->
  </div>
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
    // console.log(this.blog);
  },
  mounted() {
    // router.push({ name: 'BlogShow', params: { slug: this.blog.slug } });
  },
  updated() {
    // this.highlightPost();
    console.log(this.blog);
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(20px); */
}
</style>
