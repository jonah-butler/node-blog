<template>
  <div class="container-full site-content">
    <UserCard :userObj="userObj" :localFilename="userObj.img"/>
  </div>
</template>

<script>
import UserCard from '@/components/card/UserCard.vue';
import Me from '@/aboutMe';

export default {
  name: 'About',
  data() {
    return {
      userObj: Me.jonah,
    };
  },
  components: {
    UserCard,
  },
};
</script>

<style lang="css" scoped>

</style>
