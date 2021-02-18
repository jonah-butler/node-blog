<template>
  <transition name="fade">
    <div v-if="show" class="modal">
      <!-- <transition name="fade"> -->
      <div class="modal__backdrop" @click="toggle()"/>
      <!-- </transition> -->
      <!-- <transition name="slide-down"> -->
      <div class="modal__content">
        <div class="close-container">
          <div @click="toggle()" class="close">x</div>
        </div>
        <div class="modal__title">
          <slot name="header"/>
        </div>
        <div class="modal__body">
          <slot name="body"/>
        </div>
        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    <!-- </transition> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false,
    };
  },
  props: {},
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="css" scoped>
.modal{
  /* color: #292929; */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  /* bottom: 0; */
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0,0,0,0.5); */
  overflow: hidden;
  /* max-width: 300px; */
  /* background-color: #f1f1f1; */
  /* border-radius: 5px;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02),
          0 7px 5.4px rgba(0, 0, 0, 0.028),
          0 12.1px 10.1px rgba(0, 0, 0, 0.035),
          0 19.8px 18.1px rgba(0, 0, 0, 0.042),
          0 34.7px 33.8px rgba(0, 0, 0, 0.05),
          0 81px 81px rgba(0, 0, 0, 0.07) */
}

.modal__backdrop{
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.modal__content{
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 15px;
  margin: 40px;
  z-index: 10;
  position: relative;
  width: fit-content;
  height: fit-content;
}

.close-container{
  width: 100%;
  text-align: right;
}

.modal__content > .close-container > .close{
  float: right;
  transition: color .2s ease;
  font-size: 30px;
  font-weight: 500;
}

.close:before{

}

.modal__content > .close-container > .close:hover{
  color: rgba(0,0,0,0.3);
  cursor: pointer;
}

.modal__title{
  /* padding-top: 25px; */
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(20px); */
}

/* .slide-down-enter{
  opacity: 0;
  transform: translateY(20px);
}

.slide-down-enter-to{
  transform: translateY(0px);
  opacity: 1;
}

.slide-down-leave{
  opacity: 1;
  transform: translateY(0px);
}

.slide-down-leave-to{
  opacity: 0;
  transform: translateY(20px);
}

.slide-down-enter-active, .slide-down-leave-active{
  transition: all .5s ease;
} */
/*
.slide-down-enter, .slide-down-leave-to{
  transform: translateY(-20px);
}  */
</style>
