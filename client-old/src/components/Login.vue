<template>
  <div class="container-full site-content">
    <div class="container">
      <form
      @submit.prevent="login"
      >
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
        Login
        </button>
      </form>
      <div v-if="error">
        {{error}}
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const resp = await AuthenticationServices.login(this.user);
        if (resp.status === 201) {
          this.error = '';
          this.$store.dispatch('setToken', resp.data.token);
          this.$store.dispatch('setUser', resp.data.user);
          this.$router.push({ path: '/' });
        } else {
          this.error = resp.data.error;
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>

<style>

</style>
