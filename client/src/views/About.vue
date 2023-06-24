<template>
  <div class="container-full site-content">
    <UserCard :userObj="userObj" :localFilename="userObj.img" />
    <TechnologyBar technology="JS/ES6" percent="100" />
    <TechnologyBar technology="vue2" percent="100" />
    <TechnologyBar technology="vue3" percent="100" />
    <TechnologyBar technology="vuex" percent="100" />
    <TechnologyBar technology="typescript" percent="100" />
    <TechnologyBar technology="node" percent="90" />
    <TechnologyBar technology="mobile dev: ionic" percent="90" />
    <TechnologyBar technology="aws s3" percent="90" />
    <TechnologyBar technology="aws sns" percent="90" />
    <TechnologyBar technology="aws lambda" percent="90" />
    <TechnologyBar technology="aws ec2" percent="90" />
    <TechnologyBar technology="aws cloudwatch" percent="90" />
    <TechnologyBar technology="aws iam" percent="90" />
    <TechnologyBar technology="express" percent="90" />
    <TechnologyBar technology="mvc architecture" percent="90" />
    <TechnologyBar technology="rest design" percent="90" />
    <TechnologyBar technology="jest" percent="90" />
    <TechnologyBar technology="express" percent="90" />
    <TechnologyBar technology="socket io" percent="90" />
    <TechnologyBar technology="mongodb" percent="90" />
    <TechnologyBar technology="ui/ux" percent="80" />
    <TechnologyBar technology="adobe suite" percent="80" />
    <TechnologyBar technology="php" percent="70" />
    <TechnologyBar technology="mysql" percent="70" />
    <TechnologyBar technology="postgres" percent="70" />
    <TechnologyBar technology="docker" percent="65" />
    <TechnologyBar technology="data structures" percent="65" />
    <TechnologyBar technology="golang" percent="60" />
    <TechnologyBar technology="golang fiber" percent="60" />
    <TechnologyBar technology="golang gorm" percent="60" />
    <TechnologyBar technology="redis" percent="60" />
    <TechnologyBar technology="sqlite" percent="50" />
  </div>
</template>

<script>
import UserCard from "@/components/card/UserCard.vue";
import TechnologyBar from "@/components/TechnologyBar.vue";
import Me from "@/aboutMe";

export default {
  name: "About",
  data() {
    return {
      userObj: Me.jonah
    };
  },
  components: {
    UserCard,
    TechnologyBar
  }
};
</script>

<style lang="css" scoped></style>
