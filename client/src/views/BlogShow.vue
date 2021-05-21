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
            backgroundPosition: 'inherit',
            backgroundSize: 'cover',
          }">
          <div class="blog-details">
            <h1 class="post-title">{{ blog.title }}</h1>
            <div class="date-container">
              <span class="date">{{ dateFormat(blog.createdAt) }}</span>
              <span class="read-time">{{calculateReadTime(blog.text)}} minute read</span>
            </div>
            <div class="like">
              <Heart :slug="slug"/>
              <div class="rating">{{ rating }}</div>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="container-full">
            <div class="container">
              <div class="row">
                <div class="col-xsmall-12 col-md-2 dir-col align-base">
                  <span
                  class="category-tag"
                  v-for="category in blog.categories"
                  :key="category"
                  >{{ category }}</span>
                </div>
                <div
                class="col-xsmall-12 col-md-10 dir-col"
                v-html="blog.sanitizedHTML">
                </div>
              </div>
              </div>
            </div>
            </div>
            <button
            class="primary-btn-link"
            @click="promptUserDelete()"
            v-if="this.$store.state.isUserLoggedIn">
            Delete Post?
            </button>
            <router-link
            v-if="this.$store.state.isUserLoggedIn"
            class="primary-btn-link"
            :to="{ name: 'BlogEdit', params: {
            id:blog._id,
            slug:blog.slug
            } }">
              Edit Post?
            </router-link>
          </div>
      </transition>
      <div class="container-full big-margin-top">
        <div class="row space-between">
          <div
          v-if="nextBlog"
          @click="changeRoute(nextBlog.slug, nextBlog._id)"
          class="old-blog">
            <div class="detail-container">
              <p class="old-blog-date">newer</p>
              <h3 class="old-blog-title primary-btn-link">
                {{ nextBlog.title }}
              </h3>
            </div>
          </div>
          <div
          v-if="previousBlog"
          @click="changeRoute(previousBlog.slug, previousBlog._id)"
          class="old-blog">
            <div class="detail-container">
              <p class="old-blog-date">older</p>
              <h3 class="old-blog-title primary-btn-link">
                {{ previousBlog.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '@/assets/scripts/helpers';
import Loader from '@/components/TheLoader.vue';
import Heart from '@/components/svgs/HeartLike.vue';
import hljs from 'highlight.js';
import EventBus from '@/bus.js';
import BlogServices from '../services/BlogServices';

export default {
  name: 'BlogShow',
  components: {
    Loader, Heart,
  },
  data() {
    return {
      blog: '',
      previousBlog: '',
      nextBlog: '',
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
      this.liked = data.liked;
      this.updatingLike = data.updating;
      this.likePost({
        slug: this.slug,
        liked: this.liked,
        rating: this.rating,
      });
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
    changeRoute(slug, id) {
      this.$router.push({
        name: 'BlogShow',
        params: {
          slug,
          id,
        },
        path: `/blog/${slug}`,
      }).catch((err) => {
        if (
          err.name !== 'NavigationDuplicated'
          && !err.message.includes('Avoided redundant navigation to current location')
        ) {
          // But print any other errors to the console
          console.log(err);
        }
      });
    },
    calculateReadTime(text = '') {
      return Math.ceil(text.split(' ').length / 200);
    },
    highlightPost() {
      // hljs.configure({
      //   languages: ['javascript'],
      // });
      const x = document.querySelectorAll('pre code');
      x.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
    async retrieveBlog(slug = {}) {
      // const tester = JSON.stringify({ yo: 'yo' });
      try {
        this.states.loading = true;
        const response = (await BlogServices.show(slug)).data;
        this.blog = response.post1;
        this.previousBlog = response.previousPost;
        this.nextBlog = response.nextPost;
        this.rating = this.blog.rating;
        this.states.loading = false;
      } catch (err) {
        console.log(err);
        this.error = err;
      }
    },
    async likePost(data = {}) {
      try {
        const post = (await BlogServices.like(data)).data;
        this.rating = post.rating;
        EventBus.$emit('rating-return', {
          updating: false,
        });
      } catch (err) {
        console.log(err);
        this.error = err;
      }
    },
    dateFormat(date) {
      return helpers.dateFormat(date);
    },
    async promptUserDelete() {
      const confirmation = prompt(`Do you really wanna delete your post? Type ${this.slug} to confirm.`); // eslint-disable-line no-alert
      if (confirmation === this.slug) {
        try {
          const result = (await BlogServices.delete(
            {
              slug: this.slug,
              user: this.$store.state.user,
            },
          )).data;
          if (result.deletedCount === 1) {
            this.$router.push({ name: 'Blog' });
          }
        } catch (err) {
          console.log(err);
          this.error = err;
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
@media (max-width: 820px) {
  .featured-image-container{
    max-height: 340px !important;
    min-height: 340px !important;
  }
  .post-title{
    font-size: 24px !important;
  }
}
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
  padding-left: 20px;
  font-weight: 300;
  font-size: 13px;
  color: black;
}

.date-container{
  margin-top: 15px;
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

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #2d2b57;
  font-weight: 600;
  border-radius: 5px;
  font-size: 17px;
  width: 98%;
  border-radius: 5px;
}

.hljs-title {
  color: #fad000;
  font-weight: normal;
}

.hljs-name {
  color: #a1feff;
}

.hljs-tag {
  color: #ffffff;
}

.hljs-attr {
  color: #f8d000;
  font-style: italic;
}

.hljs-built_in,
.hljs-selector-tag,
.hljs-section {
  color: #fb9e00;
}

.hljs-keyword {
  color: #fb9e00;
}

.hljs,
.hljs-subst {
  color: #e3dfff;
}

.hljs-string,
.hljs-attribute,
.hljs-symbol,
.hljs-bullet,
.hljs-addition,
.hljs-code,
.hljs-regexp,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-template-tag,
.hljs-quote,
.hljs-deletion {
  color: #4cd213;
}

.hljs-meta,
.hljs-meta-string {
  color: #fb9e00;
}

.hljs-comment {
  color: #ac65ff;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-name,
.hljs-strong {
  font-weight: normal;
}

.hljs-literal,
.hljs-number {
  color: #fa658d;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

</style>
