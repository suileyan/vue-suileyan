<template>
  <section class="container-page py-12">
    <h2 class="text-3xl font-bold">组件演示</h2>
    <p class="mt-2 text-slate-500">基于 Tailwind 封装的常用 UI</p>

    <div class="mt-8 grid lg:grid-cols-2 gap-6">
      <UiCard glass hoverable>
        <template #header>
          <h3 class="font-semibold">Buttons</h3>
        </template>
        <div class="flex flex-wrap gap-3">
          <UiButton>Primary</UiButton>
          <UiButton variant="secondary"> Secondary </UiButton>
          <UiButton variant="outline"> Outline </UiButton>
          <UiButton variant="ghost"> Ghost </UiButton>
          <UiButton :loading="true"> Loading </UiButton>
        </div>
      </UiCard>

      <UiCard glass hoverable>
        <template #header>
          <h3 class="font-semibold">Inputs</h3>
        </template>
        <div class="space-y-4">
          <UiInput v-model="name" label="用户名" placeholder="张三">
            <template #prefix>
              <i-heroicons-user-20-solid class="h-4 w-4" />
            </template>
          </UiInput>
          <UiInput v-model="email" label="邮箱" placeholder="you@example.com" :error="emailError">
            <template #suffix>
              <i-heroicons-envelope-20-solid class="h-4 w-4" />
            </template>
          </UiInput>
        </div>
      </UiCard>

      <UiCard glass hoverable>
        <template #header>
          <h3 class="font-semibold">Badges & Switch</h3>
        </template>
        <div class="flex items-center gap-3">
          <UiBadge>Primary</UiBadge>
          <UiBadge variant="success"> Success </UiBadge>
          <UiBadge variant="warning"> Warning </UiBadge>
          <UiBadge variant="neutral"> Neutral </UiBadge>
          <div class="ml-6 flex items-center gap-2">
            <UiSwitch v-model="on" />
            <span class="text-sm text-slate-500">{{ on ? 'ON' : 'OFF' }}</span>
          </div>
        </div>
      </UiCard>

      <UiCard glass hoverable>
        <template #header>
          <h3 class="font-semibold">Modal</h3>
        </template>
        <div class="flex items-center gap-3">
          <UiButton @click="open = true"> 打开弹窗 </UiButton>
        </div>
      </UiCard>
    </div>

    <UiModal v-model="open" title="示例弹窗">
      <p class="text-sm text-slate-600 dark:text-slate-300">
        这是一个基于 Tailwind 的弹窗组件示例。
      </p>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UiButton variant="ghost" @click="open = false"> 取消 </UiButton>
          <UiButton @click="open = false"> 确认 </UiButton>
        </div>
      </template>
    </UiModal>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const name = ref('');
  const email = ref('');
  const on = ref(false);
  const open = ref(false);

  const emailError = computed(() =>
    /.+@.+/.test(email.value) || email.value === '' ? '' : 'Invalid email',
  );
</script>

<route lang="json">
{ "name": "UI", "meta": { "title": "组件演示" } }
</route>
