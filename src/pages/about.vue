<template>
  <section class="container-page py-16">
    <h2 class="text-3xl font-bold">关于本模板</h2>
    <p class="mt-4 text-base-content/70">
      集成：Vue3 + Vite + TypeScript + TailwindCSS + Pinia + vite-plugin-pages + vite-plugin-layouts
      + ECharts + GSAP + rrweb + alova。
    </p>
    <ul class="mt-6 list-disc pl-6 space-y-2 text-sm text-slate-500">
      <li>
        自动路由指向 <code class="px-1 rounded bg-slate-100 dark:bg-slate-800">src/pages</code>
      </li>
      <li>
        默认布局位于
        <code class="px-1 rounded bg-slate-100 dark:bg-slate-800">src/layouts/default.vue</code>
      </li>
      <li>
        按功能库进行 Rollup 分包，产物以
        <code class="px-1 rounded bg-slate-100 dark:bg-slate-800">js/[name]-[hash].js</code> 输出
      </li>
      <li>
        Alova 可通过
        <code class="px-1 rounded bg-slate-100 dark:bg-slate-800">VITE_HTTP_ADAPTER</code> 切换
        axios/xhr
      </li>
    </ul>
  </section>
</template>

<route lang="json">
{ "meta": { "title": "关于" } }
</route>
