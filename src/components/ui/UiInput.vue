<template>
  <label class="block">
    <span v-if="label" class="text-sm text-slate-500">{{ label }}</span>
    <div
      :class="[
        'mt-1 flex items-center rounded-lg border bg-white/70 dark:bg-white/5 px-3',
        error ? 'border-red-400' : 'border-slate-300/70 focus-within:border-primary-400',
      ]"
    >
      <span v-if="$slots['prefix']" class="mr-2 text-slate-400"><slot name="prefix" /></span>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-transparent py-2 outline-none placeholder:text-slate-400"
        @input="(e: any) => emit('update:modelValue', e.target.value)"
      />
      <span v-if="$slots['suffix']" class="ml-2 text-slate-400"><slot name="suffix" /></span>
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      modelValue?: string
      label?: string
      placeholder?: string
      type?: string
      error?: string
      disabled?: boolean
    }>(),
    {
      modelValue: '',
      label: '',
      type: 'text',
      placeholder: '',
      error: '',
      disabled: false,
    },
  )

  const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>
