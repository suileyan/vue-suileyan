<template>
  <div class="h-full">
    <Bar :data="data" :options="options" :height="height" :width="width" />
  </div>
</template>

<script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  defineProps<{
    data: any;
    options?: any;
    height?: number;
    width?: number;
  }>();
</script>
