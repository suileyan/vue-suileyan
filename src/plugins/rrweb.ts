// rrweb 导出名为 `record` 的方法
import { record } from 'rrweb';
import { handleError } from '@/utils/errorHandler';

let stopFn: (() => void) | null = null;

// 定义rrweb事件类型
interface RrwebEvent {
  type: number;
  data: unknown;
  timestamp: number;
}

// 定义rrweb配置选项类型
interface RrwebOptions {
  emit?: (e: unknown, isCheckout?: boolean) => void;
  maskAllInputs?: boolean;
  inlineStylesheet?: boolean;
  sampling?: {
    mousemove?: number;
    scroll?: number;
    media?: number;
    input?: 'last' | 'all';
  };
}

export function initRRWeb(customOptions: RrwebOptions = {}) {
  try {
    // 由环境变量控制：VITE_ANALYTICS 或 VITE_RRWEB
    const enabled =
      import.meta.env['VITE_ANALYTICS'] === 'true' || import.meta.env['VITE_RRWEB'] === 'true';
    if (!enabled || stopFn) return;

    const events: RrwebEvent[] = [];
    stopFn =
      record({
        emit(event: RrwebEvent) {
          events.push(event);
          // 生产环境建议批量上报到你的采集端点
          // 演示环境仅节流输出到控制台
          if (events.length % 50 === 0) {
            console.log('[rrweb] batch events', events.length);
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
      }) || null;

    // 暴露停止函数以便调试
    if (import.meta.env.DEV) {
      // 挂到 window 以便快速调用
      (window as any).__STOP_RRWEB__ = () => {
        stopFn?.();
        stopFn = null;
        console.log('[rrweb] 录制已停止');
      };
    }
  } catch (error) {
    console.error('[rrweb] 初始化失败:', error);
    handleError(error, 'rrweb初始化');
  }
}
