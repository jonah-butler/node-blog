<script setup lang="ts">
import {RouterLink} from "vue-router";

const expandNavigation = (): void => {};

const expandSearch = (): void => {};

// store method with pinia?
const logout = (): void => {};

</script>

<template>
  <section>
    <div>

      <!-- code bracket svg -->
      <RouterLink to="/">
        <img class="navImg" src="@/assets/images/code-bracket.svg" alt="svg of open and close html code bracket with forward slash in middle">
      </RouterLink>

      <!-- hamburger container -->
      <div class="hamburger-bun">
        <img
          class="hamburger"
          src="@/assets/images/hamburger.png"
          alt="illustration of a hamburger with lettuce cheese and tomato"
          ref="hamburger"
          @click="expandNavigation"
        />
      </div>

      <!-- navigation links -->
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

          <!-- state navigation for admin -->
          <!-- possibly add more eventually -->
          <li>
            <RouterLink to="/drafts">Drafts</RouterLink>
          </li>
          <li @click="logout">
            Logout
          </li>
        </ul>
      </div>

    </div>
    <!-- search dropdown component -->
  </section>
</template>

<style scoped>

</style>