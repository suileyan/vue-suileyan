<template>
  <div>
    <slot v-if="!err" />
    <div v-else class="p-4 border border-error bg-error/10 rounded">
      <p class="text-error text-sm">发生错误</p>
      <button class="btn btn-sm mt-2" @click="reset">重试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onErrorCaptured } from 'vue'
  import { handleError } from '@/utils/errorHandler'
  import NProgress from 'nprogress'
  const err = ref<unknown | null>(null)
  onErrorCaptured((e) => {
    err.value = e
    NProgress.done()
    handleError(e, 'ErrorBoundary')
    return false
  })
  function reset() {
    err.value = null
  }
</script>
