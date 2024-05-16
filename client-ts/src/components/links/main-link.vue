<script setup lang="ts">

</script>

<template>
  <div class="container my-3 main-link-container z-10">
    <p class="font-light">January 12, 2024</p>
    <h1 class="text-2xl font-bold main-link relative p-2">An Approach to Errors in Typescript</h1>
  </div>
</template>

<style scoped>
.main-link-container {
  width: fit-content;
}
.main-link:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: -0.5rem;
  border-radius: 20px;
  background: #fa709a;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  transition: all .2s ease;
  z-index: -1;
}
.main-link:hover {
  cursor: pointer;
  color: white;
}
.main-link:hover:before {
  width: 100%;
  height: 100%;
  opacity: 1;
  left: 0rem;
}
</style>
