<template>
  <div class="container-full site-content">
    <div class="container">
      <form enctype="multipart/form-data">
          <slot name="header"/>
        <div class="label-input-container">
          <label>Username</label>
          <input type="text" ref="username" name="user[username]">
        </div>
        <div class="label-input-container">
          <label>Password</label>
          <input type="password" ref="password" name="user[password]">
        </div>
        <button class="primary-btn-link" type="submit" name="button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style>

</style>
