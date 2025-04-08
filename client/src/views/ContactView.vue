<script setup lang="ts">
import { type EmailBody } from '@/types/services';
import { computed, ref, type Ref } from 'vue';
import BasicAlert from '../components/alerts/basic-alert.vue';
import ButtonMain from '../components/buttons/button-main.vue';
import {
  ContactService,
  ContactServiceError,
} from '../services/api/contact.service';

const from = ref('');
const to = ref('jonahbutler6@gmail.com');
const subject = ref('New Contact Email');
const message = ref('');

const sending = ref(false);

const successMessage = ref('');
const error = ref('');

const canSendEmail = computed((): boolean => {
  return from.value !== '' && message.value !== '';
});

const sendEmail = async (): Promise<void> => {
  sending.value = true;

  if (error.value) {
    error.value = '';
  }

  const payload: EmailBody = {
    from: from.value,
    to: to.value,
    subject: subject.value,
    message: message.value,
  };

  try {
    const didSend = await ContactService.sendEmail(payload);
    if (didSend) {
      from.value = '';
      message.value = '';

      successMessage.value = 'Email sent successfully';

      autoDismissAlert(4, successMessage);
    }
  } catch (err) {
    if (err instanceof ContactServiceError) {
      error.value = err.message;
      autoDismissAlert(4, error);
    }
  } finally {
    sending.value = false;
  }
};

const autoDismissAlert = (timeout: number, reference: Ref<string>): void => {
  setTimeout((): void => {
    reference.value = '';
  }, timeout * 1000);
};
</script>

<template>
  <div class="container">
    <h2 class="pl-2">Email Me</h2>
    <div class="card w-full shrink-0 bg-base-100 p-6 shadow-2xl">
      <div class="form-control">
        <label class="label">
          <span class="label-text">From Address</span>
        </label>
        <input
          v-model="from"
          placeholder="from email"
          class="input input-bordered input-secondary"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Message</span>
        </label>
        <textarea
          v-model="message"
          placeholder="message"
          class="textarea textarea-bordered textarea-secondary textarea-lg w-full"
        ></textarea>
      </div>
      <div>
        <div>
          <BasicAlert
            v-if="successMessage"
            :message="successMessage"
            type="alert-success"
          />
          <BasicAlert v-if="error" :message="error" type="alert-error" />
        </div>
        <ButtonMain
          text="Send"
          :disabled="!canSendEmail"
          :loading="sending"
          @click="sendEmail"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
