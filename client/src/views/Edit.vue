<template>
  <div class="site-content">
    <div class="upload-form">
        <form @submit.prevent="updateBlog" action="https://jonahbutler-dev.herokuapp.com/blog/edit" enctype="multipart/form-data">
          <h1>Edit {{ blog.title }}</h1>
          <div class="label-input-container">
            <label>Title</label>
            <input v-model="blog.title" type="text" ref="title" @input="selectTitle">
          </div>
          <div class="label-upload-container">
            <textarea ref="text"
            :value="blog.text"
            @input="selectText" rows="8" cols="80">
            </textarea>
            <!-- <froala
            ref="text"
            :value="blog.sanitizedHTML"
            v-model="blog.sanitizedHTML"
            @input="printFroala">
            </froala> -->
          </div>
          <div class="label-input-container">
            <label>Featured Image</label>
            <div class="">
              <img :src="blog.featuredImageLocation" alt="">
            </div>
            <input @change="selectFile" type="file" ref="upload" name="post[featuredImage]">
          </div>
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
          <div class="status label-input-container">
            <h3>Publish?</h3>
            <div v-if="blog.published == false">
              <div>
                <input v-model="blog.published" type="radio" id="false" name="status" value="false"
                checked>
                <label for="false">False</label>
              </div>
              <div>
                <input v-model="publish" type="radio" id="true" name="status" value="true">
                <label for="true">True</label>
              </div>
            </div>
            <div v-else>
              <div>
                <input v-model="publish" type="radio" id="false" name="status" value="false">
                <label for="false">False</label>
              </div>
              <div>
                <input v-model="publish" type="radio" id="true" name="status" value="true"
                checked>
                <label for="true">True</label>
              </div>
            </div>
          </div>
          <div v-if="submitting">
            <Loader/>
          </div>
          <div
          v-if="this.$store.state.isUserLoggedIn && !submitting">
            <button
            class="primary-btn-link"
            type="submit"
            :disabled="submitting"
            name="button">
            Submit
            </button>
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
      publish: '',
      updatedBlog: {
        text: '',
        file: '',
        title: '',
        categories: [],
      },
    };
  },
  created() {
    this.retrieveBlog({ _id: this.id, user: this.$store.state.user });
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
        const res = await fetch('https://jonahbutler-dev.herokuapp.com/blog/edit', {
          method: 'POST',
          body: JSON.stringify(creds),
          header: {
            'Content-type': 'application/json',
          },
        });
        this.blog = await res.json();
        this.publish = this.blog.published;
        this.loading = false;
      } catch (err) {
        this.error = err;
      }
    },
    printFroala() {
      console.log(this.blog.sanitizedHTML);
    },
    selectText() {
      this.updatedBlog.text = this.$refs.text.value;
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
      Array.from(document.querySelectorAll('.data-added > input')).forEach((input) => this.updatedBlog.categories.push(input.value));
    },
    async updateBlog() {
      this.submitting = !this.submitting;
      this.selectCategories();
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
      if (this.updatedBlog.categories.length) {
        formData.append('categories', JSON.stringify(this.updatedBlog.categories));
        // blogKeys.categories = this.updatedBlog.categories;
      }
      if (this.publish !== '') {
        if (this.publish === 'true') {
          formData.append('published', true);
        } else {
          formData.append('published', false);
        }
      }
      const response = await fetch('https://jonahbutler-dev.herokuapp.com/blog/edit', {
      // const response = await fetch('http://localhost:4000/blog/edit', {
        method: 'PUT',
        body: formData,
        headers: {
          // 'Content-type': 'application/json',
        },
      });
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

.status > div{
  display: inline-block;
  margin: 5px 10px 5px 0px;
}

input[type="radio"]{
  margin: 0 auto;
}
</style>
