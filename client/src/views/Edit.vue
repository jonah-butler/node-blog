<template>
  <div class="site-content">
    <div class="upload-form">
        <form @submit.prevent="updateBlog" action="http://localhost:4000/blog/edit" enctype="multipart/form-data">
          <h1>Edit {{ blog.title }}</h1>
          <div class="label-input-container">
            <label>Title</label>
            <input v-model="blog.title" type="text" ref="title" @input="selectTitle">
          </div>
          <div class="label-upload-container">
            <textarea ref="text" :value="blog.sanitizedHTML"
            @input="selectText" rows="8" cols="80">
            </textarea>
          </div>
          <div class="label-input-container">
            <label>Featured Image</label>
            <div class="">
              <img :src="blog.featuredImageLocation" alt="">
            </div>
            <input @change="selectFile" type="file" ref="upload" name="post[featuredImage]">
          </div>
          <!-- <div class="label-input-container">
            <label>Categories</label>
            <input :value="blog.categories" type="text" @input="selectCategories" ref="categories">
          </div> -->
          <div class="tag-input-container">
            <div class="headline">Add Category</div>
            <div id="spanContainer">
              <span
              class="data-added"
              v-for="category in blog.categories"
              :key="category"
              >
              {{category}}
              <span
              class="category-close"
              @click="closeListener"
              >
              &times;
              </span>
              <input type="hidden"
              :value="category"
              >
              </span>
            </div>
            <input class="tag-input-component"
            type="text"
            >
          </div>
          <div v-if="submitting">
            <Loader/>
          </div>
          <div v-if="updated">
            <button class="primary-btn-link" type="submit" name="button">Submit</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader.vue';
import categorical from '@/assets/scripts/categorical';

export default {
  name: 'BlogEdit',
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      submitting: false,
      updated: false,
      blog: '',
      error: '',
      upload: '',
      updatedBlog: {
        text: '',
        file: '',
        title: '',
        categories: '',
      },
    };
  },
  created() {
    this.retrieveBlog({ _id: this.id, user: this.$store.state.user });
    // if (document.querySelector('.category-close')) {
    //   Array.from(document.querySelectorAll('.category-close')).forEach((close) => {
    //     console.log(close);
    //     close.addEventListener('click', (e) => {
    //       e.target.parentElement.remove();
    //     });
    //   });
    // }
  },
  mounted() {
    this.initializeCategorical();
  },
  methods: {
    closeListener(event) {
      event.target.parentElement.remove();
    },
    initializeCategorical() {
      const c = new categorical.Categorical(document.querySelector('.tag-input-component'), document.querySelector('#spanContainer'), 'post[category]');
      c.init();
    },
    async retrieveBlog(creds) {
      try {
        this.loading = true;
        const res = await fetch('http://localhost:4000/blog/edit', {
          method: 'POST',
          body: JSON.stringify(creds),
          header: {
            'Content-type': 'application/json',
          },
        });
        this.blog = await res.json();
        this.loading = false;
      } catch (err) {
        this.error = err;
      }
    },
    selectText() {
      // this.body = this.$refs.text.value;
      this.updated = true;
      this.updatedBlog.text = this.$refs.text.value;
      console.log(this.updatedBlog.text);
    },
    selectTitle() {
      // this.title = this.$refs.title.value;
      this.updated = true;
      this.updatedBlog.title = this.$refs.title.value;
      console.log(this.updatedBlog.title);
    },
    selectFile() {
      this.updated = true;
      [this.upload] = this.$refs.upload.files;
      this.updatedBlog.file = this.upload;
      console.log(this.updatedBlog.file);
    },
    selectCategories() {
      // this.categories = this.$refs.categories.value;
      this.updated = true;
      this.updatedBlog.categories = this.$refs.categories.value;
      console.log(this.updatedBlog.categories);
    },
    async updateBlog() {
      // const blogKeys = {};
      const formData = new FormData();
      // formData.append('id', this.id);
      // blogKeys.id = this.id;
      formData.append('id', this.id);
      if (this.updatedBlog.text !== '') {
        formData.append('text', this.updatedBlog.text);
        // blogKeys.text = this.updatedBlog.text;
      }
      if (this.updatedBlog.file !== '') {
        formData.append('image', this.updatedBlog.file);
        // blogKeys.image = this.updatedBlog.file;
      }
      if (this.updatedBlog.title !== '') {
        formData.append('title', this.updatedBlog.title);
        // blogKeys.title = this.updatedBlog.title;
      }
      if (this.updatedBlog.categories !== '') {
        formData.append('categories', this.updatedBlog.categories);
        // blogKeys.categories = this.updatedBlog.categories;
      }
      const response = await fetch('http://localhost:4000/blog/edit', {
        method: 'PUT',
        body: formData,
        headers: {
          // 'Content-type': 'application/json',
        },
      });
      this.submitting = !this.submitting;
      this.updated = false;
      const data = await response.json();
      if (data.updatedBlog) {
        this.submitting = !this.submitting;
        console.log(data.updatedBlog);
        this.$router.push({ path: `/blog/${data.updatedBlog.slug}` });
      }
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
img{
  max-width: 250px;
}
</style>
