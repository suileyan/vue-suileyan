# SuiKit Base · Vue 3 + Vite + TS 模板

一个开箱即用的前端模板，集成：Tailwind CSS v4、自动路由与布局（vite-plugin-pages / vite-plugin-vue-layouts）、Pinia、Alova（axios/xhr 适配）、ECharts、GSAP、rrweb 非侵入埋点、NProgress、Icons 按需；工程化：ESLint(Flat) + Prettier、husky + lint-staged、严格类型与规范化产物目录。

## 快速开始

- 安装依赖：`yarn install`
- 开发：`yarn dev`
- 构建（含严格类型检查）：`yarn build`
- 本地预览：`yarn preview`
- 代码规范：`yarn lint` / `yarn lint:fix` / `yarn format` / `yarn format:check`
- 类型检查：`yarn typecheck`（编辑器同级严格）/ `yarn typecheck:watch` / `yarn typecheck:strict`

## 目录结构

- `src/` 应用源码：
  - `pages/`（自动路由） · `layouts/`（默认 `default.vue`） · `components/` · `stores/`（Pinia） · `services/alova.ts`（请求） · `router/` · `plugins/rrweb.ts` · `types/`
- `public/` 静态资源（`favicon.svg` 用作浏览器标签与 Header 图标）
- `lang/` 自动翻译产物（启用 `VITE_AUTO_I18N` 时生成，已加入 .gitignore）
- `dist/` 构建产物
- `.github/workflows/` CI（Lint + Typecheck + Build、Pages 发布、Release 附件）

## 常用脚本

- `yarn dev`：启动 Vite 开发服务器
- `yarn build`：类型检查 + 生产构建（含 gzip/br 压缩、PWA）
- `yarn lint`：ESLint（类型感知，开启如 `no-floating-promises` 等规则）
- `yarn format`：Prettier 统一格式
- `yarn typecheck(:watch|:strict)`：基于 vue-tsc 的严格模板类型检查；`:strict` 额外执行类型感知 ESLint，并将 Warning 视为失败

## 环境变量（`.env*`）

- `VITE_API_BASE` 接口根路径 · `VITE_API_TIMEOUT` 超时（ms）
- `VITE_HTTP_ADAPTER=axios|xhr` 切换 Alova 适配
- `VITE_ANALYTICS` / `VITE_RRWEB` 控制 rrweb 录制（开发默认关闭）
- `VITE_AUTO_I18N` 是否启用自动翻译（开发可开、生产建议关）
- 自动翻译参数：`VITE_AUTO_I18N_TRANSLATOR`、`VITE_AUTO_I18N_PROXY_HOST/PORT`、`VITE_AUTO_I18N_TARGETS`

提示：已将别名 `lang` 映射到 `./lang`，避免 Vite 导入分析报错；不要提交 `lang/` 目录与 `.env*` 到仓库。

## CI/CD（GitHub Actions）

- `ci.yml`：Push/PR 触发 Lint + Typecheck + Build
- `pages.yml`：构建并发布到 GitHub Pages（自动处理 `VITE_BASE` 与 `404.html`）
- `release-template.yml`：发布 `v*` 时打包模板 Zip 并作为 Release 附件

## 编码约定

- 推荐使用 `<script setup lang="ts">`
- 使用 Tailwind 优先构建样式，必要时扩展 `tailwind.config.cjs`

## .env 配置示例与说明

```env
# API 根路径，例如后端反代 /api -> http://backend/
VITE_API_BASE=/api
# 请求超时（毫秒）
VITE_API_TIMEOUT=15000
# 请求适配器：axios 或 xhr（alova）
VITE_HTTP_ADAPTER=axios

# 是否开启 rrweb 录制（布尔）
VITE_RRWEB=false
# 是否开启非侵入式埋点（与 VITE_RRWEB 兼容，任一为 true 即开启）
VITE_ANALYTICS=false

# 是否启用自动翻译（开发可开、生产建议关）
VITE_AUTO_I18N=false
# 自动翻译 API Key（按所选服务可选/必填）
VITE_AUTO_I18N_API_KEY=
# 翻译服务：google|youdao|baidu|volcengine|empty
VITE_AUTO_I18N_TRANSLATOR=google
# 为 google 翻译配置本地 HTTP 代理（仅代理场景需要）
VITE_AUTO_I18N_PROXY_HOST=127.0.0.1
VITE_AUTO_I18N_PROXY_PORT=7890
# 目标语言列表（逗号分隔，例如: en,ja,ko）
VITE_AUTO_I18N_TARGETS=en

# 有道翻译凭据
VITE_YOUDAO_APP_ID=
VITE_YOUDAO_APP_KEY=
# 百度翻译凭据
VITE_BAIDU_APP_ID=
VITE_BAIDU_APP_KEY=
# 火山引擎（翻译/多模态）凭据
VITE_VOLCENGINE_API_KEY=
VITE_VOLCENGINE_MODEL=
```

提示：请勿将 `.env*` 提交到仓库；`lang/` 为自动翻译产物目录，也应忽略提交。
