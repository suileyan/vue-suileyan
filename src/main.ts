import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initRRWeb } from './plugins/rrweb'
import { registerSW } from 'virtual:pwa-register'

// 开发环境启动 MSW 进行 API 模拟（非侵入）
if (import.meta.env.DEV && import.meta.env['VITE_MSW'] !== 'false') {
  // 不阻塞应用挂载；尽力启动
  void import('./mocks/browser').then(({ worker }) => {
    void worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    })
  })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 在开发或启用时初始化非侵入式埋点（rrweb）
initRRWeb()

app.mount('#app')

// 注册 PWA
void registerSW({ immediate: true })
// 自动 i18n 运行时（由 vite-plugin-auto-i18n 生成），受 VITE_AUTO_I18N 控制
if (import.meta.env['VITE_AUTO_I18N'] === 'true') {
  // @ts-ignore
  // 使用变量 + @vite-ignore，避免 Vite 预解析；存在时才按需加载
  const i18nEntry = '/lang/index.js'
  void import(/* @vite-ignore */ i18nEntry as any).catch(() => {})
}
