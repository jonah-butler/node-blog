<template>
  <div class="site-content">
    <div class="" v-if="submitting">
        <Loader/>
    </div>

    <div class="upload-form">
        <div>
          <h1>New Blog</h1>
          <div class="label-input-container">
            <label>Post Status</label>
            <select
            ref="status"
            v-model="status"
            id="postStatus">
              <option selected value="false">Draft</option>
              <option value="true">Publish</option>
            </select>
          </div>
          <div class="tag-input-container">
            <label class="headline">Featured Image</label>
            <div class="img-preview-container" v-if="blob">
              <img class="img-preview" :src="blob">
            </div>
            <input
            @change="selectFile"
            type="file"
            ref="upload"
            name="post[featuredImage]">
            <button
              v-if="blob"
              @click="clearLocalImage"
              class="primary-btn-link"
            >
            clear image
            </button>
          </div>
          <div class="tag-input-container">
            <label class="headline">Title</label>
            <input
            class="tag-input-component"
            @change="selectTitle"
            type="text"
            ref="title"
            name="post[title]">
          </div>
          <div class="tag-input-container">
            <div class="headline">Add Category</div>
            <div id="spanContainer"></div>
            <input
            class="tag-input-component categorical"
            type="text">
          </div>
          <div class="label-input-container">
            <label>Contents</label>
            <div class="primary-btn-link" @click="switchEditors">switch editors</div>
            <Editorjs v-if="selectedEditor === 'editorjs'" @updatedContents="updateContents"/>
            <div id="quill" v-if="selectedEditor === 'quill'">
              <div @input="selectText" ref="text" id="editor"></div>
            </div>
            <section class="notification">
              {{ notification }}
            </section>
          </div>
          <div class="">
            <button
            class="primary-btn-link"
            type="submit"
            name="button"
            @click="createNewBlog"
          >
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
import hljs from 'highlight.js';
import Quill from 'quill';
import Editorjs from '@/components/inputs/Editorjs.vue';
import BlogServices from '../services/BlogServices';

export default {
  name: 'ImageUploadTest',
  components: {
    Loader,
    Editorjs,
  },
  mounted() {
    this.initializeCategorical();
  },
  data() {
    return {
      notification: '',
      submitting: false,
      title: '',
      contents: 'edit here',
      status: 'false',
      body: '',
      upload: '',
      categories: [],
      editor: null,
      sample: {
        text: '',
        file: '',
        title: '',
        categories: '',
      },
      blob: '',
      selectedEditor: 'editorjs',
    };
  },
  methods: {
    initializeQuill() {
      setTimeout(() => {
        this.editor = new Quill('#editor', {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
            ],
            syntax: {
              highlight: (text) => hljs.highlightAuto(text).value,
            },
          },
          theme: 'snow',
        });
      }, 500);
    },
    initializeCategorical() {
      const c = new categorical.Categorical(document.querySelector('.categorical'), document.querySelector('#spanContainer'), 'post[category]');
      c.init();
    },
    selectCategories() {
      Array.from(document.querySelectorAll('.data-added > input')).forEach((input) => this.categories.push(input.value));
    },
    selectTitle() {
      this.title = this.$refs.title.value;
      this.sample.title = this.title;
    },
    selectFile() {
      [this.upload] = this.$refs.upload.files;
      this.sample.file = this.upload;
      this.buildImagePreview();
    },
    buildImagePreview() {
      const blob = new Blob([this.upload]);
      this.blob = URL.createObjectURL(blob);
    },
    clearLocalImage() {
      URL.revokeObjectURL(this.blob);
      this.blob = '';
      this.$refs.upload.value = '';
    },
    switchEditors() {
      if (this.selectedEditor === 'editorjs') {
        this.selectedEditor = 'quill';
        this.initializeQuill();
        return;
      }
      this.selectedEditor = 'editorjs';
    },
    updateContents(updatedContent) {
      this.text = updatedContent;
    },
    selectText() {
      this.text = this.editor.root.innerHTML;
    },
    async createNewBlog() {
      this.selectCategories();
      const formData = new FormData();
      formData.append('image', this.upload);
      if (this.status === 'false') {
        formData.append('published', false);
      } else {
        formData.append('published', true);
      }
      formData.append('title', this.title);
      formData.append('text', this.text);
      formData.append('post', this.body);
      formData.append('categories', JSON.stringify(this.categories));
      formData.append('user', this.$store.state.user);
      console.log('hit upload func', BlogServices);
      const response = (await BlogServices.new(formData)).data;
      if (response._id) { // eslint-disable-line
        if (response.published) {
          this.$router.push({ path: `/blog/${response.slug}` });
        } else {
          this.$router.push({ path: `/drafts/${response.slug}` });
        }
      } else {
        this.updateNotification('error submitting new blog');
      }
    },
    updateNotification(str) {
      this.notification = str;
      setTimeout(() => {
        this.notification = '';
      }, 5000);
    },
  },
};
</script>

<style>
  .upload-form{
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }
  .label-upload-container{
    margin: 15px 0;
  }

  #spanContainer{
  max-width: 100%;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  transition: all 1s ease;
}

.headline{
  opacity: 0.6;
  font-size: 12px;
  text-align: left;
}

.sub-headline {
  font-size: 10px;
  opacity: 0.6;
}

#spanContainer > span{
  display: inline-block;
  flex-direction: row;
}

.data-added{
  background-color: #f7b3c9;
  color: black;
  padding: 5px 7px;
  border-radius: 25px;
  font-size: 13px;
  margin: 3px 7px 5px 0;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15);
  transition: all .3s ease;
  position: relative;
  bottom: 0;
  right: 0;
}

.data-added:hover{
  box-shadow: 0px 0px 0px rgba(0,0,0,0);
  bottom: -1px;
  right: -1px;
}

.data-added > .category-close{
  padding: 3px;
  position: relative;
  top: -6px;
  right: -6px;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  transition: all .3s ease;
}

.data-added > .category-close:hover{
  cursor: pointer;
}

.tag-input-container, .tag-input-container-large{
  display: inline-block;
  width: 50%;
  border-radius: 5px;
  padding: 15px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.tag-input-container-large{
  max-width: 800px;
}

.tag-input-container > input{
  /* border-bottom: 1px solid rgba(0,0,0,0.3); */
  outline: none;
  width: 90%;
}

.tag-input{
  margin: 15px 15px 0 0;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  background: none;
}

.tag-input:focus{
  outline: none;
}

.tag-input:focus .tag-input-container{
  border: 2px solid #006599;
  box-shadow: 0 0 0 4px rgba(0,101,153,0.5);
  outline: none;
}

label{
  display: block;
}

.category{
  border-radius: 15px;
  background-color: #d5d5d5;
  padding: 5px;
  opacity: 1;
  color: darkblue;
  transition: .3s ease;
  font-size: 13px;
}

.category:hover{
  opacity: 0.7;
  cursor: pointer;
}

.category-container{
  margin-bottom: 20px;
  margin-top: 7px;
}

.category-container > a {
  text-decoration: none;
  margin: 3px 3px 3px 0px;
}

.tag-input-container > textarea, .tag-input-container-large > textarea{
  box-shadow: 0 0 0 !important;
  border-radius: 0px !important;
}

.img-preview-clear {
  position: absolute;
  top: 25px;
  left: 270px;
  font-weight: 800;
}

.img-preview {
  max-width: 400px;
}
</style>
