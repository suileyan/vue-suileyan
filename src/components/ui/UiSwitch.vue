<template>
  <button
    :class="[
      'inline-flex items-center rounded-full transition focus:outline-none',
      checked ? 'bg-primary-600' : 'bg-slate-300/70 dark:bg-slate-700',
      sizeClass,
    ]"
    role="switch"
    :aria-checked="checked"
    @click="toggle"
  >
    <span :class="['bg-white rounded-full shadow transform transition', knobClass]" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{ modelValue?: boolean; size?: 'sm' | 'md' }>(), {
    modelValue: false,
    size: 'md',
  });
  const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

  const checked = computed(() => !!props.modelValue);
  const sizeClass = computed(() => (props.size === 'sm' ? 'h-6 w-10 p-1' : 'h-7 w-12 p-1'));
  const knobClass = computed(() =>
    props.size === 'sm'
      ? checked.value
        ? 'translate-x-4 h-4 w-4'
        : 'translate-x-0 h-4 w-4'
      : checked.value
        ? 'translate-x-5 h-5 w-5'
        : 'translate-x-0 h-5 w-5',
  );

  function toggle() {
    emit('update:modelValue', !props.modelValue);
  }
</script>
