<script setup lang="ts">
import { defineExpose } from 'vue';
import { type ConfirmationModalProps } from './props';
import { type ConfirmationModalEmits } from './emits';

const props = defineProps<ConfirmationModalProps>();
const emits = defineEmits<ConfirmationModalEmits>();

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

const emitCancel = (): void => {
  emits('cancel');
};

const emitConfirm = (): void => {
  emits('confirm');
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <div>
        <slot></slot>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button @click="emitCancel" class="btn btn-error mr-2">
            {{ cancelButtonText }}
          </button>
          <button @click="emitConfirm" class="btn btn-primary">
            {{ confirmButtonText }}
          </button>
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
