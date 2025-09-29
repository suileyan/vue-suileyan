<template>
  <div class="h-full">
    <Line :data="data" :options="options" :height="height" :width="width" />
  </div>
</template>

<script setup lang="ts">
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  )

  defineProps<{
    data: any
    options?: any
    height?: number
    width?: number
  }>()
</script>
