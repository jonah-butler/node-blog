import { type User, type UserStore } from '@/types/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserStore>({
      token: '',
      user: {
        email: '',
        profileImageLocation: '',
        username: '',
        _id: '',
      },
    });

    const setUser = (newUser: UserStore): void => {
      user.value = newUser;
    };

    const setEmptyUser = (): void => {
      user.value = {} as UserStore;
    };

    const logoutUser = (): boolean => {
      setEmptyUser();
      return Object.keys(user.value).length == 0;
    };

    const getUserName = computed((): string => {
      return user.value.user.username ?? '';
    });

    const getUserProfileImage = computed((): string => {
      return user.value.user?.profileImageLocation ?? '';
    });

    const getUserId = computed((): string => {
      return user.value.user._id ?? '';
    });

    const getUserToken = computed((): string => {
      return user.value.token ?? '';
    });

    const isAuthenticated = computed((): boolean => {
      if (!user.value.user || !user.value.token) return false;

      return user.value.user._id !== '' && user.value.token !== '';
    });

    const getUser = computed((): User => {
      return user.value.user;
    });

    return {
      user,
      setUser,
      getUserName,
      logoutUser,
      isAuthenticated,
      getUserId,
      getUserProfileImage,
      getUserToken,
      getUser,
    };
  },
  {
    persist: true,
  },
);
