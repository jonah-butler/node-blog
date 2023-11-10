<template>
  <div class="container-full site-content">
    <div class="container margin-auto text-center">
      <h1>Projects</h1>
      <p class="max-width-lg margin-auto">A list of previous and active projects.
        Mostly covering bigger projects ranging from full stack node projects,
        site design overhauls and big ui/ux designs.
      </p>
    </div>
    <div class="container margin-auto">
      <div class="row project">
        <div class="col-md-5 dir-col md-margin-top dot-background-left">
          <div class="slider">
            <div class="slider-container">
              <div class="expand-icon-container"
              style="transform: scale(0); opacity: 0; display: none;">
                <svg class="expand-icon" width="40" height="40"
                viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_d)">
                <path d="M4.0659 11.0033C4.06768 11.5535 4.51849
                11.9981 5.0728 11.9963L14.1058 11.967C14.6601 11.9652
                15.108 11.5177 15.1062 10.9674C15.1045 10.4172 14.6536
                9.97258 14.0993 9.97438L6.07 10.0004L6.04414 2.02997C6.04235
                1.47972 5.59155 1.03512 5.03724 1.03691C4.48293 1.03871 4.03502
                1.48623 4.03681 2.03648L4.0659 11.0033ZM5.21845 9.43769L4.35758
                10.2978L5.78155 11.7022L6.64242 10.8421L5.21845 9.43769Z" fill="white">
                </path>
                </g>
                <g filter="url(#filter4_d)">
                <path d="M19.3091 2.00304C19.3108 1.45279 18.8628 1.00537
                18.3085 1.00369L9.27546 0.976336C8.72115 0.974657 8.27044
                1.41936 8.26878 1.96961C8.26711 2.51985 8.71512 2.96728 9.26943
                2.96895L17.2988 2.99327L17.2746 10.9637C17.273 11.514 17.721 11.9614
                18.2753 11.9631C18.8296 11.9648 19.2803 11.5201 19.282 10.9698L19.3091
                2.00304ZM18.7076 3.00803L19.013 2.70665L17.5979 1.29335L17.2924
                1.59474L18.7076 3.00803Z" fill="white">
                </path>
                </g>
                <defs>
                <filter id="filter3_d" x="0.0368042" y="1.03691" width="19.0694"
                height="18.9594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow">
                </feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                <filter id="filter4_d" x="4.26877" y="0.976331" width="19.0404"
                height="18.9868" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4">
                </feOffset>
                <feGaussianBlur stdDeviation="2">
                </feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                </defs>
                </svg>
              </div>
              <div class="picture-row">
                  <div
                  v-for="image in ProjectImages.ns"
                  :key="image"
                  class="carousel-img">
                  <SliderImage
                  v-on:loaded="test"
                  :src="image"/>
                  </div>
              </div>
              <div class="dot-container dot-container-top"></div>
            </div>
          </div>
          <div class="row">
            <span class="category-tag">
              golang
            </span>
            <span class="category-tag">
              colly
            </span>
            <span class="category-tag">
              promptui
            </span>
          </div>
        </div>
        <div class="col-md-7 side-text-right">
          <div class="row dir-col">
          <h1 class="post-title text-underline text-sm">
            New CLI
          </h1>
          <div>
        <p>
          A CLI application written in Go, leveraging the
          colly and promptui packages to allow the reading of articles from a news site. Some
          configuration options include the site's base URL, search endpoints, query params and
          HTML targets. With all these configurations loaded, and permitted access for scraping,
          this package can allow for the reading and navigation of a site all within the CLI.
          It supports browsing of latest content, accessing a particular endpoint or searching,
          with date filtering, granted if the site in question supports these features through
          a search endpoint.
        </p>
        <p>
          <a href="https://github.com/jonah-butler/news-cli">check it out</a>
        </p>
          </div>
          </div>
        </div>
      </div>
      <div class="row project">
        <div class="col-md-7 side-text-right">
          <div class="row dir-col">
          <h1 class="post-title text-underline text-sm">
            Developer Blog
          </h1>
          <div>
        <p>
          This site you're on right now is my latest Vue/Vuex, node
          project!
          It's a blogging platform for sharing code, utilizing mongodb,
          Vuex and marked for parsing code in posts and more. I won't
          talk about it much since you're here. So browse around and
          check it out!
        </p>
        <p>
          <a href="https://github.com/jonah-butler/node-blog">check it out</a>
        </p>
          </div>
          </div>
        </div>
        <div class="col-md-5 dir-col md-margin-top dot-background-right">
          <div class="slider">
            <div class="slider-container">
              <div class="expand-icon-container"
              style="transform: scale(0); opacity: 0; display: none;">
                <svg class="expand-icon" width="40" height="40"
                viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_d)">
                <path d="M4.0659 11.0033C4.06768 11.5535 4.51849
                11.9981 5.0728 11.9963L14.1058 11.967C14.6601 11.9652
                15.108 11.5177 15.1062 10.9674C15.1045 10.4172 14.6536
                9.97258 14.0993 9.97438L6.07 10.0004L6.04414 2.02997C6.04235
                1.47972 5.59155 1.03512 5.03724 1.03691C4.48293 1.03871 4.03502
                1.48623 4.03681 2.03648L4.0659 11.0033ZM5.21845 9.43769L4.35758
                10.2978L5.78155 11.7022L6.64242 10.8421L5.21845 9.43769Z" fill="white">
                </path>
                </g>
                <g filter="url(#filter4_d)">
                <path d="M19.3091 2.00304C19.3108 1.45279 18.8628 1.00537
                18.3085 1.00369L9.27546 0.976336C8.72115 0.974657 8.27044
                1.41936 8.26878 1.96961C8.26711 2.51985 8.71512 2.96728 9.26943
                2.96895L17.2988 2.99327L17.2746 10.9637C17.273 11.514 17.721 11.9614
                18.2753 11.9631C18.8296 11.9648 19.2803 11.5201 19.282 10.9698L19.3091
                2.00304ZM18.7076 3.00803L19.013 2.70665L17.5979 1.29335L17.2924
                1.59474L18.7076 3.00803Z" fill="white">
                </path>
                </g>
                <defs>
                <filter id="filter3_d" x="0.0368042" y="1.03691" width="19.0694"
                height="18.9594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow">
                </feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                <filter id="filter4_d" x="4.26877" y="0.976331" width="19.0404"
                height="18.9868" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4">
                </feOffset>
                <feGaussianBlur stdDeviation="2">
                </feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                </defs>
                </svg>
              </div>
              <div class="picture-row">
                  <div
                  v-for="image in ProjectImages.nb"
                  :key="image"
                  class="carousel-img">
                  <SliderImage
                  v-on:loaded="test"
                  :src="image"/>
                  </div>
              </div>
              <div class="dot-container dot-container-top"></div>
            </div>
          </div>
          <div class="row">
            <span class="category-tag">
              vue
            </span>
            <span class="category-tag">
              vuex
            </span>
            <span class="category-tag">
              vue cli
            </span>
            <span class="category-tag">
              node
            </span>
            <span class="category-tag">
              mongodb
            </span>
            <span class="category-tag">
              jwt
            </span>
            <span class="category-tag">
              crud
            </span>
            <span class="category-tag">
              rest
            </span>
            <span class="category-tag">
              netlify
            </span>
            <span class="category-tag">
              heroku
            </span>
          </div>
        </div>
      </div>
      <div class="row project">
        <div class="col-md-5 md-margin-top dir-col dot-background-left">
          <div class="slider">
            <div class="slider-container">
              <div class="expand-icon-container"
              style="transform: scale(0); opacity: 0; display: none;">
                <svg class="expand-icon" width="40" height="40"
                viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_d)">
                <path d="M4.0659 11.0033C4.06768 11.5535 4.51849
                11.9981 5.0728 11.9963L14.1058 11.967C14.6601 11.9652
                15.108 11.5177 15.1062 10.9674C15.1045 10.4172 14.6536
                9.97258 14.0993 9.97438L6.07 10.0004L6.04414 2.02997C6.04235
                1.47972 5.59155 1.03512 5.03724 1.03691C4.48293 1.03871 4.03502
                1.48623 4.03681 2.03648L4.0659 11.0033ZM5.21845 9.43769L4.35758
                10.2978L5.78155 11.7022L6.64242 10.8421L5.21845 9.43769Z" fill="white">
                </path>
                </g>
                <g filter="url(#filter4_d)">
                <path d="M19.3091 2.00304C19.3108 1.45279 18.8628 1.00537
                18.3085 1.00369L9.27546 0.976336C8.72115 0.974657 8.27044
                1.41936 8.26878 1.96961C8.26711 2.51985 8.71512 2.96728 9.26943
                2.96895L17.2988 2.99327L17.2746 10.9637C17.273 11.514 17.721 11.9614
                18.2753 11.9631C18.8296 11.9648 19.2803 11.5201 19.282 10.9698L19.3091
                2.00304ZM18.7076 3.00803L19.013 2.70665L17.5979 1.29335L17.2924
                1.59474L18.7076 3.00803Z" fill="white">
                </path>
                </g>
                <defs>
                <filter id="filter3_d" x="0.0368042" y="1.03691" width="19.0694"
                height="18.9594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow">
                </feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                <filter id="filter4_d" x="4.26877" y="0.976331" width="19.0404"
                height="18.9868" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4">
                </feOffset>
                <feGaussianBlur stdDeviation="2">
                </feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                </defs>
                </svg>
              </div>
              <div class="picture-row">
                <div
                v-for="image in ProjectImages.db"
                :key="image"
                class="carousel-img">
                <SliderImage
                v-on:loaded="test"
                :src="image"/>
                </div>
              </div>
              <div class="dot-container dot-container-top"></div>
            </div>
          </div>
          <div class="row">
            <span class="category-tag">
              javascript
            </span>
            <span class="category-tag">
              ejs
            </span>
            <span class="category-tag">
              node.js
            </span>
            <span class="category-tag">
              mongodb
            </span>
            <span class="category-tag">
              heroku
            </span>
            <span class="category-tag">
              aws s3
            </span>
            <span class="category-tag">
              sendgrid
            </span>
            <span class="category-tag">
              passport
            </span>
          </div>
        </div>
        <div class="col-md-7 side-text-right">
          <div class="row dir-col">
          <h1 class="post-title text-underline text-sm">
            RVALibrary Deskbook
          </h1>
          <div>
        <p>
          The Deskbook is a full-stack application used by Richmond Public Library employees
          to catalog, share and collaborate on internal knowledge keeping. Accounts are divided
          into administrator and non-admin types. Administrators are able to add to the public
          knowledge repositories, build on existing repositories or edit and create
          entries inside repositories, simulating the idea of documents inside of folders.
          Folders can be infinitely nested. Users can also create private information repositories,
          only viewable and editable by them, and not searchable. Users also have the option to
          share these private repositories with other users. Regular users can only create
          private categories of their own and view others.
        </p>
        <p>
          In addition to knowledge keeping, the deskbook also tracks reference queries across
          individual libraries. When a branch library answers a reference question, users
          submit the reference form to catalog these statistics. And inside the reference
          search widget, users can run queries to gather and visualize importat statistics.
          Each user can also modify and delete their submitted reference questions.
        </p>
        <p>
          Another big proponent is the searchability of the Deskbook. Users can easily search
          and tag entries and repositories to easily locate and browse similar information
          types.
        </p>
        <p>
          This project is active and currently being migrated from EJS to Vue/Vuex.
        </p>
        <p>
          <a href="https://github.com/jonah-butler/deskbook">check it out</a>
        </p>
          </div>
          </div>
        </div>
      </div>
      <div class="row project">
        <div class="col-md-7 side-text-right">
          <div class="row dir-col">
          <h1 class="post-title text-underline text-sm">
            rvalibrary.org
          </h1>
          <div>
        <p>
          During my time as web developer for the City of Richmond's Richmond Public Library
          system, one of my main objectives was seeing to the development, maintenance and
          improvement of their site rvalibrary.org. This ongoing project consisted of
          redesigning many of most visited pages and moving the entire site design into
          a component based system that allowed for rapid and modular prototyping of new
          pages. This project is leveraged through the Wordpress CMS with a fully custom
          theme. It also relied heavily on Advanced Custom Fields and the Gravity Forms
          API.
        </p>
        <p>
          <a href="https://rvalibrary.org">check it out</a>
        </p>
          </div>
          </div>
        </div>
        <div class="col-md-5 dir-col md-margin-top dot-background-right">
          <div class="slider">
            <div class="slider-container">
              <div class="expand-icon-container"
              style="transform: scale(0); opacity: 0; display: none;">
                <svg class="expand-icon" width="40" height="40"
                viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_d)">
                <path d="M4.0659 11.0033C4.06768 11.5535 4.51849
                11.9981 5.0728 11.9963L14.1058 11.967C14.6601 11.9652
                15.108 11.5177 15.1062 10.9674C15.1045 10.4172 14.6536
                9.97258 14.0993 9.97438L6.07 10.0004L6.04414 2.02997C6.04235
                1.47972 5.59155 1.03512 5.03724 1.03691C4.48293 1.03871 4.03502
                1.48623 4.03681 2.03648L4.0659 11.0033ZM5.21845 9.43769L4.35758
                10.2978L5.78155 11.7022L6.64242 10.8421L5.21845 9.43769Z" fill="white">
                </path>
                </g>
                <g filter="url(#filter4_d)">
                <path d="M19.3091 2.00304C19.3108 1.45279 18.8628 1.00537
                18.3085 1.00369L9.27546 0.976336C8.72115 0.974657 8.27044
                1.41936 8.26878 1.96961C8.26711 2.51985 8.71512 2.96728 9.26943
                2.96895L17.2988 2.99327L17.2746 10.9637C17.273 11.514 17.721 11.9614
                18.2753 11.9631C18.8296 11.9648 19.2803 11.5201 19.282 10.9698L19.3091
                2.00304ZM18.7076 3.00803L19.013 2.70665L17.5979 1.29335L17.2924
                1.59474L18.7076 3.00803Z" fill="white">
                </path>
                </g>
                <defs>
                <filter id="filter3_d" x="0.0368042" y="1.03691" width="19.0694"
                height="18.9594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow">
                </feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                <filter id="filter4_d" x="4.26877" y="0.976331" width="19.0404"
                height="18.9868" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4">
                </feOffset>
                <feGaussianBlur stdDeviation="2">
                </feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                </defs>
                </svg>
              </div>
              <div class="picture-row">
                <div
                v-for="image in ProjectImages.rvalib"
                :key="image"
                class="carousel-img">
                <SliderImage
                v-on:loaded="test"
                :src="image"/>
                </div>
              </div>
              <div class="dot-container dot-container-top"></div>
            </div>
          </div>
          <div class="row">
            <span class="category-tag">
              php
            </span>
            <span class="category-tag">
              javascript
            </span>
            <span class="category-tag">
              wordpress
            </span>
            <span class="category-tag">
              acf
            </span>
            <span class="category-tag">
              gravity forms
            </span>
            <span class="category-tag">
              jquery
            </span>
          </div>
        </div>
      </div>
      <div class="row project">
        <div class="col-md-5 dir-col md-margin-top dot-background-left">
          <div class="slider">
            <div class="slider-container">
              <div class="expand-icon-container"
              style="transform: scale(0); opacity: 0; display: none;">
                <svg class="expand-icon" width="40" height="40"
                viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter3_d)">
                <path d="M4.0659 11.0033C4.06768 11.5535 4.51849
                11.9981 5.0728 11.9963L14.1058 11.967C14.6601 11.9652
                15.108 11.5177 15.1062 10.9674C15.1045 10.4172 14.6536
                9.97258 14.0993 9.97438L6.07 10.0004L6.04414 2.02997C6.04235
                1.47972 5.59155 1.03512 5.03724 1.03691C4.48293 1.03871 4.03502
                1.48623 4.03681 2.03648L4.0659 11.0033ZM5.21845 9.43769L4.35758
                10.2978L5.78155 11.7022L6.64242 10.8421L5.21845 9.43769Z" fill="white">
                </path>
                </g>
                <g filter="url(#filter4_d)">
                <path d="M19.3091 2.00304C19.3108 1.45279 18.8628 1.00537
                18.3085 1.00369L9.27546 0.976336C8.72115 0.974657 8.27044
                1.41936 8.26878 1.96961C8.26711 2.51985 8.71512 2.96728 9.26943
                2.96895L17.2988 2.99327L17.2746 10.9637C17.273 11.514 17.721 11.9614
                18.2753 11.9631C18.8296 11.9648 19.2803 11.5201 19.282 10.9698L19.3091
                2.00304ZM18.7076 3.00803L19.013 2.70665L17.5979 1.29335L17.2924
                1.59474L18.7076 3.00803Z" fill="white">
                </path>
                </g>
                <defs>
                <filter id="filter3_d" x="0.0368042" y="1.03691" width="19.0694"
                height="18.9594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow">
                </feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                <filter id="filter4_d" x="4.26877" y="0.976331" width="19.0404"
                height="18.9868" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix">
                </feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4">
                </feOffset>
                <feGaussianBlur stdDeviation="2">
                </feGaussianBlur>
                <feColorMatrix type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0">
                </feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix"
                result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic"
                in2="effect1_dropShadow" result="shape">
                </feBlend>
                </filter>
                </defs>
                </svg>
              </div>
              <div class="picture-row">
                <div
                v-for="image in ProjectImages.mg"
                :key="image"
                class="carousel-img">
                <SliderImage
                v-on:loaded="test"
                :src="image"/>
                </div>
              </div>
              <div class="dot-container dot-container-top"></div>
            </div>
          </div>
          <div class="row">
            <span class="category-tag">
              jamstack
            </span>
            <span class="category-tag">
              wordpress
            </span>
            <span class="category-tag">
              gravity forms
            </span>
            <span class="category-tag">
              javascript
            </span>
            <span class="category-tag">
              php
            </span>
          </div>
        </div>
        <div class="col-md-7 side-text-right">
          <div class="row dir-col">
          <h1 class="post-title text-underline text-sm">
            Master Gardener Help Desk
          </h1>
          <div>
        <p>
          The Master Gardener Help Desk is an active project with a partnership between
          Richmond Public Library and the Virginia Cooperative Extension. Residents of
          Virginia can submit questions to participating master gardeners. The gardeners
          receive an email when a new question is submitted, and the gardeners
          visit the custom built admin panel of our Wordpress CMS where they can
          manage and answer questions. Users are then automatically emailed when
          a new question is submitted and answers are then aggregated in a forum
          style answer page where users can browse, sort and search for related
          gardening information.
        </p>
        <p>
          <a href="https://rvalibrary.org/master-gardener">check it out</a>
        </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectImages from '@/project-images';
