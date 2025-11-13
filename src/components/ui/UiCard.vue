<template>
  <div :class="wrapperClass">
    <div v-if="$slots['header'] || title" class="px-5 pt-5">
      <slot name="header">
        <h3 class="text-base font-semibold">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div class="p-5">
      <slot />
    </div>
    <div v-if="$slots['footer']" class="px-5 pb-5">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{ glass?: boolean; hoverable?: boolean; title?: string }>(),
    {
      glass: false,
      hoverable: false,
      title: '',
    },
  );

  const wrapperClass = computed(() => [
    'rounded-2xl border shadow-sm transition',
    props.glass
      ? 'bg-white/70 dark:bg-white/5 border-white/30 backdrop-blur-xl'
      : 'bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800',
    props.hoverable && 'hover:shadow-md',
  ]);
</script>
