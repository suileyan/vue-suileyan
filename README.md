# Suileyan · Vue 3 + Vite + TS 模板

一个生产可用的 Vue 3 启动模板，面向中小型前端项目与快速原型开发，集成：

- 路由与布局：`vite-plugin-pages` 自动路由 · `vite-plugin-vue-layouts` 布局
- 状态与网络：`pinia` 状态管理 · `alova` 请求（`axios`/`xhr` 适配）
- 可视化与动画：`ECharts` / `vue-echarts`、`Chart.js` / `vue-chartjs`、`GSAP`
- 工程化：ESLint Flat + Prettier、Vitest + Playwright、Tailwind v4、PWA、压缩与打包分析
- 体验与埋点：`nprogress` 页面进度条、`rrweb` 非侵入式录制（按需开启）

当前版本：`0.0.0` · 维护状态：活跃维护（CI Node `22`，推荐本地 Node `>=18`，最佳 `22`）。

---

## 项目概述

- 核心功能：提供现代 Vue 3 工程化模板，内置 i18n、HTTP 示例、错误边界、单元与端到端测试、PWA 等。
- 目标用户：需要快速搭建可上线的 Vue 应用的前端工程师与团队。
- 使用场景：企业后台、数据可视化、运营平台、SaaS 前端、原型验证。
- 架构与技术栈：
  - 前端框架：`vue@^3.5` + `vue-router@^4.5`
  - 构建工具：`vite@^7`（见 `vite.config.ts`）
  - 样式：`tailwindcss@^4` + `@tailwindcss/postcss` · 可选 `daisyui`
  - 状态管理：`pinia@^3`
  - 网络层：`alova@^3.3` + `axios@^1.12` 或 `@alova/adapter-xhr`
  - 测试：`vitest@^4`（`happy-dom`）· `@playwright/test@^1.56`（E2E）
  - 其他：`vue-i18n@^11`、`unplugin-*` 自动导入与组件、`vite-plugin-pwa`、`rollup-plugin-visualizer`

---

## 开发环境配置

- 系统要求：
  - 操作系统：macOS / Linux / Windows
  - Node：`>=18`（与 CI 对齐推荐 `22`）
  - 包管理器：`yarn@1.x`（已配置缓存与锁定）
- 安装指南：
  - 安装依赖：`yarn install`
  - 安装 Playwright 浏览器（E2E）：`yarn playwright install`
- 开发依赖清单（用途与版本）：
  - 构建与框架：
    - `vite@^7.1.7` — 现代构建工具
    - `@vitejs/plugin-vue@^6.0.1` — Vue SFC 支持
    - `unplugin-auto-import@^20.2.0` — 自动导入 `vue`/`pinia` 等 API
    - `unplugin-vue-components@^29.1.0` — 组件按需自动导入
    - `unplugin-icons@^22.3.0` · `@iconify-json/heroicons@^1.2.3` — 图标组件
    - `vite-plugin-pages@^0.33.1` — 文件系统路由
    - `vite-plugin-vue-layouts@^0.11.0` — 布局系统
    - `vite-plugin-pwa@^1.0.3` — PWA 支持
    - `vite-plugin-compression@^0.5.1` — gzip/br 压缩
    - `vite-plugin-inspect@^11.3.3` — 插件调试
    - `rollup-plugin-visualizer@^6.0.3` — 构建体积分析
    - `vite-auto-i18n-plugin@^1.1.9` — 自动翻译（可选）
  - 语言与类型：
    - `typescript@~5.8.3` — TypeScript 语言
    - `vue-tsc@^3.0.7` — Vue SFC 类型检查（`yarn typecheck`）
    - `@vue/tsconfig@^0.8.1` — Vue TS 基础配置
  - 样式与后处理：
    - `tailwindcss@^4.1.13` — 原子化 CSS 框架
    - `@tailwindcss/postcss@^4.1.13` · `postcss@^8.5.6` — PostCSS 集成
    - `autoprefixer@^10.4.21` — CSS 兼容性前缀
    - `daisyui@^5.1.25` — Tailwind 组件库（可选）
  - 代码质量：
    - `eslint@^9.36.0` — ESLint 扁平配置
    - `@eslint/js@^9.36.0` — JS 规则集
    - `eslint-plugin-vue@^10.5.0` · `vue-eslint-parser@^10.2.0` — Vue 规则与解析
    - `@typescript-eslint/parser@^8.44.1` · `@typescript-eslint/eslint-plugin@^8.44.1` — TS 规则与解析
    - `prettier@^3.6.2` · `eslint-plugin-prettier@^5.5.4` — 统一格式与规则集成
    - `husky@^9.1.7` · `lint-staged@^16.2.3` — 提交前钩子与增量修复
    - `commitlint@^20.x`（`@commitlint/cli` · `@commitlint/config-conventional`）— 提交规范
  - 测试与模拟：
    - `vitest@^4.0.8` — 单元测试框架
    - `@vitest/coverage-v8@^4.0.8` — 覆盖率
    - `happy-dom@^20.0.10` — 浏览器环境模拟
    - `@playwright/test@^1.56.1` — 端到端测试
    - `msw@^2.11.3` — 接口模拟
    - `mockjs@^1.1.0` — 数据模拟
  - 其它工具：
    - `nprogress@^0.2.0` — 进度条
    - `json-format@^1.0.1` — JSON 格式化
    - `tunnel@^0.0.6` — 代理支持（翻译等）
    - `@vitalets/google-translate-api@^9.2.1` — Google 翻译（可选）

