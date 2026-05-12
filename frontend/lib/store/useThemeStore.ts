// ============================================
// Zustand Theme Store
// Handles dark/light mode with system preference
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, ThemeState } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;

        // Remove previous class
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          root.classList.add(systemTheme);
          set({ theme, resolvedTheme: systemTheme });
        } else {
          root.classList.add(theme);
          set({ theme, resolvedTheme: theme });
        }
      },
    }),
    {
      name: 'portfolio-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme on page load
        if (state) {
          setTimeout(() => {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');

            if (state.theme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
              root.classList.add(systemTheme);
              state.resolvedTheme = systemTheme;
            } else {
              root.classList.add(state.theme);
            }
          }, 0);
        }
      },
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const theme = useThemeStore.getState().theme;
  const root = window.document.documentElement;

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}