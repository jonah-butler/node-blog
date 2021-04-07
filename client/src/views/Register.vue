<template>
  <div class="container-full site-content">
    <div class="container">
      <form
      ref="form"
      @submit.prevent="register"
      enctype="multipart/form-data"
      >
          <h1>Register</h1>
          <slot name="header"/>
        <div class="label-input-container">
          <label>Username</label>
          <input
          type="text"
          ref="username"
          name="user[username]"
          v-model="user.username"
          @input="test($event, fields.username)"
          v-bind:class="{ 'input-error': fields.username.error,
          'input-success':  fields.username.isValid}"
          >
        </div>
        <div class="label-input-container">
          <label>Email</label>
          <input
          type="text"
          ref="username"
          @input="test($event, fields.email)"
          name="user[email]"
          v-model="user.email"
          v-bind:class="{ 'input-error': fields.email.error,
          'input-success':  fields.email.isValid}"
          >
        </div>
        <div class="label-input-container">
          <label>Password</label>
          <input
          @input="test($event, fields.password)"
          type="password"
          ref="password"
          name="user[password]"
          v-model="user.password"
          v-bind:class="{ 'input-error': fields.password.error,
          'input-success':  fields.password.isValid}"
          >
        </div>
          <img
          src=""
          ref="image"
          alt="user profile image to upload"
          @input="test($event, fields.file)"
          @load="checkImageSize"
          v-bind:class="{ active: user.imageActive }"
          id="imageBlob"
          >
          <div
          class="sub-headline error"
          v-if="fields.file.tooBig"
          >
            Image too large, reupload with accepted dimensions
          </div>
        <div class="label-input-container">
          <label>User Profile Image</label>
          <div class="sub-headline"> 70 x 70 max</div>
          <input
          @change="selectFile"
          type="file"
          ref="upload"
          name="post[userImage]">
        </div>
        <button
        class="primary-btn-link"
        type="submit"
        name="button"
        >
        Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationServices';

export default {
  name: 'Register',
  data() {
    return {
      user: {
        imageBlob: [],
        username: '',
        email: '',
        password: '',
        upload: '',
        imageActive: false,
      },
      fields: {
        username: {
          error: false,
          isValid: false,
        },
        email: {
          error: false,
          isValid: false,
        },
        password: {
          error: false,
          isValid: false,
        },
        file: {
          error: false,
          isValid: false,
          tooBig: false,
        },
      },
    };
  },
  methods: {
    test(event, valueObj) {
      if (event.target.value) {
        valueObj.isValid = true; // eslint-disable-line no-param-reassign
        valueObj.error = false; // eslint-disable-line no-param-reassign
      } else {
        valueObj.error = true; // eslint-disable-line no-param-reassign
        valueObj.isValid = false; // eslint-disable-line no-param-reassign
      }
    },
    selectFile() {
      this.user.imageActive = false;
      [this.user.upload] = this.$refs.upload.files;
      this.createBlob(this.user.upload);
      this.toggleImageClass();
    },
    checkImageSize() {
      if (this.$refs.image.naturalWidth > 70 || this.$refs.image.naturalHeight > 70) {
        console.log('image too large. please resize and reupload.');
        this.fields.file.tooBig = true;
        this.revokePreviousUrl();
      } else {
        this.fields.file.tooBig = false;
        this.revokePreviousUrl();
      }
    },
    async createBlob(file) {
      const blob = new Blob([file]);
      const link = URL.createObjectURL(blob);
      this.user.imageBlob.push(link);
      this.$refs.image.src = link;
    },
    async revokePreviousUrl() {
      if (this.user.imageBlob.length > 1) {
        URL.revokeObjectURL(this.user.imageBlob[0]);
        this.user.imageBlob.shift();
      }
    },
    toggleImageClass() {
      this.user.imageActive = !this.user.imageActive;
    },
    async register() {
      try {
        const formData = new FormData();
        formData.append('username', this.user.username);
        formData.append('email', this.user.email);
        formData.append('password', this.user.password);
        formData.append('image', this.user.upload);
        const resp = await AuthenticationService.register(formData);
        if (resp.status === 201) {
          console.log(resp);
          this.$store.dispatch('setToken', resp.data.token);
          this.$store.dispatch('setUser', resp.data.data);
          this.$router.push({ path: '/' });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
#imageBlob{
  width: 70px;
  height: 70px;
  visibility: hidden;
}
#imageBlob.active{
  visibility: visible !important;
}

</style>
