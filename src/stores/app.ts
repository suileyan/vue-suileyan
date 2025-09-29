import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    user: null as null | { name: string },
    lang: (localStorage.getItem('lang') as 'zhcn' | 'en') || 'zhcn',
    langVersion: 0,
    // 主题切换的视图过渡选项（进入/退出参数可分别配置）
    themeTransition: {
      enabled: true,
      in: { durationMs: 800, easing: 'cubic-bezier(.4,0,.2,1)', radiusScale: 1 },
      out: { durationMs: 800, easing: 'cubic-bezier(.4,0,.2,1)', radiusScale: 1 },
    } as {
      enabled: boolean
      in: { durationMs: number; easing: string; radiusScale: number }
      out: { durationMs: number; easing: string; radiusScale: number }
    },
  }),
  actions: {
    applyThemeTransitionVars() {
      const root = document.documentElement
      // 统一的后备变量（fallback）
      root.style.setProperty('--vt-duration', `${this.themeTransition.in.durationMs}ms`)
      root.style.setProperty('--vt-easing', this.themeTransition.in.easing)
      // 独立的进入/退出变量
      root.style.setProperty('--vt-in-duration', `${this.themeTransition.in.durationMs}ms`)
      root.style.setProperty('--vt-in-easing', this.themeTransition.in.easing)
      root.style.setProperty('--vt-out-duration', `${this.themeTransition.out.durationMs}ms`)
      root.style.setProperty('--vt-out-easing', this.themeTransition.out.easing)
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.theme)
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    toggleThemeWithTransition(e?: MouseEvent) {
      // 若可用则使用 View Transitions API，实现圆形揭示切换
      const hasVT = typeof (document as any).startViewTransition === 'function'

      const x = e?.clientX ?? window.innerWidth / 2
      const y = e?.clientY ?? window.innerHeight / 2
      const endRadiusRaw = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      const endRadiusIn = endRadiusRaw * (this.themeTransition.in.radiusScale || 1)
      const endRadiusOut = endRadiusRaw * (this.themeTransition.out.radiusScale || 1)

      const root = document.documentElement
      root.style.setProperty('--vt-cx', `${x}px`)
      root.style.setProperty('--vt-cy', `${y}px`)
      root.style.setProperty('--vt-r-in', `${endRadiusIn}px`)
      root.style.setProperty('--vt-r-out', `${endRadiusOut}px`)
      this.applyThemeTransitionVars()

      if (hasVT) {
        ;(document as any).startViewTransition(() => {
          this.toggleTheme()
        })
      } else {
        this.toggleTheme()
      }
    },
    setThemeTransition(
      opts: Partial<{
        enabled: boolean
        in: Partial<{ durationMs: number; easing: string; radiusScale: number }>
        out: Partial<{ durationMs: number; easing: string; radiusScale: number }>
      }>,
    ) {
      this.themeTransition = {
        ...this.themeTransition,
        ...opts,
        in: { ...this.themeTransition.in, ...(opts.in || {}) },
        out: { ...this.themeTransition.out, ...(opts.out || {}) },
      }
      this.applyThemeTransitionVars()
    },
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      localStorage.setItem('theme', theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
      document.documentElement.setAttribute('data-theme', theme)
    },
    setLang(lang: 'zhcn' | 'en') {
      this.lang = lang
      try {
        // auto-i18n 运行时 API：即时切换语言
        // @ts-ignore
        window.$changeLang?.(lang)
      } catch (_err) {
        // 有意忽略切换语言时的运行时异常
      }
      localStorage.setItem('lang', lang)
      this.langVersion++
    },
  },
})
