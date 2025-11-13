/**
 * 图表工具函数
 * 集中管理图表配置和样式，减少重复代码
 */

// 基础颜色配置
export const CHART_COLORS = {
  primary: '#6366F1',
  primaryLight: 'rgba(99,102,241,0.35)',
  primaryLighter: 'rgba(99,102,241,0.2)',
  grid: 'rgba(148,163,184,0.2)',
  text: {
    light: '#374151',
    dark: '#9CA3AF',
  },
} as const;

// 默认图表选项
export const DEFAULT_CHART_OPTIONS = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: CHART_COLORS.grid } },
  },
} as const;

/**
 * 创建渐变背景色
 */
export function createGradientBackground(
  ctx: CanvasRenderingContext2D,
  chartArea: { top: number; bottom: number },
  colorStops: { stop: number; color: string }[],
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color);
  });

  return gradient;
}

/**
 * 默认的渐变背景配置
 */
export const DEFAULT_GRADIENT_CONFIG = [
  { stop: 0, color: CHART_COLORS.primaryLight },
  { stop: 1, color: 'rgba(99,102,241,0)' },
];

/**
 * 创建线图数据集配置
 */
export function createLineDataset(
  data: number[],
  label: string = 'Trend',
  options: {
    borderColor?: string;
    backgroundColor?: string | CanvasGradient;
    tension?: number;
    pointRadius?: number;
    borderWidth?: number;
  } = {},
) {
  return {
    label,
    data,
    fill: true,
    borderColor: options.borderColor || CHART_COLORS.primary,
    backgroundColor: options.backgroundColor || CHART_COLORS.primaryLighter,
    tension: options.tension ?? 0.35,
    pointRadius: options.pointRadius ?? 0,
    borderWidth: options.borderWidth ?? 3,
  };
}

/**
 * 创建带渐变背景的线图数据集
 */
export function createGradientLineDataset(
  data: number[],
  label: string = 'Trend',
  gradientConfig = DEFAULT_GRADIENT_CONFIG,
) {
  return {
    label,
    data,
    fill: true,
    borderColor: CHART_COLORS.primary,
    backgroundColor: (ctx: any) => {
      const { chart } = ctx;
      const chartArea = chart.chartArea;

      if (!chartArea) return CHART_COLORS.primaryLighter;

      return createGradientBackground(chart.ctx, chartArea, gradientConfig);
    },
    tension: 0.35,
    pointRadius: 0,
    borderWidth: 3,
  };
}

/**
 * 生成模拟数据点
 */
export function generateSampleData(
  count: number = 10,
  baseValue: number = 50,
  variance: number = 50,
): Array<{ date: string; value: number }> {
  return Array.from({ length: count }).map((_, i) => ({
    date: new Date(Date.now() - (count - 1 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    }),
    value: Math.round(baseValue + Math.random() * variance),
  }));
}

/**
 * 创建完整的线图配置
 */
export function createLineChartConfig(labels: string[], data: number[], customOptions: any = {}) {
  return {
    labels,
    datasets: [createGradientLineDataset(data)],
    options: { ...DEFAULT_CHART_OPTIONS, ...customOptions },
  };
}
