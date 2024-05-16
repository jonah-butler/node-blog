<script setup lang="ts">
import LatestContentCard from "../components/card/latest-content.vue";
import SecondarContentCard from "../components/card/secondary-content.vue";
import MainLink from "../components/links/main-link.vue";
import SecondaryLink from "../components/links/secondary-link.vue";

const generateRandomNumber = (floor: number, ceiling: number): number => {
  if(floor >= ceiling) return 0;
  return Math.floor(Math.random() * ceiling) + floor;
};
</script>

<template>
  <section class="p-4 w-full flex flex-wrap justify-center">
    <div class="w-full flex flex-wrap justify-center">
      <LatestContentCard></LatestContentCard>
    </div>
    <div class="w-full flex flex-wrap justify-center">
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
      <SecondarContentCard :index="generateRandomNumber(0, 4)"></SecondarContentCard>
    </div>
    <div class="flex flex-wrap w-full mx-20 flex-col">
      <MainLink></MainLink>
      <MainLink></MainLink>
      <MainLink></MainLink>
      <MainLink></MainLink>
      <MainLink></MainLink>
      <MainLink></MainLink>
      <SecondaryLink title="Load More"/>
    </div>
  </section>
</template>

<style scoped>

</style>