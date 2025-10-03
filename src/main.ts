import '../lang/index.js'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initRRWeb } from './plugins/rrweb'
import { registerSW } from 'virtual:pwa-register'

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
