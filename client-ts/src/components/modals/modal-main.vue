<script setup lang="ts">
import { defineExpose } from 'vue';
import { type ModalProps } from './props';

const props = defineProps<ModalProps>();

const openModal = (): void => {
  const modal = document.querySelector(`#${props.id}`) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <div v-if="useVHTML" v-html="contents"></div>
      <div v-else>
        <slot></slot>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-box {
  max-width: 50%;
  /* max-height: 80vh; */
  /* overflow-y: scroll; */
}
</style>
