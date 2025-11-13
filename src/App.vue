<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useAppStore } from './stores/app';

  const app = useAppStore();
  onMounted(() => {
    app.setTheme(app.theme);
    app.applyThemeTransitionVars();
  });
</script>

<template>
  <RouterView :key="app.langVersion" />

  <!-- 主题切换悬浮按钮 -->
  <button
    class="fixed bottom-6 right-6 rounded-full h-12 w-12 flex items-center justify-center shadow-lg bg-white/80 dark:bg-slate-800/80 border border-white/30 backdrop-blur hover:scale-105 transition"
    aria-label="toggle theme"
    @click="app.toggleThemeWithTransition($event)"
  >
    <span v-if="app.theme === 'light'">🌞</span>
    <span v-else>🌜</span>
  </button>
</template>
