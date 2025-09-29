import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoI18n, {
  GoogleTranslator,
  YoudaoTranslator,
  BaiduTranslator,
  VolcengineTranslator,
  EmptyTranslator,
} from 'vite-auto-i18n-plugin'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const enableAutoI18n = env.VITE_AUTO_I18N === 'true'
  const translatorType = (env.VITE_AUTO_I18N_TRANSLATOR || 'google').toLowerCase()
  const proxyHost = env.VITE_AUTO_I18N_PROXY_HOST || '127.0.0.1'
  const proxyPort = Number(env.VITE_AUTO_I18N_PROXY_PORT || 7890)
  const youdaoAppId = env.VITE_YOUDAO_APP_ID || ''
  const youdaoAppKey = env.VITE_YOUDAO_APP_KEY || ''
  const baiduAppId = env.VITE_BAIDU_APP_ID || ''
  const baiduAppKey = env.VITE_BAIDU_APP_KEY || ''
  const volcApiKey = env.VITE_VOLCENGINE_API_KEY || ''
  const volcModel = env.VITE_VOLCENGINE_MODEL || ''
  const targets = (env.VITE_AUTO_I18N_TARGETS || 'en')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  return {
    base: process.env.VITE_BASE ?? '/',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            hoistStatic: false,
            cacheHandlers: false,
          },
        },
      }),
      Pages({
        dirs: 'src/pages',
        extensions: ['vue'],
        importMode: 'async',
        routeStyle: 'nuxt',
      }),
      Layouts(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
        dirs: ['src/stores'],
      }),
      Components({
        dts: 'src/components.d.ts',
        resolvers: [IconsResolver({ componentPrefix: 'i' })],
      }),
      Icons({ compiler: 'vue3' }),
      Inspect(),
      viteCompression({ algorithm: 'brotliCompress' }),
      viteCompression({ algorithm: 'gzip' }),
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        open: false,
      }) as any,
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'SuiKit Base',
          short_name: 'SuiKit',
          description: 'Vue 3 base template with Vite + Tailwind + Pinia + Alova',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            {
              src: 'pwa-512x512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
          navigateFallback: '/offline.html',
        },
      }),
      ...(enableAutoI18n
        ? [
            AutoI18n({
              translator:
                translatorType === 'youdao'
                  ? new YoudaoTranslator({ appId: youdaoAppId, appKey: youdaoAppKey })
                  : translatorType === 'baidu'
                    ? new BaiduTranslator({ appId: baiduAppId, appKey: baiduAppKey })
                    : translatorType === 'volcengine'
                      ? new VolcengineTranslator({ apiKey: volcApiKey, model: volcModel })
                      : translatorType === 'empty'
                        ? new EmptyTranslator({})
                        : new GoogleTranslator({
                            proxyOption: {
                              host: proxyHost,
                              port: proxyPort,
                              headers: { 'User-Agent': 'Node' },
                            },
                          }),
              translateKey: '$at',
              globalPath: './lang',
              namespace: 'lang',
              distPath: './dist/assets',
              distKey: 'index',
              originLang: 'zh-cn',
              targetLangList: targets,
              buildToDist: mode !== 'development',
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 为开发与导入分析映射 i18n 运行时代码目录
        lang: fileURLToPath(new URL('./lang', import.meta.url)),
        // 避免在浏览器构建中将 Node 的 worker_threads 外部化
        worker_threads: fileURLToPath(
          new URL('./src/shims/empty-worker-threads.ts', import.meta.url),
        ),
        'node:worker_threads': fileURLToPath(
          new URL('./src/shims/empty-worker-threads.ts', import.meta.url),
        ),
      },
    },
    css: {
      devSourcemap: true,
    },
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      exclude: ['worker_threads'],
    },
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? ''
            const ext = name.split('.').pop()?.toLowerCase()
            if (ext === 'css') return 'css/[name]-[hash][extname]'
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext ?? ''))
              return 'img/[name]-[hash][extname]'
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext ?? ''))
              return 'fonts/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          },
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('pinia')) return 'vue'
              if (id.includes('echarts')) return 'echarts'
              if (id.includes('chart.js') || id.includes('vue-chartjs')) return 'chartjs'
              if (id.includes('gsap')) return 'gsap'
              if (id.includes('alova') || id.includes('axios')) return 'network'
              if (id.includes('@vueuse')) return 'vueuse'
              return 'vendor'
            }
          },
        },
        // 这里尽量保持 Rollup 插件最小化；如需可视化分析，已在上方 Vite 插件中按需启用 visualizer
      },
    },
  }
})
