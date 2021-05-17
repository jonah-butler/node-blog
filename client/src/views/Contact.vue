<template>
  <div class="container-full site-content">
    <div class="upload-form">
      <form
      @submit.prevent="sendEmail"
      enctype="multipart/form-data">
        <h1>Email Me</h1>
          <TextField
          v-model="email.name"
          label="Full Name"
          placeholder="name"
          color="#22a3d7"
          />
          <TextField
          v-model="email.email"
          label="Email"
          placeholder="email"
          color="#22a3d7"
          />
        <div class="label-upload-container">
          <TextArea
          v-model="email.message"
          label="message"
          placeholder="message"
          color="#22a3d7"/>
          <section
          class="notification">
        </section>
        </div>
        <div class="">
          <button
          v-if="!states.sending"
          class="primary-btn-link"
          type="submit"
          name="button">
          Send
          </button>
          <TheLoader
          v-if="states.sending"/>
        </div>
        <div>
          {{ response }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/inputs/TextInput.vue';
import TextArea from '@/components/inputs/TextArea.vue';
import TheLoader from '@/components/TheLoader.vue';
import ContactServices from '@/services/ContactServices';

export default {
  data() {
    return {
      email: {
        name: '',
        email: '',
        message: '',
      },
      states: {
        sending: false,
      },
      response: '',
    };
  },
  components: {
    TextField,
    TextArea,
    TheLoader,
  },
  methods: {
    async sendEmail() {
      try {
        if (this.email.name.length && this.email.email.length && this.email.message.length) {
          const response = (await ContactServices.send(this.email)).data;
          if (response.status === 200) {
            this.response = 'email sent';
          } else {
            this.response = response.status;
          }
        }
      } catch (error) {
        this.response = error;
      }
    },
  },
};
</script>

<style>

</style>