特殊配置说明：项目使用 Vite（非 webpack/babel）。关键构建配置位于 `vite.config.ts`，包含路由、自动导入、PWA、压缩与 i18n 插件等。

---

## 项目初始化与配置

- 环境变量模板（`.env.example` 已提供）：

```env
VITE_API_BASE=/api
VITE_API_TIMEOUT=15000
VITE_HTTP_ADAPTER=axios
VITE_RRWEB=false
VITE_ANALYTICS=false
VITE_AUTO_I18N=false
VITE_AUTO_I18N_API_KEY=
VITE_AUTO_I18N_TRANSLATOR=google
VITE_AUTO_I18N_PROXY_HOST=127.0.0.1
VITE_AUTO_I18N_PROXY_PORT=7890
VITE_AUTO_I18N_TARGETS=en
VITE_YOUDAO_APP_ID=
VITE_YOUDAO_APP_KEY=
VITE_BAIDU_APP_ID=
VITE_BAIDU_APP_KEY=
VITE_VOLCENGINE_API_KEY=
VITE_VOLCENGINE_MODEL=
```

- 关键配置文件：
  - `vite.config.ts` — 构建与插件配置（含 `base` 路径、PWA、自动路由、i18n）
  - `eslint.config.mjs` — ESLint 扁平配置与忽略项
  - `tailwind.config.cjs` · `postcss.config.cjs` — 样式系统配置
  - `tsconfig.app.json` · `tsconfig.node.json` — TS 项目配置
  - `vitest.config.ts` · `playwright.config.ts` — 测试配置（E2E `baseURL` 与 Vite 预览保持一致）
  - `.github/workflows/*.yml` — CI、Pages 发布与 Release 模板
- 首次运行前步骤：
  - 配置 `.env`（参考 `.env.example`）
  - 安装依赖：`yarn install`
  - 安装浏览器：`yarn playwright install`
  - 启动开发：`yarn dev`

---

## 模板定制指南

- 修改现有功能：
  - 路由与页面：在 `src/pages` 增删改 `.vue` 文件；布局在 `src/layouts`（默认 `default.vue`）。
  - 状态：在 `src/stores` 创建/修改 Pinia Store。
  - HTTP：在 `src/services/alova.ts` 配置接口根路径和适配器；示例页 `src/pages/http-demo.vue`。
  - i18n：`src/plugins/i18n.ts` 使用 `vue-i18n`；自动翻译由 `vite-auto-i18n-plugin` 控制（`VITE_AUTO_I18N`）。
- 添加新功能的扩展点：
  - 自动导入：将常用工具放入 `src/utils` 或 `src/stores`，自动生成类型声明。
  - 虚拟模块：如需构建时注入常量，可在 `vite.config.ts` 使用插件或 `define`。
- 功能裁剪方法：
  - 移除 rrweb：删除 `src/plugins/rrweb.ts` 与相关启用逻辑，移除 `rrweb` 依赖与环境变量。
  - 裁剪可视化：删除 `src/pages/charts.vue` 与相关依赖（`echarts`/`chart.js`）
  - 移除自动翻译：关闭 `VITE_AUTO_I18N` 并移除 `vite-auto-i18n-plugin` 与 `lang/` 目录。
- 主题与样式自定义：
  - 在 `tailwind.config.cjs` 定义主题、色板与插件；组件示例位于 `src/components/ui/*`。
  - 全局样式在 `src/style.css`；结合 `daisyui` 可快速调整主题。

---

## 开发工作流

- 常用命令：
  - 启动开发：`yarn dev`
  - 代码规范：`yarn lint` · 自动修复 `yarn lint:fix`
  - 格式化：`yarn format` · 校验 `yarn format:check`
  - 类型检查：`yarn typecheck` · 监听 `yarn typecheck:watch` · 严格 `yarn typecheck:strict`
  - 单元测试：`yarn test` / `yarn test:watch` / `yarn test:coverage`
  - 端到端测试：
    - 预览服务：`yarn preview`
    - 运行 E2E：`yarn e2e`（确保 `playwright.config.ts` 的 `baseURL` 与预览路径一致，如 `http://localhost:4173/vue-suileyan/`）
