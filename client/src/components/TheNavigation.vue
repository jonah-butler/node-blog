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
        <li class="links" v-for="navLink in navLinks"
        :key="navLink.name">
          <router-link :to="navLink.slug">{{navLink.name}}</router-link>
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
      </ul>
        <div class="user-initial"
        v-if="this.$store.state.isUserLoggedIn"
        >
          <router-link to="/user">{{ printUser() }}</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/nav';

export default {
  name: 'TheNavigation',
  components: {

  },
  data() {
    return {
      navLinks: navigation.mainNavigation,
    };
  },
  methods: {
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
  padding: 10px 10px 3px 10px;
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
  right: 25px;
  top: 25px;
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

</style>
