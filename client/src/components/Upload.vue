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
          <!-- <div class="label-input-container">
            <label>Categories</label>
            <input @change="selectCategories" type="text" name="post[categories]" ref="categories">
          </div> -->
          <div class="tag-input-container">
            <div class="headline">Add Category</div>
            <div id="spanContainer"></div>
            <input class="tag-input-component"
            type="text"
            >
          </div>
          <button type="submit" name="button">Submit</button>
        </form>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Loader from '@/components/TheLoader.vue';
import categorical from '@/assets/scripts/categorical';

export default {
  name: 'ImageUploadTest',
  components: {
    Modal, Loader,
  },
  mounted() {
    this.initializeCategorical();
  },
  data() {
    return {
      submitting: false,
      title: '',
      froala: 'edit here',
      body: '',
      upload: '',
      categories: [],
      sample: {
        text: '',
        file: '',
        title: '',
        categories: '',
      },
    };
  },
  methods: {
    initializeCategorical() {
      const c = new categorical.Categorical(document.querySelector('.tag-input-component'), document.querySelector('#spanContainer'), 'post[category]');
      c.init();
    },
    test() {
      console.log(this.froala);
    },
    selectFroala() {
      // this.froala = this.$refs.froalaText.value;
      console.log(this.froala);
    },
    selectCategories() {
      // this.categories = this.$refs.categories.value;
      // this.sample.categories = this.categories;
      Array.from(document.querySelectorAll('.data-added > input')).forEach((input) => this.categories.push(input.value));
      // for (const input of document.querySelectorAll('.data-added > input')) {
      //   this.categories.push(input.value);
      // }
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
      this.selectCategories();
      const formData = new FormData();
      formData.append('image', this.upload);
      formData.append('title', this.title);
      formData.append('froala', this.froala);
      formData.append('post', this.body);
      formData.append('categories', JSON.stringify(this.categories));
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

  #spanContainer{
  max-width: 100%;
  text-align: left;
  margin-top: 10px;
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
  background-color: #e4e2df;
  color: #454545;
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
  border: 2px solid rgba(0,0,0,0.4);
  border-radius: 5px;
  padding: 15px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.tag-input-container-large{
  max-width: 800px;
}

.tag-input-container > input{
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  outline: none;
  width: 100%;
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
</style>
