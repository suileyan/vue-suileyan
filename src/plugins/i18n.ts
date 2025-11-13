import { createI18n } from 'vue-i18n';
import zhCN from '@/locales/zh-CN.json';
import en from '@/locales/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: (localStorage.getItem('i18n-locale') as 'zh-CN' | 'en') || 'zh-CN',
  fallbackLocale: 'en',
  messages: { 'zh-CN': zhCN, en },
});

export function setI18nLocale(locale: 'zh-CN' | 'en') {
  i18n.global.locale.value = locale;
  localStorage.setItem('i18n-locale', locale);
}
