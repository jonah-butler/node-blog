<template>
  <div class="site-content">
    <div class="upload-form">
        <div>
          <h1>Edit {{ blog.title }}</h1>
          <div class="label-input-container">
            <label>Title</label>
            <input v-model="blog.title" type="text" ref="title" @input="selectTitle">
          </div>
          <div class="label-input-container">
            <Editorjs v-if="blog._id" @updatedContents="updateContents" :contents="blogContents"/>
          </div>
          <div class="label-input-container">
            <label>
              Featured Image
              <span v-if="!blog.featuredImageKey && !imageBlob">(default featured image)</span>
            </label>
            <div class="image-container">
              <img v-if="imageBlob !== ''" :src="imageBlob" alt="">
              <img v-if="imageBlob == ''" :src="blog.featuredImageLocation" alt="">
            </div>
            <input @change="selectFile" type="file" ref="upload" name="post[featuredImage]">
            <button
              @click.prevent="deleteImage"
              v-if='blog.featuredImageLocation && blog.featuredImageKey'
              class="primary-btn-link"
              :disabled="submitting"
              name="button"
            >
            Delete Image
            </button>
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

            pub value: {{ publish }}
            <div v-if="!publish">
              <div>
                <input v-model="publish" type="radio" id="false" name="status" value="false"
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
            @click="updateBlog"
            :disabled="submitting"
            name="button">
            Submit
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader.vue';
import categorical from '@/assets/scripts/categorical';
import Editorjs from '@/components/inputs/Editorjs.vue';
import S3Services from '@/services/S3Services';

export default {
  name: 'BlogEdit',
  components: {
    Loader,
    Editorjs,
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
      editor: undefined,
      imageBlob: '',
    };
  },
  async mounted() {
    await this.retrieveBlog({ _id: this.id, user: this.$store.state.user });
    this.initializeCategorical();
  },
  methods: {
    async deleteImage() {
      this.loading = true;
      const payload = {
        uri: this.blog.featuredImageLocation,
        blogId: this.blog._id,
      };
      const response = await S3Services.deleteImg(payload);
      if (response.status !== 200) {
        console.log('delete image error', response.data);
      } else {
        this.blog = response.data.blog;
      }
      this.loading = false;
    },
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
    updateContents(updatedContent) {
      this.updatedBlog.text = updatedContent;
    },
    selectTitle() {
      this.updated = true;
      this.updatedBlog.title = this.$refs.title.value;
    },
    selectFile() {
      this.updated = true;
      [this.upload] = this.$refs.upload.files;
      this.updatedBlog.file = this.upload;
      const blob = new Blob([this.upload]);
      this.imageBlob = URL.createObjectURL(blob);
    },
    selectCategories() {
      Array.from(document.querySelectorAll('.data-added > input')).forEach((input) => this.updatedBlog.categories.push(input.value));
    },
    async updateBlog() {
      this.submitting = !this.submitting;
      this.selectCategories();
      const formData = new FormData();
      formData.append('id', this.id);
      if (this.updatedBlog.text !== '') {
        formData.append('text', this.updatedBlog.text);
      }
      if (this.updatedBlog.file !== '') {
        formData.append('image', this.updatedBlog.file);
      }
      if (this.updatedBlog.title !== '') {
        formData.append('title', this.updatedBlog.title);
      }
      if (this.updatedBlog.categories.length) {
        formData.append('categories', JSON.stringify(this.updatedBlog.categories));
      }
      if (this.publish !== '') {
        formData.append('published', this.publish);
      }
      const response = await fetch('https://jonahbutler-dev.herokuapp.com/blog/edit', {
        method: 'PUT',
        body: formData,
      });
      this.updated = false;
      const data = await response.json();
      if (data.updatedBlog) {
        this.submitting = !this.submitting;
        if (data.updatedBlog.published) {
          this.$router.push({ path: `/blog/${data.updatedBlog.slug}` });
        } else {
          this.$router.push({ path: `/drafts/${data.updatedBlog.slug}` });
        }
      }
    },
  },
  computed: {
    blogContents() {
      return this.blog.text;
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
