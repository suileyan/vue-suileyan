import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import { xhrRequestAdapter } from '@alova/adapter-xhr';
import axios from 'axios';
import { handleError } from '@/utils/errorHandler';

const baseURL = import.meta.env['VITE_API_BASE'] ?? '/api';
const timeout = Number(import.meta.env['VITE_API_TIMEOUT'] ?? 15000);
const adapterName = (import.meta.env['VITE_HTTP_ADAPTER'] ?? 'axios').toString();

// 定义API响应类型
interface ApiResponse<T = any> {
  data: T;
  code?: number;
  message?: string;
}

// API错误类型定义
interface ApiError extends Error {
  status?: number;
  code?: string;
  // Add a type assertion here to handle different response formats
  [key: string]: any;
}

/**
 * 处理API响应错误
 */
function handleApiError(error: unknown): never {
  // 处理错误并重新抛出
  handleError(error, 'API请求');
  throw new Error(`API请求失败: ${(error as Error).message}`);
}

// 定义请求参数类型
interface RequestParams {
  [key: string]: string | number | boolean | null | undefined;
}

// 创建Alova实例的工厂函数
function createAlovaInstance() {
  if (adapterName === 'xhr') {
    return createAlova({
      baseURL,
      timeout,
      responded: {
        onSuccess: (response: any) => {
          try {
            // Handle XHR response structure
            const responseData: ApiResponse<any> = response;
            if (responseData.code && responseData.code !== 200 && responseData.code !== 0) {
              const error = new Error(responseData.message || 'API返回业务错误') as ApiError;
              error.code = responseData.code?.toString();
              throw error;
            }
            return responseData.data ?? responseData;
          } catch (error) {
            handleApiError(error);
          }
        },
        onError: (error: Error) => {
          handleApiError(error);
        },
      },
      requestAdapter: xhrRequestAdapter(),
    });
  } else {
    return createAlova({
      baseURL,
      timeout,
      responded: {
        onSuccess: (response: any) => {
          try {
            // Handle Axios response structure
            const responseData: ApiResponse<any> = response.data;
            if (responseData.code && responseData.code !== 200 && responseData.code !== 0) {
              const error = new Error(responseData.message || 'API返回业务错误') as ApiError;
              error.code = responseData.code?.toString();
              throw error;
            }
            return responseData.data ?? responseData;
          } catch (error) {
            handleApiError(error);
          }
        },
        onError: (error: Error) => {
          handleApiError(error);
        },
      },
      requestAdapter: axiosRequestAdapter({ axios: axios.create({ baseURL, timeout }) }),
    });
  }
}

const alovaInst = createAlovaInstance();

/**
 * GET请求封装
 */
export function get<T = any>(url: string, params?: RequestParams) {
  if (params !== undefined) {
    return alovaInst.Get<T>(url, { params });
  } else {
    return alovaInst.Get<T>(url);
  }
}

/**
 * POST请求封装
 */
export function post<T = any>(url: string, data?: any) {
  return alovaInst.Post<T>(url, data);
}

/**
 * PUT请求封装
 */
export function put<T = any>(url: string, data?: any) {
  return alovaInst.Put<T>(url, data);
}

/**
 * DELETE请求封装
 */
export function del<T = any>(url: string, params?: RequestParams) {
  if (params !== undefined) {
    return alovaInst.Delete<T>(url, { params });
  } else {
    return alovaInst.Delete<T>(url);
  }
}
