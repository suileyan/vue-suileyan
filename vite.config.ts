import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoI18n, {
  GoogleTranslator,
  YoudaoTranslator,
  BaiduTranslator,
  VolcengineTranslator,
  EmptyTranslator,
} from 'vite-auto-i18n-plugin';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import ops from 'vite-plugin-ops';

const createTranslator = (env: Record<string, string>) => {
  const translatorType = env.VITE_AUTO_I18N_TRANSLATOR || 'google';

  switch (translatorType) {
    case 'youdao':
      return new YoudaoTranslator({
        appId: env.YOUDAO_APPID || '',
        appKey: env.YOUDAO_KEY || '',
      });

    case 'baidu':
      return new BaiduTranslator({
        appId: env.BAIDU_APPID || '',
        appKey: env.BAIDU_KEY || '',
      });

    case 'volcengine':
      return new VolcengineTranslator({
        apiKey: env.VOLCENGINE_API_KEY || '',
        model: env.VOLCENGINE_MODEL || 'doubao-1-5-pro-32k-250115',
      });

    case 'empty':
      return new EmptyTranslator();

    case 'google':
    default:
      return new GoogleTranslator({
        proxyOption: {
          host: env.VITE_AUTO_I18N_PROXY_HOST || '127.0.0.1',
          port: Number(env.VITE_AUTO_I18N_PROXY_PORT || 7897),
          headers: {
            'User-Agent': 'Node',
          },
        },
      });
  }
};

const createI18nPlugin = (env: Record<string, string>) => {
  const enabled = env.VITE_AUTO_I18N !== 'false';
  const targetLangs = env.VITE_AUTO_I18N_TARGETS?.split(',') || ['en', 'ko', 'ja'];

  return AutoI18n({
    enabled,
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/js',
    distKey: 'index',
    targetLangList: targetLangs,
    excludedCall: ['noTrans', 'raw'],
    excludedPath: ['node_modules'],
    excludedPattern: [/^(中文|English|한국어|日本語)$/],
    isClear: true,
    rewriteConfig: true,
    originLang: 'zh-cn',
    translator: createTranslator(env),
  });
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE ?? '/vue-suileyan/',
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
      createI18nPlugin(env),
      ops({ strategy: 'conservative' }),
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
    },
  };
});
