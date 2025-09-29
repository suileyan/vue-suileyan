<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed',
      sizeClass,
      variantClass,
      { 'w-full': block },
    ]"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <span
      v-if="loading"
      class="mr-2 h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
  type Size = 'sm' | 'md' | 'lg'

  const props = withDefaults(
    defineProps<{
      variant?: Variant
      size?: Size
      block?: boolean
      loading?: boolean
      disabled?: boolean
    }>(),
    {
      variant: 'primary',
      size: 'md',
      block: false,
      loading: false,
      disabled: false,
    },
  )

  const emit = defineEmits<{ (e: 'click', evt: MouseEvent): void }>()

  const sizeClass = computed(
    () =>
      ({
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-base',
      })[props.size],
  )

  const variantClass = computed(
    () =>
      ({
        primary: 'bg-primary-600 text-white hover:bg-primary-500',
        secondary: 'bg-emerald-600 text-white hover:bg-emerald-500',
        outline:
          'border border-slate-300/70 text-slate-700 hover:border-primary-400 dark:text-slate-200',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100/60 dark:text-slate-200',
      })[props.variant],
  )

  function onClick(evt: MouseEvent) {
    if (props.disabled || props.loading) return
    emit('click', evt)
  }
</script>
