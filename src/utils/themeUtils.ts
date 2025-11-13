/**
 * 主题切换工具函数
 * 集中管理主题相关的操作，减少代码重复
 */

// 主题类型定义
export type ThemeType = 'light' | 'dark';

// 默认主题切换过渡配置
export const DEFAULT_THEME_TRANSITION = {
  enabled: true,
  in: { durationMs: 800, easing: 'cubic-bezier(.4,0,.2,1)', radiusScale: 1 },
  out: { durationMs: 800, easing: 'cubic-bezier(.4,0,.2,1)', radiusScale: 1 },
} as const;

/**
 * 从localStorage获取存储的主题
 */
export function getStoredTheme(): ThemeType {
  const stored = localStorage.getItem('theme') as ThemeType;
  return stored || 'light';
}

/**
 * 保存主题到localStorage
 */
export function saveTheme(theme: ThemeType): void {
  localStorage.setItem('theme', theme);
}

/**
 * 应用主题到DOM元素
 */
export function applyThemeToDOM(theme: ThemeType): void {
  const root = document.documentElement;

  // 切换dark类名
  root.classList.toggle('dark', theme === 'dark');

  // 设置data-theme属性
  root.setAttribute('data-theme', theme);
}

/**
 * 应用主题过渡动画参数到CSS变量
 */
export function applyThemeTransitionVars(transition: typeof DEFAULT_THEME_TRANSITION): void {
  const root = document.documentElement;

  // 统一的后备变量
  root.style.setProperty('--vt-duration', `${transition.in.durationMs}ms`);
  root.style.setProperty('--vt-easing', transition.in.easing);

  // 独立的进入/退出变量
  root.style.setProperty('--vt-in-duration', `${transition.in.durationMs}ms`);
  root.style.setProperty('--vt-in-easing', transition.in.easing);
  root.style.setProperty('--vt-out-duration', `${transition.out.durationMs}ms`);
  root.style.setProperty('--vt-out-easing', transition.out.easing);
}

/**
 * 设置View Transitions动画的几何参数
 */
export function setViewTransitionGeometry(
  event: MouseEvent | null,
  radiusScale: { in: number; out: number },
): void {
  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;

  const endRadiusRaw = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const endRadiusIn = endRadiusRaw * radiusScale.in;
  const endRadiusOut = endRadiusRaw * radiusScale.out;

  const root = document.documentElement;
  root.style.setProperty('--vt-cx', `${x}px`);
  root.style.setProperty('--vt-cy', `${y}px`);
  root.style.setProperty('--vt-r-in', `${endRadiusIn}px`);
  root.style.setProperty('--vt-r-out', `${endRadiusOut}px`);
}

/**
 * 执行带View Transitions的主题切换
 */
export function toggleThemeWithTransition(
  currentTheme: ThemeType,
  transition: typeof DEFAULT_THEME_TRANSITION,
  event?: MouseEvent,
): ThemeType {
  const newTheme: ThemeType = currentTheme === 'light' ? 'dark' : 'light';

  // 设置几何参数
  setViewTransitionGeometry(event || null, {
    in: transition.in.radiusScale || 1,
    out: transition.out.radiusScale || 1,
  });

  // 应用过渡变量
  applyThemeTransitionVars(transition);

  // 执行切换
  const hasVT = typeof (document as any).startViewTransition === 'function';

  if (hasVT && transition.enabled) {
    (document as any).startViewTransition(() => {
      applyThemeToDOM(newTheme);
      saveTheme(newTheme);
    });
  } else {
    applyThemeToDOM(newTheme);
    saveTheme(newTheme);
  }

  return newTheme;
}

/**
 * 简单的主题切换（无过渡动画）
 */
export function toggleThemeSimple(currentTheme: ThemeType): ThemeType {
  const newTheme: ThemeType = currentTheme === 'light' ? 'dark' : 'light';

  applyThemeToDOM(newTheme);
  saveTheme(newTheme);

  return newTheme;
}
