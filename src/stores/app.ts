import { defineStore } from 'pinia';
import {
  type ThemeType,
  DEFAULT_THEME_TRANSITION,
  getStoredTheme,
  saveTheme,
  applyThemeToDOM,
  applyThemeTransitionVars,
  toggleThemeWithTransition,
  toggleThemeSimple,
} from '@/utils/themeUtils';

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: getStoredTheme(),
    user: null as null | { name: string },
    lang: (localStorage.getItem('lang') as string) || 'zhcn',
    langVersion: 0,
    // 主题切换的视图过渡选项（进入/退出参数可分别配置）
    themeTransition: { ...DEFAULT_THEME_TRANSITION } as typeof DEFAULT_THEME_TRANSITION,
  }),
  actions: {
    applyThemeTransitionVars() {
      applyThemeTransitionVars(this.themeTransition);
    },

    toggleTheme() {
      this.theme = toggleThemeSimple(this.theme);
    },

    toggleThemeWithTransition(e?: MouseEvent) {
      this.theme = toggleThemeWithTransition(this.theme, this.themeTransition, e);
    },

    setThemeTransition(
      opts: Partial<{
        enabled: boolean;
        in: Partial<{ durationMs: number; easing: string; radiusScale: number }>;
        out: Partial<{ durationMs: number; easing: string; radiusScale: number }>;
      }>,
    ) {
      this.themeTransition = {
        ...this.themeTransition,
        ...opts,
        in: { ...this.themeTransition.in, ...opts.in },
        out: { ...this.themeTransition.out, ...opts.out },
      } as typeof DEFAULT_THEME_TRANSITION;
      this.applyThemeTransitionVars();
    },

    setTheme(theme: ThemeType) {
      this.theme = theme;
      applyThemeToDOM(theme);
      saveTheme(theme);
    },

    setLang(lang: string) {
      this.lang = lang;
      window.localStorage.setItem('lang', lang);
      window.location.reload();
      this.langVersion++;
    },
  },
});
