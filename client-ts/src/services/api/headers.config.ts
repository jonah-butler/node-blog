import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { getUserToken } = storeToRefs(userStore); // this will come from pinia store eventually

const HEADERS = {
  headers: {
    Authorization: `Bearer ${getUserToken.value}`,
  },
};

// for backwards compatability for older endpoints - remove eventually
const TOKEN_HEADER = {
  headers: {
    token: getUserToken.value,
  },
}

export { HEADERS, TOKEN_HEADER };
