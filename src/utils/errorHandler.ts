/**
 * 统一错误处理工具
 * 提供标准的错误处理、用户提示和日志记录
 */

// 错误类型定义
export const ErrorType = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

type ErrorTypeType = keyof typeof ErrorType;

// 错误信息接口
export interface ErrorInfo {
  type: ErrorTypeType;
  message: string;
  code?: number | undefined;
  details?: unknown;
  timestamp: number;
}

// 用户友好错误消息映射
const USER_FRIENDLY_MESSAGES: Record<ErrorTypeType, string> = {
  [ErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络设置后重试',
  [ErrorType.API_ERROR]: '服务器请求失败，请稍后重试',
  [ErrorType.VALIDATION_ERROR]: '输入数据有误，请检查后重试',
  [ErrorType.UNKNOWN_ERROR]: '系统繁忙，请稍后重试',
};

/**
 * 创建错误信息对象
 */
export function createErrorInfo(
  type: ErrorTypeType,
  message: string,
  code?: number,
  details?: unknown,
): ErrorInfo {
  return {
    type,
    message,
    code: code ?? undefined,
    details,
    timestamp: Date.now(),
  };
}

/**
 * 显示用户友好的错误提示
 */
export function showUserFriendlyError(errorType: ErrorTypeType): void {
  const message = USER_FRIENDLY_MESSAGES[errorType];

  // 在实际项目中，这里可以集成通知组件
  console.warn(`[用户提示] ${message}`);

  // 可以在这里添加UI通知系统的集成
  // 例如: notify.error(message)
}

/**
 * 记录错误到日志系统
 */
export function logError(errorInfo: ErrorInfo, context?: string): void {
  const logEntry = {
    ...errorInfo,
    context: context || 'unknown',
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // 开发环境输出到控制台
  if (import.meta.env.DEV) {
    console.error('[错误日志]', logEntry);
  }

  // 生产环境可以发送到错误收集服务
  // 例如: sendToErrorService(logEntry)
}

/**
 * 统一的错误处理函数
 */
export function handleError(error: unknown, context?: string): ErrorInfo {
  let errorInfo: ErrorInfo;

  if (error instanceof Error) {
    // 网络错误
    if (error.name === 'NetworkError' || error.message.includes('Network')) {
      errorInfo = createErrorInfo(ErrorType.NETWORK_ERROR, error.message);
    }
    // API错误
    else if (error.message.includes('API') || error.message.includes('请求')) {
      errorInfo = createErrorInfo(ErrorType.API_ERROR, error.message);
    }
    // 其他错误
    else {
      errorInfo = createErrorInfo(ErrorType.UNKNOWN_ERROR, error.message);
    }
  } else {
    errorInfo = createErrorInfo(ErrorType.UNKNOWN_ERROR, '未知错误');
  }

  // 记录错误
  logError(errorInfo, context);

  // 显示用户友好提示
  showUserFriendlyError(errorInfo.type);

  return errorInfo;
}

/**
 * 创建带重试机制的错误处理
 */
export function createRetryHandler(maxRetries: number = 3, delay: number = 1000) {
  return async <T>(operation: () => Promise<T>, context?: string): Promise<T> => {
    let lastError: ErrorInfo | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = handleError(error, context);

        if (attempt < maxRetries) {
          console.warn(`[重试] 第${attempt}次失败，${delay}ms后重试...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // 指数退避
        }
      }
    }

    throw new Error(`操作失败，已重试${maxRetries}次: ${lastError?.message}`);
  };
}
