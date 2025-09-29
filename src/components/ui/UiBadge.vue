<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border',
      variantClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  type Variant = 'primary' | 'success' | 'warning' | 'neutral'
  const props = withDefaults(defineProps<{ variant?: Variant }>(), { variant: 'primary' })

  const variantClass = computed(
    () =>
      ({
        primary: 'bg-primary-500/10 text-primary-700 dark:text-primary-200 border-primary-500/20',
        success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-200 border-amber-500/20',
        neutral:
          'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-700',
      })[props.variant],
  )
</script>
