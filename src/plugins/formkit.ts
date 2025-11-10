import { FormKit, plugin } from '@formkit/vue'

// 创建 FormKit 插件配置
import type { App } from 'vue'

export default {
  install(app: App) {
    // 注册 FormKit 组件
    app.component('FormKit', FormKit)

    // 使用 FormKit 插件
    app.use(plugin, {
      // 配置选项
    })
  },
}
