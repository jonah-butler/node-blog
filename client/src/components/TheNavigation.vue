<template>
  <div id="nav-container">
    <div class="nav">
      <section class="header">
        <router-link to="/">
          <img class="navImg" src="@/assets/code-nav.svg" alt="">
        </router-link>
        <div class="hamburger-box">
        <img
        class="hamburger"
        src="@/components/svgs/icons8-hamburger-96.png"
        alt=""
        ref="hamburger"
        @click="expandNav"
        >
        </div>
      </section>
      <ul ref="nav" class="nav-links">
        <li class="links">
          <router-link to="/">Blog</router-link>
        </li>
        <li class="links">
          <router-link to="/about">About</router-link>
        </li>
        <li class="links">
          <a @click="expandSearch">Search</a>
        </li>
        <li class="links">
          <router-link to="/projects">Projects</router-link>
        </li>
        <li class="links">
          <router-link to="/random">Random</router-link>
        </li>
        <li
        class="links"
        v-if="this.$store.state.isUserLoggedIn"
        @click="logout"
        >
        Logout
        </li>
        <li
        class="links"
        v-if="!this.$store.state.isUserLoggedIn"
        >
          <router-link to="/register">
          Register
          </router-link>
        </li>
        <li
        class="links"
        v-if="!this.$store.state.isUserLoggedIn"
        >
          <router-link to="/login">
          Login
          </router-link>
        </li>
        <li
        class="links"
        >
          <router-link to="/contact">
          Contact
          </router-link>
        </li>
      </ul>
        <div class="user-initial"
        v-if="this.$store.state.isUserLoggedIn && this.$store.state.user.profileImageLocation"
        :style="{backgroundImage: `url(${getUserProfileImage()})`}"
        >
          <!-- <router-link to="/user">{{ printUser() }}</router-link> -->
          <router-link to="/user">
            <!-- <img class="user-image" :src="getUserProfileImage()"> -->
          </router-link>
        </div>
        <div
        class="user-initial"
        v-else-if="this.$store.state.isUserLoggedIn &&
        !this.$store.state.user.profileImageLocation">
          <router-link to="/user">{{ printUser() }}</router-link>
        </div>
    </div>
    <div
    class="search-container"
    ref="searchContainer">
      <div class="container-full">
        <div class="row dir-row no-wrap">
            <i class="fas fa-search"></i>
            <input
            @input="testSearch"
            placeholder="search posts"
            class="search"
            type="text"
            name=""
            ref="searchBar"
            value="">
        </div>
      </div>
      <transition name="fade">
      <div
      v-if="searching"
      class="search-results">
      <Loader />
      </div>
      <div
      v-else-if="searchResults !== null && searchResults !== undefined"
      class="search-results">
      <div class="row old-entries dir-col">
        <router-link
        v-for="post in searchResults"
        :key="post._id"
        :to="{
          name: 'BlogShow',
          params: {
            id: post._id,
            slug: post.slug
            }
          }">
          <div class="detail-container">
            <p class="old-blog-date">{{  dateFormat(post.createdAt) }}</p>
            <h3 class="old-blog-title primary-btn-link">
              {{ post.title }}
            </h3>
          </div>
        </router-link>
      </div>
      </div>
      <div
      v-else-if="searchResults === undefined"
      class="search-results">
      <p>Wow, Much Empty</p>
      <img
      class="no-results-img"
      src="../../public/assets/imgs/doge-pixel.png"
      alt="pixel doge image">
      </div>
      <div
      v-else
      class="search-results">
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import navigation from '@/nav';
import Loader from '@/components/TheLoader.vue';
import BlogServices from '@/services/BlogServices';

