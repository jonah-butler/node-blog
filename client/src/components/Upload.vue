<template>
  <div class="site-content">
    <modal ref="modalYeah">
      <template v-slot:header>
        <h1>Markdown Reference</h1>
        <hr>
      </template>
      <template v-slot:body>
        <h4>Headers</h4>
        <hr>
        <p>Headers are just text preceeded by # symbols</p>
        <p># Test = h1</p>
        <p>## Test = h2</p>
        <p>There must be a space between the symbol and text!</p>
        <hr>
        <h4>Paragraphs</h4>
        <hr>
        <p>paragraphs are the easiest!</p>
        <p>Just enter chunks of text with spaces in between.</p>
        <hr>
        <h4>Bold/Italics</h4>
        <hr>
        <p>*single stars* or _single underscores_ are italics.</p>
        <p>Double stars or underscores are bold.</p>
        <p>Triple stars or underscores are both!</p>
        <hr>
        <h4>Including Code / Preserving Lines</h4>
        <hr>
        <p>To preserve line, indent the line with tab or at least four spaces.</p>
        <p>This is called preformatted text, so any markdown will not get formatted.</p>
        <hr>
        <h4>Inline HTML</h4>
        <hr>
        <p>Insert any type of markdown by seperating the elements from
           the text by a blank line and it must not include any spaces
           before the opening and closing HTML.</p>
      </template>
      <template v-slot:footer>

      </template>
    </modal>
    <button class="btn" @click="$refs.modalYeah.toggle()">Markdown Ref</button>
    <!-- <a href=""> -->
    <!-- </a> -->
    <div class="" v-if="submitting">
        <Loader/>
    </div>

    <div class="upload-form">
        <form @submit.prevent="sendFile" action="http://localhost:4000" enctype="multipart/form-data">
          <h1>upload view</h1>
          <div class="label-input-container">
            <label>Title</label>
            <input @change="selectTitle" type="text" ref="title" name="post[title]">
          </div>
          <div class="label-upload-container">
            <!-- <froala :tag="'textarea'" @change="selectFroala"
            ref="froalaText" v-model="froala"></froala> -->
            <textarea @change="selectFroala" ref="froalaText"
            name="post[text]" v-model="froala" rows="8" cols="80">
            </textarea>
          </div>
          <div class="label-input-container">
            <label>Featured Image</label>
            <input @change="selectFile" type="file" ref="upload" name="post[featuredImage]">
          </div>
          <div class="label-input-container">
            <label>Categories</label>
            <input @change="selectCategories" type="text" name="post[categories]" ref="categories">
          </div>
          <button type="submit" name="button">Submit</button>
        </form>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Loader from '@/components/TheLoader.vue';

export default {
  name: 'ImageUploadTest',
  components: {
    Modal, Loader,
  },
  data() {
    return {
      submitting: false,
      title: '',
      froala: 'edit here',
      body: '',
      upload: '',
      categories: '',
      sample: {
        text: '',
        file: '',
        title: '',
        categories: '',
      },
    };
  },
  methods: {
    test() {
      console.log(this.froala);
    },
    selectFroala() {
      // this.froala = this.$refs.froalaText.value;
      console.log(this.froala);
    },
    selectCategories() {
      this.categories = this.$refs.categories.value;
      this.sample.categories = this.categories;
    },
    selectTitle() {
      this.title = this.$refs.title.value;
      this.sample.title = this.title;
    },
    selectFile() {
      [this.upload] = this.$refs.upload.files;
      this.sample.file = this.upload;
    },
    selectText() {
      this.body = this.$refs.text.value;
      this.sample.text = this.body;
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('image', this.upload);
      formData.append('title', this.title);
      formData.append('froala', this.froala);
      formData.append('post', this.body);
      formData.append('categories', this.categories);
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      console.log(data);
    },
  },
};
</script>

<style>
  .upload-form{
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form{
    max-width: 600px;
    min-width: 350px;
    text-align: left;
  }
  .label-upload-container{
    margin: 15px 0;
  }
</style>
