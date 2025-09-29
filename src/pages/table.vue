<template>
  <section class="container-page py-12">
    <h2 class="text-3xl font-bold">表格示例</h2>
    <p class="mt-2 text-base-content/60">原生表格 · 排序 / 筛选 / 分页</p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <input
        v-model.trim="q"
        class="rounded border px-3 py-2 bg-base-100 border-base-300 text-base-content"
        placeholder="搜索名称"
      />
      <div class="flex items-center gap-2 text-sm text-base-content/70">
        <span>最低分：</span>
        <span class="tabular-nums font-medium text-base-content">{{ minScore }}</span>
        <input
          type="range"
          v-model.number="minScore"
          min="0"
          max="100"
          class="range range-xs w-40"
        />
      </div>
      <select v-model="sortBy" class="rounded border px-3 py-2 bg-base-100 border-base-300">
        <option value="score">按分数</option>
        <option value="name">按姓名</option>
      </select>
      <button class="rounded border px-3 py-2 border-base-300" @click="toggleSort">
        {{ sortAsc ? '升序' : '降序' }}
      </button>
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="dense" class="checkbox checkbox-sm" /> 紧凑模式
      </label>
      <span class="ml-auto text-sm text-base-content/70">共 {{ filtered.length }} 条</span>
    </div>

    <div class="mt-6 overflow-x-auto rounded-xl border border-base-300 shadow-sm">
      <table class="min-w-full">
        <thead class="sticky top-0 z-10 bg-base-200/90 backdrop-blur">
          <tr>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider cursor-pointer select-none"
              :aria-sort="sortBy === 'name' ? (sortAsc ? 'ascending' : 'descending') : 'none'"
              @click="setSort('name')"
            >
              姓名 <span v-if="sortBy === 'name'">({{ sortAsc ? '升序' : '降序' }})</span>
            </th>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider cursor-pointer select-none"
              :aria-sort="sortBy === 'score' ? (sortAsc ? 'ascending' : 'descending') : 'none'"
              @click="setSort('score')"
            >
              分数 <span v-if="sortBy === 'score'">({{ sortAsc ? '升序' : '降序' }})</span>
            </th>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider"
            >
              标签
            </th>
          </tr>
        </thead>
        <tbody class="bg-base-100">
          <tr
            v-for="r in paged"
            :key="r.name"
            class="hover:bg-base-200/50 transition-colors odd:bg-base-100 even:bg-base-200/20"
          >
            <td class="px-4" :class="dense ? 'py-2' : 'py-3'">
              <div class="flex items-center gap-3">
                <div
                  class="h-8 w-8 shrink-0 rounded-full text-white grid place-items-center text-xs font-semibold"
                  :style="avatarStyle(r.name)"
                >
                  {{ initial(r.name) }}
                </div>
                <div class="leading-tight">
                  <div class="font-medium">{{ r.name }}</div>
                  <div class="text-xs text-base-content/60">ID-{{ r.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-4" :class="dense ? 'py-2' : 'py-3'">
              <div class="flex items-center gap-3">
                <div class="tabular-nums w-10">{{ r.score }}</div>
                <div class="h-2 w-28 rounded-full bg-base-300 overflow-hidden">
                  <div class="h-full rounded-full bg-primary" :style="{ width: r.score + '%' }" />
                </div>
              </div>
            </td>
            <td class="px-4" :class="dense ? 'py-2' : 'py-3'">
              <span
                class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                :class="badgeClass(r.score)"
              >
                {{ badgeLabel(r.score) }}
              </span>
            </td>
          </tr>
          <tr v-if="paged.length === 0">
            <td colspan="3" class="px-4 py-10 text-center text-base-content/50">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <div class="text-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0">
        <span>每页</span>
        <select v-model.number="pageSize" class="select select-bordered select-sm">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <span>条</span>
      </div>
      <div class="ml-auto flex items-center gap-2 text-sm">
        <button class="btn btn-sm" :disabled="page === 1" @click="page--">上一页</button>
        <span class="px-2">{{ displayPage }} / {{ totalPages }}</span>
        <button class="btn btn-sm" :disabled="page >= totalPages" @click="page++">下一页</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  type Row = { id: number; name: string; score: number }

  const q = ref('')
  const minScore = ref(0)
  const sortBy = ref<'name' | 'score'>('score')
  const sortAsc = ref(true)
  const dense = ref(false)

  const rows = ref<Row[]>(
    Array.from({ length: 48 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      score: Math.round(50 + Math.random() * 50),
    })),
  )

  const filtered = computed(() =>
    rows.value.filter(
      (r) => r.name.toLowerCase().includes(q.value.toLowerCase()) && r.score >= minScore.value,
    ),
  )

  const view = computed(() => {
    const data = [...filtered.value]
    data.sort((a, b) => {
      const dir = sortAsc.value ? 1 : -1
      if (sortBy.value === 'name') return a.name.localeCompare(b.name) * dir
      return (a.score - b.score) * dir
    })
    return data
  })

  const page = ref(1)
  const pageSize = ref(10)
  const totalPages = computed(() => Math.max(1, Math.ceil(view.value.length / pageSize.value)))
  const displayPage = computed(() => Math.min(page.value, totalPages.value))
  const paged = computed(() => {
    const start = (displayPage.value - 1) * pageSize.value
    return view.value.slice(start, start + pageSize.value)
  })

  function toggleSort() {
    sortAsc.value = !sortAsc.value
  }
  function setSort(key: 'name' | 'score') {
    if (sortBy.value === key) sortAsc.value = !sortAsc.value
    else {
      sortBy.value = key
      sortAsc.value = true
    }
  }

  function initial(name: string) {
    return name?.trim()?.charAt(0)?.toUpperCase() || '?'
  }
  function avatarStyle(seed: string) {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360
    return { backgroundColor: `hsl(${h}, 70%, 45%)` }
  }
  function badgeLabel(score: number) {
    if (score >= 90) return '优秀'
    if (score >= 80) return '良好'
    if (score >= 60) return '及格'
    return '待提升'
  }
  function badgeClass(score: number) {
    if (score >= 90) return 'bg-green-100 text-green-700'
    if (score >= 80) return 'bg-emerald-100 text-emerald-700'
    if (score >= 60) return 'bg-amber-100 text-amber-700'
    return 'bg-rose-100 text-rose-700'
  }

  // 当筛选/排序/每页数量变化时回到第 1 页
  watch([q, minScore, sortBy, sortAsc, pageSize], () => {
    page.value = 1
  })
</script>

<route lang="json">
{ "name": "Table", "meta": { "title": "表格示例" } }
</route>
