<template>
  <div class="container-page py-8 space-y-4">
    <h2 class="text-xl font-semibold">I18n 示例</h2>
    <div>
      <p>{{ t('greeting', { name: 'SuiKit' }) }}</p>
      <p>{{ t('items', { count }) }}</p>
      <p>{{ t('date', { ts: Date.now() }) }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button class="btn" @click="count++">+</button>
      <span>{{ count }}</span>
      <button class="btn" @click="count = Math.max(0, count - 1)">-</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  const { t } = useI18n()
  const count = ref(1)
</script>
