<template>
  <div id="nav-container">
    <div class="nav">
      <section>
        <router-link to="/">
          <img class="navImg" src="@/assets/code-nav.svg" alt="">
        </router-link>
      </section>
      <ul class="nav-links">
        <li class="links">
          <router-link to="/">Blog</router-link>
        </li>
        <li class="links" v-for="navLink in navLinks"
        :key="navLink.name">
          <router-link :to="navLink.slug">{{navLink.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navigation from '@/nav';

export default {
  name: 'TheNavigation',
  data() {
    return {
      navLinks: navigation.mainNavigation,
    };
  },
};
</script>

<style scoped>
#nav-container{
  width: 100%;
  background-color: #f4f5f7;
  border-radius: 5px 5px 0px 0px;
}

.nav{
  display: flex;
  margin-left: 20px;
}

#nav-container > .nav > ul > li{
  padding: 10px 10px 3px 10px;
  transition: all .2s ease;
  position: relative;
  z-index: 1;
  border-radius: 3px;
}

.nav-links{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
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
}
</style>
