<template>
  <div class="container-full site-content">
    <div class="container">
      <form
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
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
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

</style>
