<template>
<div class="container">
  <div class="loader">
    <div class="loader-inner">
      <div></div><div></div><div></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Loader',
  components: {},
};
</script>

<style lang="css" scoped>

.loader{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* background-color: #1d1e22; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-inner{
  width: 30px;
  height: 30px;
  border-radius: 50%;
/*   border: 5px solid transparent;
  border-top: 3px solid #659ba0; */
  position: relative;
}

.loader-inner div{
  box-sizing: border-box;
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid transparent;
  border-top: 2px solid #d46083;
  border-radius: 50%;
  animation: spin 5s infinite;
}

.loader-inner div:nth-child(1){
  animation-delay: -0.25s;
}

.loader-inner div:nth-child(2){
  animation-delay: -0.40s;
}

.loader-inner div:nth-child(3){
  animation-delay: -0.60s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
/*   10%{
    transform: rotate(100deg);
  }
  20%{
    transform: rotate(200deg);
  }
   35%{
    transform: rotate(300deg);
  }
  45% {
    transform: rotate(400deg);
  }
  55% {
    transform: rotate(500deg);
  }
 65% {
    transform: rotate(1100deg);
 }
  84% {
    transform: rotate(1300deg);
 } */
  100%{
    transform: rotate(1440deg);
  }
}

</style>
