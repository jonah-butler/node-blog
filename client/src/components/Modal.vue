<template>
  <transition name="fade">
    <div v-if="show" class="modal">
      <div class="modal__backdrop" @click="toggle()"/>
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
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

.modal__content > .close-container > .close:hover{
  color: rgba(0,0,0,0.3);
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
