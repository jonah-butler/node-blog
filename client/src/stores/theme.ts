import { type ThemeStore } from '@/types/theme';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<ThemeStore>({
      theme: 'light',
    });

    const getTheme = (): 'light' | 'black' => {
      return theme.value.theme;
    };

    const toggleTheme = (): void => {
      const newTheme = theme.value.theme === 'light' ? 'black' : 'light';
      theme.value.theme = newTheme;
      setTheme(newTheme);
    };

    const setTheme = (newTheme: 'light' | 'black'): void => {
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    return {
      theme,
      getTheme,
      setTheme,
      toggleTheme,
    };
  },
  {
    persist: true,
  },
);
