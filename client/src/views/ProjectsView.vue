<script setup lang="ts">
import MainLink from '@/components/links/main-link.vue';
</script>

<template>
  <div class="margin-auto container mb-5 overflow-hidden pb-10 text-center">
    <h2>Projects</h2>
    <p class="max-width-lg margin-auto">
      A list of personal projects and packages, some maintained and others not.
    </p>
    <article class="circle-bg mb-40 mt-40 px-10">
      <div class="text-left">
        <h2>Cellular Automata Playground</h2>
        <p>
          A cellular automata playground that includes several different CA
          algorithim flavors (from scratch): Drunkard's Walk, Elementary
          Cellular Automata, classic Cellular Automata, Moore's Neighborhood,
          and Cyclic Cellular Automata. Each type includes a set of parameters
          and rules that can be changed to generate many different results. Some
          CA flavors include an animating option that re-renders each lifecycle
          to the DOM.
        </p>
        <MainLink
          slug="https://github.com/jonah-butler/cellular-automata-playground"
          title="Check It Out"
        />
      </div>
    </article>
    <article class="circle-bg mb-40 mt-40 px-10">
      <div class="text-left">
        <h2>NPM Packages</h2>
        <p>
          Various npm packages I maintain. These include a utility package for
          checking equality between objects and another named palette that
          generates color palettes by analyzing pixel data from images via the
          median cut algorithm and includes some additional helpers for working
          with colors.
        </p>
        <MainLink slug="https://www.npmjs.com/~jayimbee" title="Check It Out" />
      </div>
    </article>
    <article class="circle-bg mb-40 mt-40 px-10">
      <div class="text-left">
        <h2>News CLI</h2>
        <p>
          A CLI application written in Go, leveraging the colly and promptui
          packages to allow the reading of articles from a news site. Some
          configuration options include the site's base URL, search endpoints,
          query params and HTML targets. With all these configurations loaded,
          and permitted access for scraping, this package can allow for the
          reading and navigation of a site within the CLI. It supports browsing
          of latest content, accessing a particular endpoint or searching, with
          date filtering, granted if the site in question supports these
          features through a search endpoint.
        </p>
        <MainLink
          slug="https://github.com/jonah-butler/news-cli"
          title="Check It Out"
        />
      </div>
    </article>
    <article class="circle-bg mb-40 mt-40 px-10">
      <div class="text-left">
        <h2>Graphic Editor - Simple Canva Clone</h2>
        <p>
          A proof of concept graphics editor that utilizes Typescript and a
          completely custom solution for editing graphics in the browser. All
          editing of elements is solely based on interacting with DOM Elements
          through the augmentation of CSS values. Each element interaction was
          custom built, and uses a conversion method to convert DOM Elements to
          SVGs before building them into an image that can be downloaded.
        </p>
        <MainLink
          slug="https://github.com/jonah-butler/html-to-canvas-playground"
          title="Check It Out"
        />
      </div>
    </article>
    <article class="circle-bg mb-40 mt-40 px-10">
      <div class="text-left">
        <h2>Developer Blog</h2>
        <p>
          This site you're on right now! It's a full-stack blogging platform for
          sharing code, utilizing Typescript, mongodb, Vu3, Pinia and marked for
          parsing code in posts and more. I won't talk about it much since
          you're here. So browse around and check it out!
        </p>
        <MainLink
          slug="https://github.com/jonah-butler/node-blog"
          title="Check It Out"
        />
      </div>
    </article>
  </div>
</template>

<style scoped></style>
