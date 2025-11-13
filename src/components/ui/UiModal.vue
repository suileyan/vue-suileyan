<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-slate-900/60" @click="close" />
      <div class="absolute inset-0 grid place-items-center p-4">
        <div
          class="w-full max-w-lg rounded-2xl border bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800 shadow-xl"
        >
          <div
            class="px-5 py-4 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between"
          >
            <h3 class="font-semibold">
              {{ title }}
            </h3>
            <button class="p-1 rounded hover:bg-slate-100/60" @click="close">✕</button>
          </div>
          <div class="p-5">
            <slot />
          </div>
          <div
            v-if="$slots['footer']"
            class="px-5 py-4 border-t border-slate-200/70 dark:border-slate-800"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount } from 'vue';

  defineProps<{ modelValue: boolean; title?: string }>();
  const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'close'): void }>();

  function close() {
    emit('update:modelValue', false);
    emit('close');
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  onMounted(() => window.addEventListener('keydown', onKey));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>
