<template>
  <div class="container-full site-content">
    <div class="container">
      <form
      @submit.prevent="printUser"
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
    printUser() {
      console.log(this.user);
    },
  },
};
</script>

<style>

</style>
