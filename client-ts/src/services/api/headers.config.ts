import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const getBearerTokenHeader = () => {
  const userStore = useUserStore();
  const { getUserToken } = storeToRefs(userStore);
  return {
    headers: {
      Authorization: `Bearer ${getUserToken.value}`,
    },
  };
};

// for backwards compatability for older endpoints - remove eventually
const getTokenHeader = () => {
  const userStore = useUserStore();
  const { getUserToken } = storeToRefs(userStore);
  return {
    headers: {
      token: getUserToken.value,
    },
  };
};

export { getBearerTokenHeader, getTokenHeader };
