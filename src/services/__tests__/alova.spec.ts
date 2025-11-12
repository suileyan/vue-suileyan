import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { get } from '@/services/alova'

const server = setupServer(
  http.get('/api/demo', () => {
    return HttpResponse.json({ data: { ok: true }, code: 200 })
  }),
)

describe('alova services', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  it('get("/demo") returns mocked data', async () => {
    const method = get<{ ok: boolean }>('/demo')
    const data = await method.send()
    expect(data).toEqual({ ok: true })
  })
})
