<template>
  <div class="min-h-screen flex flex-col">
    <header class="container-page py-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img
          src="/favicon.svg"
          alt="Logo"
          class="rounded-lg shadow object-cover object-center"
          style="width: 104px; height: 50px"
        />
      </div>
      <div class="flex items-center gap-5 text-sm">
        <nav class="hidden md:flex items-center gap-5">
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/">
            首页
          </RouterLink>
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/charts">
            图表
          </RouterLink>
          <RouterLink
            class="hover:text-primary-600"
            active-class="text-primary-600"
            to="/animations"
          >
            动画
          </RouterLink>
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/forms">
            表单
          </RouterLink>
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/ui">
            组件
          </RouterLink>
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/table">
            表格
          </RouterLink>
          <RouterLink class="hover:text-primary-600" active-class="text-primary-600" to="/about">
            关于
          </RouterLink>
        </nav>
        <select
          class="rounded border border-base-300 bg-base-100 text-base-content px-2 py-1 focus:outline-none focus:border-primary hover:bg-base-200"
          @change="onLangChange($event)"
        >
          <option value="zhcn" :selected="app.lang === 'zhcn'">{{ raw('中文') }}</option>
          <option value="en" :selected="app.lang === 'en'">{{ raw('English') }}</option>
          <option value="ko" :selected="app.lang === 'ko'">{{ raw('한국어') }}</option>
          <option value="ja" :selected="app.lang === 'ja'">{{ raw('日本語') }}</option>
        </select>
        <select
          class="rounded border border-base-300 bg-base-100 text-base-content px-2 py-1 focus:outline-none focus:border-primary hover:bg-base-200"
          @change="onI18nLocaleChange($event)"
        >
          <option value="zh-CN">Vue I18n: 中文</option>
          <option value="en">Vue I18n: English</option>
        </select>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="container-page py-8 text-xs text-slate-500">
      <p>© {{ year }} SuiKit. Crafted with Vue 3 + Vite + Tailwind.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app';
  import { raw } from '@/utils/noTrans';
  import { setI18nLocale } from '@/plugins/i18n';
  const year = new Date().getFullYear();
  const app = useAppStore();

  function onLangChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value as string;
    app.setLang(value);
  }

  function onI18nLocaleChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value as 'zh-CN' | 'en';
    setI18nLocale(value);
  }
</script>
