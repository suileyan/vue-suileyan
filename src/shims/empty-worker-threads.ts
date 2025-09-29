// 面向浏览器的安全占位：替代 Node 的 `worker_threads`，用于消除 Vite 外部化警告
// 并防止在客户端误用时的运行时崩溃
// 如调用该占位实现，将抛出清晰的错误提示

export class Worker {
  constructor() {
    throw new Error('worker_threads.Worker is not available in the browser')
  }
}

export const isMainThread = true
export const parentPort = null
export const workerData = undefined as unknown

export default {} as any
