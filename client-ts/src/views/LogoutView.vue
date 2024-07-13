<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const { logoutUser } = userStore;

const handleLogoutAndRedirect = (): void => {
  const isLoggedOut = logoutUser();
  if (isLoggedOut) {
    router.push('/blog');
  }
};

handleLogoutAndRedirect();
</script>

<style scoped></style>
