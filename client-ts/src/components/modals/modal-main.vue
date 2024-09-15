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

const closeModal = (): void => {
  const modal = document.querySelector(`#${props.id}`) as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <dialog :id="id" class="modal" v-if="!useClose">
    <div class="modal-box">
      <div v-if="useVHTML" v-html="contents"></div>
      <div v-else>
        <slot></slot>
      </div>
    </div>
    <form v-if="!useClose" method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <dialog :id="id" class="modal" v-else>
    <div class="modal-box">
      <div v-if="useVHTML" v-html="contents"></div>
      <div v-else>
        <slot></slot>
      </div>
      <div class="modal-action">
        <form v-if="useClose" method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-box {
  max-width: 50%;
}
</style>
