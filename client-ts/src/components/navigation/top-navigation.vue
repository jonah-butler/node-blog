<script setup lang="ts">
import {RouterLink} from "vue-router";

const expandNavigation = (): void => {};

const expandSearch = (): void => {};

// store method with pinia?
const logout = (): void => {};

</script>

<template>
    <div class="navbar bg-off_white rounded-t-md px-5">
      <!-- home -->
      <div class="navbar-start">
        <img class="max-w-10" src="@/assets/images/code-bracket.svg" alt="svg of open and close html code bracket with forward slash in middle">
      </div>

      <!-- main links -->
      <div class="navbar-center">
        <ul class="menu menu-horizontal p-2">
          <li class="link">
            <RouterLink to="/">Blog</RouterLink>
          </li>
          <li class="link">
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li class="link">
            <a @click="expandSearch">Search</a>
          </li>
          <li class="link">
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li class="link">
            <RouterLink to="/random">Random</RouterLink>
          </li>
          <li class="link">
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
        </ul>
      </div>

      <!-- authenticated-->
      <div class="navbar-end"></div>
    </div>
  <!-- <section>
    <div>

      
      <RouterLink to="/">
        <img class="navImg" src="@/assets/images/code-bracket.svg" alt="svg of open and close html code bracket with forward slash in middle">
      </RouterLink>

      <div class="hamburger-bun">
        <img
          class="hamburger"
          src="@/assets/images/hamburger.png"
          alt="illustration of a hamburger with lettuce cheese and tomato"
          ref="hamburger"
          @click="expandNavigation"
        />
      </div>

      <div>
        <ul>
          <li>
            <RouterLink to="/">Blog</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li>
            <a @click="expandSearch">Search</a>
          </li>
          <li>
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/random">Random</RouterLink>
          </li>
          <li>
            <Router to="/contact">Contact</Router>
          </li>

          <li>
            <RouterLink to="/drafts">Drafts</RouterLink>
          </li>
          <li @click="logout">
            Logout
          </li>
        </ul>
      </div>

    </div>
  </section> -->
</template>

<style scoped>

</style>