import sliderFactory from '@/assets/scripts/slider-factory';
import SliderImage from '@/components/SliderImage.vue';

export default {
  components: {
    SliderImage,
  },
  data() {
    return {
      sliderParams: {
        automate: {
          automation: false,
        },
        navDots: true,
        captions: false,
        arrows: false,
        expand: false,
      },
      ProjectImages,
      imagesLoaded: 0,
    };
  },
  mounted() {
  },
  methods: {
    test() {
      this.imagesLoaded += 1;
      if (this.imagesLoaded === 19) {
        this.setUpSliders();
      }
    },
    loadImage() {
      this.imagesLoaded += 1;
      if (this.imagesLoaded === 19) {
        // this.setUpSliders();
      }
    },
    setUpSliders() {
      const sliders = document.querySelectorAll('.slider');
      Array.from(sliders).forEach((slider) => {
        const slide = sliderFactory.sliderFactory(slider, this.sliderParams);
        slide.init();
      });
    },
  },
};
</script>

<style lang="css" scoped>
  .project{
    margin-top: 5.5rem;
  }

  .dot-background-left,
  .dot-background-right{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .dot-background-left::before{
    content: '';
    position: absolute;
    top: -70px;
    left: -100px;
    z-index: -1;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background: linear-gradient(90deg, #f4f5f7 8px, rgba(0, 0, 0, 0) 1%)
    95px 100px, linear-gradient(#f4f5f7 8px, #f36c94 1%), rgba(1,1,1,0.2);
    background-size: 10px 10px;
  }

    .dot-background-right::before{
    content: '';
    position: absolute;
    top: -70px;
    right: -100px;
    z-index: -1;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background: linear-gradient(90deg, #f4f5f7 8px, rgba(0, 0, 0, 0) 1%)
    95px 100px, linear-gradient(#f4f5f7 8px, #f36c94 1%), rgba(1,1,1,0.2);
    background-size: 10px 10px;
  }

  .side-text-right{
    padding-left: 1.5rem;
    padding-top: 1rem;
  }

  .side-text-right p{
    font-size: 15px;
  }
</style>
