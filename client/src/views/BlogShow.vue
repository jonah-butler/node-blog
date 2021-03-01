<template>
  <div class="container-full site-content">
    <div class="post">
      <div v-if="states.loading">
        <Loader/>
      </div>
      <div v-if="error">
        {{ error }}
      </div>
      <transition name="fade">
        <div v-if="blog">
          <div class="featured-image-container"
          v-bind:style="{
            backgroundImage: `url(${blog.featuredImageLocation})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }">
          <div class="blog-details">
            <h1 class="post-title">{{ blog.title }}</h1>
            <div class="date-container">
              <span class="date">{{ dateFormat(blog.createDate) }}</span>
              <span class="read-time">{{calculateReadTime(blog.text)}} minute read</span>
            </div>
            <div class="like">
              <Heart :slug="slug"/>
              <div class="rating">{{ rating }}</div>
            </div>
          </div>
          </div>
          <div class="container">
            <div v-html="blog.sanitizedHTML" class="flex-container-sm direction-col">
            </div>
          </div>
          <button class="primary-btn-link" @click="promptUserDelete()">Delete Post?</button>
          <router-link class="primary-btn-link"
          :to="{ name: 'BlogEdit', params: {
          id:blog._id,
          slug:blog.slug
          } }">
            Edit Post?
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import helpers from '@/assets/scripts/helpers';
import Loader from '@/components/TheLoader.vue';
import Heart from '@/components/svgs/HeartLike.vue';
import hljs from 'highlight.js';
import EventBus from '@/bus.js';

export default {
  name: 'BlogShow',
  components: {
    Loader, Heart,
  },
  data() {
    return {
      blog: '',
      error: null,
      liked: undefined,
      rating: undefined,
      states: {
        updatingLike: undefined,
        loading: false,
      },
    };
  },
  created() {
    this.retrieveBlog({ slug: this.slug });
  },
  mounted() {
    EventBus.$on('update-rating', (data) => {
      console.log('mounted');
      this.liked = data.liked;
      this.updatingLike = data.updating;
      this.likePost();
    });
  },
  updated() {
    this.highlightPost();
    this.calculateReadTime(this.blog.text);
  },
  beforeDestroy() {
    EventBus.$off('update-rating');
  },
  methods: {
    calculateReadTime(text = '') {
      return Math.floor(text.split(' ').length / 200);
    },
    highlightPost() {
      const x = document.querySelectorAll('pre');
      x.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
    async retrieveBlog(info = {}) {
      // const tester = JSON.stringify({ yo: 'yo' });
      try {
        this.states.loading = true;
        const res = await fetch('http://localhost:4000/blog', {
          method: 'POST',
          body: JSON.stringify(info),
          header: {
            'Content-type': 'application/json',
          },
        });
        this.blog = await res.json();
        this.rating = this.blog.rating;
        this.states.loading = false;
      } catch (err) {
        this.error = err;
      }
      // await this.highlightPost();
    },
    async likePost() {
      try {
        const res = await fetch('http://localhost:4000/blog/like', {
          method: 'POST',
          body: JSON.stringify({
            slug: this.slug,
            liked: this.liked,
            rating: this.rating,
          }),
          header: {
            'Content-type': 'application/json',
          },
        });
        const post = await res.json();
        this.rating = post.rating;
        EventBus.$emit('rating-return', {
          updating: false,
        });
      } catch (err) {
        console.log(err);
      }
    },
    dateFormat(date) {
      return helpers.dateFormat(date);
    },
    async promptUserDelete() {
      const confirmation = prompt('Do you really wanna delete your post? Type "YES" to confirm.');
      if (confirmation === 'YES') { // eslint-disable-line no-alert
        // console.log(JSON.stringify(this.slug));
        const res = await fetch(`http://localhost:4000/blog/delete/${this.slug}`, {
          method: 'DELETE',
          body: JSON.stringify({ slug: this.slug }),
          header: {
            'Content-type': 'application/json',
          },
        });
        const result = await res.json();
        if (result.deletedCount === 1) {
          this.$router.push({ name: 'Blog' });
        }
      }
    },
    async promptUserEdit() {
      console.log('yo');
    },
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="css" scoped>
.featured-image-container{
  position: relative;
  min-height: 600px;
  max-height: 600px;
  background-color: #f5f2eb;
  overflow: hidden;
}

.featured-image{
    width: 100%;
    height: 100%;
}

.post-title{
  font-size: 75px;
  color: #3d4656;
  margin: 0;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 50%);
}

@media (max-width: 600px) {
  .post-title{
    font-size: 40px;
  }
}

.date{
  color: #d46082;
  font-weight: 600;
  width: fit-content;
}

.date-container > .read-time{
  font-weight: 300;
  font-size: 13px;
  color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(20px); */
}

.like{
  display: inline-block;
  position: relative;
}

.rating{
  position: absolute;
  top: 5px;
  left: 35px;
  font-size: 12px;
}

.featured-image-container:after{
  content: '';
  background-image: linear-gradient(to bottom, rgba(0,71,101, 0) 40%, #f4f5f7 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.blog-details{
  position: absolute;
  bottom: 10px;
  left: 3rem;
  z-index: 1;
}
</style>
