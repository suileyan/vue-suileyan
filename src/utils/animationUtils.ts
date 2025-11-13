/**
 * 动画工具函数
 * 集中管理动画配置和工具函数，减少重复代码
 */

import { gsap } from 'gsap';

// 默认动画配置
export const DEFAULT_ANIMATION_CONFIG = {
  ease: 'power3.out',
  duration: 0.6,
  opacity: 0,
} as const;

/**
 * 创建渐入动画时间线
 */
export function createFadeInTimeline(
  elements: (gsap.TweenTarget | null)[],
  config: {
    y?: number;
    x?: number;
    scale?: number;
    stagger?: number;
    ease?: string;
    duration?: number;
  } = {},
): gsap.core.Timeline {
  const timeline = gsap.timeline({
    defaults: {
      ease: config.ease || DEFAULT_ANIMATION_CONFIG.ease,
      duration: config.duration || DEFAULT_ANIMATION_CONFIG.duration,
      opacity: 0,
    },
  });

  // 过滤掉null元素
  const validElements = elements.filter((el) => el !== null) as gsap.TweenTarget[];

  // 如果有多个元素且需要错开动画
  if (validElements.length > 1 && config.stagger) {
    timeline.from(validElements, {
      y: config.y || 20,
      x: config.x || 0,
      scale: config.scale || 1,
      stagger: config.stagger,
    });
  } else {
    // 单个元素或同时动画
    validElements.forEach((el, index) => {
      const delay =
        index > 0 ? `-=${config.duration || DEFAULT_ANIMATION_CONFIG.duration * 0.3}` : 0;

      timeline.from(
        el,
        {
          y: config.y || 20,
          x: config.x || 0,
          scale: config.scale || 1,
        },
        delay,
      );
    });
  }

  return timeline;
}

/**
 * 创建页面加载动画
 */
export function createPageLoadAnimation(
  titleElement: gsap.TweenTarget | null,
  cardElement: gsap.TweenTarget | null,
  orbElement: gsap.TweenTarget | null,
): void {
  if (!titleElement || !cardElement || !orbElement) return;

  const timeline = createFadeInTimeline([titleElement, cardElement], {
    y: 20,
    stagger: 0.2,
  });

  timeline.from(
    orbElement,
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
    },
    '-=0.6',
  );
}

/**
 * 创建悬停动画
 */
export function createHoverAnimation(
  element: gsap.TweenTarget,
  config: {
    scale?: number;
    y?: number;
    duration?: number;
    ease?: string;
  } = {},
): {
  onEnter: () => void;
  onLeave: () => void;
} {
  const hoverScale = config.scale || 1.05;
  const hoverY = config.y || -2;
  const duration = config.duration || 0.3;
  const ease = config.ease || 'power2.out';

  return {
    onEnter: () => {
      gsap.to(element, {
        scale: hoverScale,
        y: hoverY,
        duration,
        ease,
      });
    },
    onLeave: () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration,
        ease,
      });
    },
  };
}

/**
 * 创建脉冲动画
 */
export function createPulseAnimation(
  element: gsap.TweenTarget,
  config: {
    scale?: number;
    duration?: number;
    repeat?: number;
  } = {},
): gsap.core.Tween {
  return gsap.to(element, {
    scale: config.scale || 1.1,
    duration: config.duration || 0.5,
    repeat: config.repeat || -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/**
 * 创建滑动出现动画
 */
export function createSlideInAnimation(
  element: gsap.TweenTarget,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  config: {
    distance?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {},
): gsap.core.Tween {
  const distance = config.distance || 50;
  const duration = config.duration || 0.6;
  const delay = config.delay || 0;
  const ease = config.ease || 'power3.out';

  let x = 0;
  let y = 0;

  switch (direction) {
    case 'left':
      x = -distance;
      break;
    case 'right':
      x = distance;
      break;
    case 'top':
      y = -distance;
      break;
    case 'bottom':
      y = distance;
      break;
  }

  return gsap.from(element, {
    x,
    y,
    opacity: 0,
    duration,
    delay,
    ease,
  });
}
