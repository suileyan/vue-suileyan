<template>
  <ErrorBoundary>
    <div class="container-page py-8 space-y-4">
      <h2 class="text-xl font-semibold">HTTP 示例</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="loadUsers">加载</button>
        <button class="btn" @click="cancel">取消</button>
        <button class="btn" @click="loadWithRetry">重试加载</button>
      </div>
      <div v-if="loading" class="text-sm">加载中...</div>
      <div v-else-if="error" class="text-error text-sm">错误：{{ error }}</div>
      <div v-else>
        <div v-if="list.length === 0" class="text-sm">空态：暂无数据</div>
        <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li v-for="item in list" :key="item.id" class="p-3 border rounded">
            <div class="font-medium">{{ item.name }}</div>
            <div class="text-xs text-slate-500">{{ item.email }}</div>
          </li>
        </ul>
      </div>
    </div>
  </ErrorBoundary>
</template>

<script setup lang="ts">
  import ErrorBoundary from '@/components/ErrorBoundary.vue'
  import { ref } from 'vue'
  import { get } from '@/services/alova'
  import { createRetryHandler } from '@/utils/errorHandler'

  const page = ref(1)
  const pageSize = ref(10)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const list = ref<Array<{ id: string; name: string; email: string }>>([])
  let currentMethod: any = null

  async function loadUsers() {
    loading.value = true
    error.value = null
    try {
      currentMethod = get('/users', { page: page.value, pageSize: pageSize.value })
      const data = await currentMethod.send()
      list.value = data.list ?? []
    } catch (e: any) {
      error.value = e?.message || '请求失败'
      list.value = []
    } finally {
      loading.value = false
    }
  }

  function cancel() {
    if (currentMethod?.abort) {
      currentMethod.abort('user cancel')
    }
  }

  async function loadWithRetry() {
    const runner = createRetryHandler(3, 200)
    await runner(async () => {
      currentMethod = get('/users', { page: page.value, pageSize: pageSize.value })
      const data = await currentMethod.send()
      list.value = data.list ?? []
      return true
    }, 'HTTP 示例')
  }
</script>
