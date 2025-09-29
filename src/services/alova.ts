import { createAlova } from 'alova'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { xhrRequestAdapter } from '@alova/adapter-xhr'
import axios from 'axios'

const baseURL = import.meta.env['VITE_API_BASE'] ?? '/api'
const timeout = Number(import.meta.env['VITE_API_TIMEOUT'] ?? 15000)
const adapterName = (import.meta.env['VITE_HTTP_ADAPTER'] ?? 'axios').toString()

// 通过环境变量切换适配器：axios | xhr
const requestAdapter = (
  adapterName === 'xhr'
    ? xhrRequestAdapter()
    : axiosRequestAdapter({ axios: axios.create({ baseURL, timeout }) })
) as any

export const alovaInst = createAlova({
  baseURL,
  timeout,
  responded: {
    onSuccess: (response) => (response as any)?.data ?? response,
    onError: (err) => {
      console.error('[alova error]', err)
      throw err
    },
  },
  requestAdapter,
})

export const get = <T = any>(url: string, params?: Record<string, any>) =>
  params !== undefined ? alovaInst.Get<T>(url, { params: params as any }) : alovaInst.Get<T>(url)

export const post = <T = any>(url: string, data?: any) => alovaInst.Post<T>(url, data)
