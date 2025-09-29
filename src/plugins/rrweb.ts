// rrweb 导出名为 `record` 的方法
import { record } from 'rrweb'

let stopFn: (() => void) | null = null

export function initRRWeb(customOptions: Record<string, any> = {}) {
  // 由环境变量控制：VITE_ANALYTICS 或 VITE_RRWEB
  const enabled =
    import.meta.env['VITE_ANALYTICS'] === 'true' || import.meta.env['VITE_RRWEB'] === 'true'
  if (!enabled || stopFn) return

  const events: any[] = []
  stopFn =
    record({
      emit(event: any) {
        events.push(event)
        // 生产环境建议批量上报到你的采集端点
        // 演示环境仅节流输出到控制台
        if (events.length % 50 === 0) {
          console.log('[rrweb] batch events', events.length)
        }
      },
      maskAllInputs: true,
      inlineStylesheet: true,
      sampling: {
        mousemove: 100,
        scroll: 200,
        media: 400,
        input: 'last',
      },
      ...customOptions,
    }) || null

  // 暴露停止函数以便调试
  if (import.meta.env.DEV) {
    // @ts-expect-error 挂到 window 以便快速调用
    window.__STOP_RRWEB__ = () => {
      stopFn?.()
      stopFn = null
    }
  }
}