- 代码规范与质量流程：
  - 提交前自动：`husky + lint-staged` 执行 ESLint/Prettier 增量修复。
  - 严格检查：
    - ESLint 扁平配置，TS 类型感知规则（如 `no-floating-promises`）。
    - `yarn typecheck:strict` 将 ESLint Warning 视为失败。
  - 提交规范：`commitlint` 采用 Conventional Commits（如 `feat: xxx`）。
  - 版本管理：CI 构建与产物上传；可结合 Release 工作流（`release-template.yml`）。

---

## 部署说明

- 生产构建：`yarn build`
- 本地预览：`yarn preview`
- 部署到不同平台：
  - 静态站点（Nginx/Apache/OSS）：上传 `dist/`；注意 `vite.config.ts` 的 `base`（如子路径部署设置 `'/vue-suileyan/'`）。
  - GitHub Pages：使用 `.github/workflows/pages.yml`（已处理 `VITE_BASE` 与 `404.html`）。
- 性能优化建议：
  - 使用按需加载与路由级代码分割（`vite-plugin-pages` 默认启用 `importMode: 'async'`）。
  - 启用 `brotli/gzip` 压缩与 PWA 缓存（已配置）。
  - 利用 `rollup-plugin-visualizer` 分析包体并做依赖瘦身。

---

## 维护与贡献

- 已知问题与解决方案：
  - ESLintIgnoreWarning：删除根目录 `.eslintignore`，改为在 `eslint.config.mjs` 使用 `ignores`。
  - Playwright 浏览器缺失：执行 `yarn playwright install`。
  - E2E 连接被拒：先运行 `yarn preview`，确保 `playwright.config.ts` 的 `baseURL` 与预览一致。
  - Vitest 假定时导致超时：移除假定时并缩短重试延时。
- 常见问题：
  - 如何切换 HTTP 适配器：设置 `VITE_HTTP_ADAPTER=axios|xhr`。
  - 如何关闭自动翻译：`VITE_AUTO_I18N=false`，并移除插件与 `lang/`。
  - 如何启用 rrweb：设置 `VITE_RRWEB=true` 或 `VITE_ANALYTICS=true`。
- 贡献指南：
  - Fork 后创建特性分支，遵循 Conventional Commits，提交 PR。
  - 在 PR 中附带：`yarn lint`、`yarn typecheck`、`yarn test`、`yarn build` 通过的结果。

---

## 目录结构

- `src/` 应用源码：
  - `pages/`（自动路由） · `layouts/`（默认 `default.vue`） · `components/` · `stores/`（Pinia） · `services/alova.ts` · `router/` · `plugins/rrweb.ts` · `types/`
- `public/` 静态资源（`favicon.svg` 用作浏览器标签与 Header 图标）
- `lang/` 自动翻译产物（启用 `VITE_AUTO_I18N` 时生成，已加入 `.gitignore`）
- `dist/` 构建产物
- `.github/workflows/` CI（Lint + Typecheck + Build、Pages 发布、Release 附件）

---

## 快速开始

- 安装依赖：`yarn install`
- 开发：`yarn dev`
- 构建（含严格类型检查）：`yarn build`
- 本地预览：`yarn preview`
- 代码规范：`yarn lint` / `yarn lint:fix` / `yarn format` / `yarn format:check`
- 类型检查：`yarn typecheck`（编辑器同级严格）/ `yarn typecheck:watch` / `yarn typecheck:strict`

---

## .env 配置示例（可复制）

```env
# API 根路径，例如后端反代 /api -> http://backend/
VITE_API_BASE=/api
VITE_API_TIMEOUT=15000
VITE_HTTP_ADAPTER=axios

VITE_RRWEB=false
VITE_ANALYTICS=false

VITE_AUTO_I18N=false
VITE_AUTO_I18N_API_KEY=
VITE_AUTO_I18N_TRANSLATOR=google
VITE_AUTO_I18N_PROXY_HOST=127.0.0.1
VITE_AUTO_I18N_PROXY_PORT=7890
VITE_AUTO_I18N_TARGETS=en

VITE_YOUDAO_APP_ID=
VITE_YOUDAO_APP_KEY=
VITE_BAIDU_APP_ID=
VITE_BAIDU_APP_KEY=
VITE_VOLCENGINE_API_KEY=
VITE_VOLCENGINE_MODEL=
```

提示：请勿将 `.env*` 提交到仓库；`lang/` 为自动翻译产物目录，也应忽略提交。已将别名 `lang` 映射到 `./lang`，避免 Vite 导入分析报错。
