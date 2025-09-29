<template>
  <section class="container-page py-12 max-w-2xl">
    <h2 class="text-3xl font-bold">表单示例</h2>
    <p class="mt-2 text-base-content/60">原生 + Tailwind 简易校验</p>

    <form class="mt-6 space-y-4" @submit.prevent="submit">
      <div>
        <label class="text-sm text-base-content/60">用户名</label>
        <input
          v-model.trim="model.name"
          class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
          placeholder="请输入"
        />
        <p v-if="errors.name" class="mt-1 text-xs text-error">
          {{ errors.name }}
        </p>
      </div>
      <div>
        <label class="text-sm text-base-content/60">邮箱</label>
        <input
          v-model.trim="model.email"
          class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
          placeholder="you@example.com"
        />
        <p v-if="errors.email" class="mt-1 text-xs text-error">
          {{ errors.email }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-5 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/90">
          提交
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-lg border border-base-300 text-base-content hover:bg-base-200"
          @click="reset"
        >
          重置
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { get } from '@/services/alova'

  const model = reactive({ name: '', email: '' })
  const errors = reactive<{ name?: string; email?: string }>({})

  function validate() {
    errors.name = model.name ? '' : '请输入用户名'
    errors.email = /.+@.+/.test(model.email) ? '' : '邮箱格式不正确'
    return !errors.name && !errors.email
  }

  async function submit() {
    if (!validate()) return
    // 请求示例：真实项目中替换为你的接口
    try {
      await get('/demo').send()
      alert('提交成功(演示)')
    } catch (err) {
      alert('提交失败(演示)')
    }
  }

  function reset() {
    model.name = ''
    model.email = ''
    errors.name = ''
    errors.email = ''
  }
</script>

<route lang="json">
{ "name": "Forms", "meta": { "title": "表单示例" } }
</route>
