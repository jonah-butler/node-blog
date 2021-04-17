<template>
  <div class="site-content">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Home.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

<style>
.site-content{
    /* padding: 3rem 8rem; */
    min-height: 84vh;
    overflow: hidden;
    background-color: #f4f5f7;
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02),
            0 7px 5.4px rgba(0, 0, 0, 0.028),
            0 12.1px 10.1px rgba(0, 0, 0, 0.035),
            0 19.8px 18.1px rgba(0, 0, 0, 0.042),
            0 34.7px 33.8px rgba(0, 0, 0, 0.05),
            0 81px 81px rgba(0, 0, 0, 0.07)
}

</style>
