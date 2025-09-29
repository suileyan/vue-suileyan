<template>
  <section class="container-page pt-12 pb-20">
    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div>
        <div
          class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-primary-500/10 text-primary-700 dark:text-primary-200 border border-primary-500/20"
        >
          <i-heroicons-sparkles-20-solid class="h-4 w-4" />
          Vue 3 + Vite + Tailwind + Pinia + Alova
        </div>
        <h2 ref="titleEl" class="mt-6 text-4xl/tight sm:text-5xl/tight font-extrabold">
          现代化前端基座，
          <span
            class="bg-gradient-to-r from-primary-600 to-emerald-500 dark:from-primary-300 dark:to-emerald-200 bg-clip-text text-transparent drop-shadow"
            aria-label="高效与优雅"
            >高效与优雅</span
          >
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-300">
          集成自动路由、分包构建、可视化图表、动画与非侵入式埋点，助你专注业务。
        </p>
        <div class="mt-8 flex gap-4">
          <RouterLink
            to="/about"
            class="px-5 py-3 rounded-lg bg-primary-600 text-white shadow hover:bg-primary-500 transition"
          >
            快速开始
          </RouterLink>
          <a
            href="https://vitejs.dev"
            target="_blank"
            class="px-5 py-3 rounded-lg border border-slate-300/50 hover:border-primary-400 transition"
            >文档</a
          >
        </div>

        <div class="mt-10 grid sm:grid-cols-3 gap-4">
          <div class="glass rounded-xl p-5">
            <p class="text-sm text-base-content/60">首屏包体</p>
            <p class="mt-2 text-2xl font-semibold">
              <span class="text-primary-600">轻量</span>
            </p>
          </div>
          <div class="glass rounded-xl p-5">
            <p class="text-sm text-base-content/60">构建分包</p>
            <p class="mt-2 text-2xl font-semibold">按需加载</p>
          </div>
          <div class="glass rounded-xl p-5">
            <p class="text-sm text-base-content/60">埋点</p>
            <p class="mt-2 text-2xl font-semibold">非侵入式</p>
          </div>
        </div>
      </div>

      <div class="relative lg:self-end">
        <div
          ref="orbEl"
          class="absolute -top-8 -left-6 h-24 w-24 rounded-full bg-primary-400/60 blur-2xl animate-float"
        />
        <div
          ref="cardEl"
          class="relative rounded-2xl p-6 bg-white/70 dark:bg-white/5 shadow-xl border border-white/30 backdrop-blur-xl h-[320px]"
        >
          <LineChart :data="lineData" :options="lineOptions" :height="320" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import LineChart from '@/components/charts/LineChart.vue'
  import { gsap } from 'gsap'
  import dayjs from 'dayjs'

  const titleEl = ref<HTMLElement | null>(null)
  const orbEl = ref<HTMLElement | null>(null)
  const cardEl = ref<HTMLElement | null>(null)

  const base = Array.from({ length: 10 }).map((_, i) => ({
    date: dayjs()
      .subtract(9 - i, 'day')
      .format('MM-DD'),
    value: Math.round(50 + Math.random() * 50),
  }))

  const lineData = {
    labels: base.map((b) => b.date),
    datasets: [
      {
        label: 'Trend',
        data: base.map((b) => b.value),
        fill: true,
        borderColor: '#6366F1',
        backgroundColor: (ctx: any) => {
          const { ctx: c, chartArea } = ctx.chart
          if (!chartArea) return 'rgba(99,102,241,.2)'
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(99,102,241,.35)')
          gradient.addColorStop(1, 'rgba(99,102,241,0)')
          return gradient
        },
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  }

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(148,163,184,.2)' } } },
  }

  onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(titleEl.value, { y: 20, opacity: 0, duration: 0.6 })
      .from([cardEl.value], { y: 30, opacity: 0, duration: 0.6 }, '-=0.2')
      .from([orbEl.value], { opacity: 0, scale: 0.8, duration: 0.8 }, '-=0.6')
  })
</script>

<style scoped></style>

<route lang="json">
{ "meta": { "title": "首页" } }
</route>
