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
          >
        </div>
        <div class="label-input-container">
          <label>Email</label>
          <input
          type="text"
          ref="username"
          name="user[email]"
          v-model="user.email"
          >
        </div>
        <div class="label-input-container">
          <label>Password</label>
          <input
          type="password"
          ref="password"
          name="user[password]"
          v-model="user.password"
          >
        </div>
        <img
        src=""
        ref="image"
        alt="user profile image to upload"
        v-bind:class="{ active: user.imageActive }"
        id="imageBlob"
        >
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
        imageBlob: '',
        username: '',
        email: '',
        password: '',
        upload: '',
        imageActive: false,
      },
    };
  },
  methods: {
    selectFile() {
      [this.upload] = this.$refs.upload.files;
      console.log(this.upload);
      this.checkFileSize(this.upload);
    },
    async checkFileSize(file) {
      const blob = new Blob([file]);
      console.log('blob', blob);
      const link = URL.createObjectURL(blob);
      this.user.imageBlob = link;
      console.log(this.user.imageBlob);
      this.$refs.image.src = link;
      this.toggleImageClass();
      if (this.$refs.image.h) {
        console.log('image size too large. upload again.');
      }
      URL.revokeObjectURL(link);
    },
    toggleImageClass() {
      this.user.imageActive = true;
      console.log(this.user.imageActive);
    },
    async register() {
      try {
        const resp = await AuthenticationService.register(this.user);
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
