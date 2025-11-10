# CODEBUDDY.md

This file provides guidance to CodeBuddy Code when working with code in this repository.

## 开发命令

### 常用脚本

- `yarn dev` - 启动Vite开发服务器
- `yarn build` - 类型检查 + 生产构建（含gzip/br压缩、PWA）
- `yarn preview` - 本地预览生产构建
- `yarn lint` - ESLint检查（类型感知，包含no-floating-promises等规则）
- `yarn lint:fix` - 自动修复ESLint问题
- `yarn format` - Prettier格式化代码
- `yarn format:check` - 检查代码格式
- `yarn typecheck` - 基于vue-tsc的严格模板类型检查
- `yarn typecheck:watch` - 监听模式类型检查
- `yarn typecheck:strict` - 严格类型检查（将Warning视为失败）

### 环境配置

环境变量通过`.env.*`文件配置：

- `VITE_API_BASE` - API根路径
- `VITE_API_TIMEOUT` - 请求超时（毫秒）
- `VITE_HTTP_ADAPTER` - 请求适配器（axios或xhr）
- `VITE_ANALYTICS` / `VITE_RRWEB` - 控制rrweb录制
- `VITE_AUTO_I18N` - 自动翻译功能

## 架构概览

### 技术栈

- **前端框架**: Vue 3 + TypeScript + Vite
- **样式**: Tailwind CSS v4 + DaisyUI
- **状态管理**: Pinia
- **路由**: vue-router + vite-plugin-pages（自动路由）
- **请求库**: Alova（支持axios/xhr适配器）
- **可视化**: ECharts、Chart.js、GSAP动画
- **工具**: ESLint(Flat) + Prettier、husky + lint-staged

### 项目结构

```
src/
├── pages/          # 自动路由页面（基于文件结构）
├── layouts/        # 布局组件（默认default.vue）
├── components/     # 可复用组件
│   ├── ui/         # UI基础组件
│   └── charts/     # 图表组件
├── stores/         # Pinia状态管理
├── services/       # API服务（alova.ts）
├── router/         # 路由配置
├── plugins/        # 插件（rrweb录制等）
├── types/          # TypeScript类型定义
└── utils/          # 工具函数
```

### 核心特性

1. **自动路由系统**: 基于`vite-plugin-pages`，文件系统即路由
2. **布局系统**: `vite-plugin-vue-layouts`支持多布局
3. **请求抽象**: Alova提供统一的请求管理
4. **数据分析**: rrweb非侵入式埋点录制
5. **国际化**: 支持自动翻译（开发时可开启）
6. **PWA支持**: 渐进式Web应用能力

<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->
