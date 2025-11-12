import { describe, it, expect, vi } from 'vitest'
import { ErrorType, createErrorInfo, handleError, createRetryHandler } from '@/utils/errorHandler'

describe('errorHandler', () => {
  it('createErrorInfo returns correct shape', () => {
    const info = createErrorInfo(ErrorType.API_ERROR, 'fail', 500, { a: 1 })
    expect(info.type).toBe('API_ERROR')
    expect(info.message).toBe('fail')
    expect(info.code).toBe(500)
    expect(info.details).toEqual({ a: 1 })
    expect(typeof info.timestamp).toBe('number')
  })

  it('handleError maps network error', () => {
    const err = new Error('Network unreachable')
    const info = handleError(err, 'test')
    expect(info.type).toBe('NETWORK_ERROR')
  })

  it('handleError maps api error', () => {
    const err = new Error('API 返回错误')
    const info = handleError(err)
    expect(info.type).toBe('API_ERROR')
  })

  it('retry handler retries with exponential backoff and finally throws', async () => {
    const op = vi.fn().mockRejectedValue(new Error('fail'))
    const runner = createRetryHandler(3, 1)
    await expect(runner(op, 'ctx')).rejects.toThrow(/操作失败，已重试3次/)
    expect(op).toHaveBeenCalledTimes(3)
  })
})
