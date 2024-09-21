<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { type LoginPayload } from '../types/services';
import ButtonMain from '../components/buttons/button-main.vue';
import QuoteMarquee from '@/components/layout/quote-marquee.vue';
import {
  AuthServiceError,
  AuthService,
} from '@/services/api/authentication.service';
import BasicAlert from '@/components/alerts/basic-alert.vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const { setUser } = userStore;

const login = reactive<LoginPayload>({
  username: '',
  password: '',
});

const fieldsAreEmpty = computed((): boolean => {
  return login.password == '' || login.username == '';
});

const loading = ref(false);
const error = ref('');

const attemptLogin = async (): Promise<void> => {
  loading.value = true;
  try {
    const user = await AuthService.login(login);
    setUser(user);
    router.push('/blog');
  } catch (err) {
    if (err instanceof AuthServiceError) {
      error.value = err.message;
      autoDismissAlert(4);
    }
  } finally {
    loading.value = false;
  }
};

const autoDismissAlert = (timeout: number): void => {
  setTimeout((): void => {
    error.value = '';
  }, timeout * 1000);
};
</script>

<template>
  <div class="align-center container flex p-0">
    <div class="row align-center w-full px-6">
      <div class="col-small-6 w-1/2">
        <div class="w-full p-12 text-left">
          <h1 class="text-5xl font-bold">Login</h1>
          <QuoteMarquee />
        </div>
      </div>

      <div class="col-small-6">
        <div class="card w-full shrink-0 bg-base-100 p-6 shadow-2xl">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              v-model="login.username"
              autocomplete="new-password"
              placeholder="username"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="login.password"
              autocomplete="new-password"
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
            <label class="label">
              <a href="#" class="link-hover link label-text-alt"
                >Forgot password?</a
              >
            </label>
            <BasicAlert
              v-if="error"
              :message="error"
              :useDismiss="false"
              type="alert-error"
            />
          </div>
          <ButtonMain
            @click="attemptLogin"
            :disabled="fieldsAreEmpty"
            :loading="loading"
            text="Login"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
