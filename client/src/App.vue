<template>
  <div id="app">
    <TheNavigation />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style>
.body-content{
  max-width: 700px;
  border-radius: 10px;
  background-color: #eee;
}

router-link{
  text-decoration: none !important;
}

li > .active-nav {
  color: #FA709A !important;
}

a{
  text-decoration: none;
}

.fr-view{
  min-height: 160px !important;
}
</style>
