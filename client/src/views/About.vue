<template>
  <div class="container-full site-content">
    <UserCard :userObj="userObj" :localFilename="userObj.img"/>
    <TechnologyBar technology="html" percent="100"/>
    <TechnologyBar technology="css" percent="100"/>
    <TechnologyBar technology="JS/ES6" percent="100"/>
    <TechnologyBar technology="vue" percent="90"/>
    <TechnologyBar technology="node" percent="90"/>
    <TechnologyBar technology="express" percent="90"/>
    <TechnologyBar technology="mvc architecture" percent="90"/>
    <TechnologyBar technology="rest design" percent="90"/>
    <TechnologyBar technology="express" percent="90"/>
    <TechnologyBar technology="mongodb" percent="80"/>
    <TechnologyBar technology="ui/ux" percent="80"/>
    <TechnologyBar technology="adobe suite" percent="80"/>
    <TechnologyBar technology="ejs" percent="80"/>
    <TechnologyBar technology="jquery" percent="80"/>
    <TechnologyBar technology="aws" percent="70"/>
    <TechnologyBar technology="php" percent="70"/>
    <TechnologyBar technology="vuex" percent="65"/>
    <TechnologyBar technology="data structures" percent="65"/>
    <TechnologyBar technology="passport" percent="60"/>
    <TechnologyBar technology="sqlite" percent="50"/>
    <TechnologyBar technology="babel" percent="40"/>
    <TechnologyBar technology="jest" percent="40"/>
  </div>
</template>

<script>
import UserCard from '@/components/card/UserCard.vue';
import TechnologyBar from '@/components/TechnologyBar.vue';
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
    TechnologyBar,
  },
};
</script>

<style lang="css" scoped>

</style>
