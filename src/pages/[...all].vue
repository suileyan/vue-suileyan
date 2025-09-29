<template>
  <section class="container-page py-24 text-center">
    <h1 class="text-7xl font-black tracking-tight">404</h1>
    <p class="mt-4 text-slate-500">页面走丢了，回到首页看看吧～</p>
    <RouterLink
      to="/"
      class="inline-block mt-8 px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-500 transition"
    >
      返回首页
    </RouterLink>
  </section>
</template>

<route lang="json">
{ "name": "NotFound", "meta": { "title": "404" } }
</route>
