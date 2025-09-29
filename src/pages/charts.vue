<template>
  <section class="container-page py-12">
    <h2 class="text-3xl font-bold">图表展示</h2>
    <p class="mt-2 text-slate-500">ECharts 折线 + 柱状双轴示例</p>
    <div class="mt-6 grid md:grid-cols-2 gap-6">
      <div
        class="rounded-2xl p-4 bg-white/70 dark:bg-white/5 shadow-xl border border-white/30 backdrop-blur-xl h-[320px]"
      >
        <LineChart :data="lineData" :options="lineOptions" :height="320" />
      </div>
      <div
        class="rounded-2xl p-4 bg-white/70 dark:bg-white/5 shadow-xl border border-white/30 backdrop-blur-xl h-[320px]"
      >
        <BarChart :data="barData" :options="barOptions" :height="320" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import LineChart from '@/components/charts/LineChart.vue'
  import BarChart from '@/components/charts/BarChart.vue'

  const labels = Array.from({ length: 12 }).map((_, i) => `${i + 1}月`)
  const dataA = labels.map(() => Math.round(50 + Math.random() * 50))
  const dataB = labels.map(() => Math.round(10 + Math.random() * 20))

  const lineData = {
    labels,
    datasets: [
      {
        label: '销量',
        data: dataA,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,.2)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  }
  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } } },
  }

  const barData = {
    labels,
    datasets: [
      { type: 'bar' as const, label: '销量', data: dataA, backgroundColor: 'rgba(99,102,241,.7)' },
      {
        type: 'line' as const,
        label: '转化率',
        data: dataB.map((n) => n / 100),
        borderColor: '#10B981',
        tension: 0.35,
        yAxisID: 'y1',
      },
    ],
  }
  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: { beginAtZero: true },
      y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } },
    },
  }
</script>

<route lang="json">
{ "name": "Charts", "meta": { "title": "图表展示" } }
</route>
