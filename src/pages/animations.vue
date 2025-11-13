<template>
  <section class="container-page py-12">
    <h2 class="text-3xl font-bold">动画示例</h2>
    <p class="mt-2 text-base-content/60">GSAP 基础进场与交互动效</p>

    <div class="mt-8 grid sm:grid-cols-2 gap-6">
      <div ref="card1" class="glass rounded-xl p-6">
        <h3 class="font-semibold">卡片一</h3>
        <p class="mt-2 text-sm text-base-content/60">进入时向上淡入</p>
      </div>
      <div ref="card2" class="glass rounded-xl p-6">
        <h3 class="font-semibold">卡片二</h3>
        <p class="mt-2 text-sm text-base-content/60">进入时缩放淡入</p>
      </div>
    </div>

    <div class="mt-10">
      <button
        class="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-500"
        @click="pulse"
      >
        交互：脉冲动画
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { gsap } from 'gsap';

  const card1 = ref<HTMLElement | null>(null);
  const card2 = ref<HTMLElement | null>(null);

  onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(card1.value, { y: 20, opacity: 0, duration: 0.6 }).from(
      card2.value,
      { scale: 0.95, opacity: 0, duration: 0.6 },
      '-=0.2',
    );
  });

  function pulse() {
    gsap.fromTo(
      [card1.value, card2.value],
      { scale: 1 },
      { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' },
    );
  }
</script>

<route lang="json">
{ "name": "Animations", "meta": { "title": "动画示例" } }
</route>