export default {
  name: 'TheNavigation',
  components: {
    Loader,
  },
  data() {
    return {
      navLinks: navigation.mainNavigation,
      searching: false,
      searchResults: null,
      // loadingResults: false,
    };
  },
  methods: {
    expandSearch() {
      this.$refs.searchContainer.classList.toggle('expand');
      this.$refs.searchBar.value = '';
      if (this.searchResults !== '') {
        this.searchResults = '';
      }
    },
    getUserProfileImage() {
      return this.$store.state.user.profileImageLocation;
    },
    printUser() {
      return this.$store.state.user.username.toUpperCase().slice(0, 1);
    },
    expandNav() {
      this.$refs.nav.classList.toggle('expand');
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ path: '/logout' });
    },
    dateFormat(isoDate) {
      const date = new Date(isoDate);
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    },
    async testSearch(event) {
      if (event.target.value) {
        this.searching = true;
        const blogs = (await BlogServices.search({ query: event.target.value })).data;
        if (blogs.length) {
          this.searchResults = blogs;
        } else {
          this.searchResults = undefined;
        }
        this.searching = false;
      }
    },
  },
};
</script>

<style scoped>
#nav-container{
  width: 100%;
  background-color: #f4f5f7;
  border-radius: 5px 5px 0px 0px;
  position: relative;
  z-index: 1;
}

/* #nav-container:before{
  content: '';
  position: absolute;
  top: -35px;
  left: 35px;
  width: 295px;
  height: 295px;
  background-image: url('./svgs/hamburger-blob.svg');
  transform: rotate(125deg);
  z-index: -1;
} */

.nav{
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}

#nav-container > .nav > ul > li{
  padding: 10px 0px 3px 0px;
  transition: all .2s ease;
  position: relative;
  z-index: 1;
  border-radius: 3px;
}

@media (max-width: 600px){
  .nav-links{
    /* display: none !important; */
    overflow: hidden;
    max-height: 0px;
    margin: 0px;
  }
}

.nav-links{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  transition: all .3s ease;
  padding: 0px;
}

.nav-links.expand{
  display: flex !important;
  max-height: 60px;
}

.navImg{
  max-width: 50px;
}

.links:hover:before{
  width: 100%;
  /* height: 100%; */
}

.links:hover{
  cursor: pointer;
}

.links:before{
  content: '';
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 0%;
  height: 2px;
  background: linear-gradient(to bottom, #fea075, #FA709A );
  /* width: 100%;
  height: 100%; */
  transition: all .2s ease;
  z-index: -1;
}

.links > a{
  color: #4b3742;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color .3s ease;
}

.links:hover a {
  color: #FA709A;
}

.user-initial{
  padding: 20px !important;
  border-radius: 50% !important;
  width: 20px;
  height: 20px;
  background-color: white;
  position:absolute !important;
  right: 5px;
  top: 5px;
  box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02),
              0 7px 5.4px rgba(0, 0, 0, 0.028),
              0 12.1px 10.1px rgba(0, 0, 0, 0.035),
              0 19.8px 18.1px rgba(0, 0, 0, 0.042),
              0 34.7px 33.8px rgba(0, 0, 0, 0.05),
              0 81px 81px rgba(0, 0, 0, 0.07)
}

.user-initial > a{
  font-size: 35px;
  text-decoration: none;
  position: relative;
  bottom: 12px;
  left: -2px;
  color: black;
}

@media (min-width: 600px) {
  .header{
    float: left;
    width: fit-content !important;
  }
  .hamburger{
    display: none;
  }
}

.header{
  width: 100%;
}

.hamburger-box{
  display: inline;
  position: relative;
}

.hamburger{
  width: 40px;
  height: 40px;
  position: relative;
  margin-left: 20px;
  top: -5px;
}

.hamburger:hover{
  cursor: pointer;
}

.search-container{
  width: 100%;
  height: 0px;
  overflow: hidden;
  background-color: #e0e0e0;
  transition: height .1s ease;
}

.search-container.expand{
  height: fit-content;
}

.search-container.results{
  height: 100%;
}

.search-container .fa-search{
  font-size: 38px;
}

.search{
  border: none;
  background: transparent;
  border-bottom: 1px solid #2c3e50;
  width: 100%;
  margin-left: 10px;
}

.search-results{
  width: 100%;
  height: fit-content;
  text-align: center;
  /* overflow: scroll; */
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(20px); */
}

</style>
