import { describe, it, expect } from 'vitest'
import { applyThemeToDOM, toggleThemeSimple, saveTheme, getStoredTheme } from '@/utils/themeUtils'

describe('themeUtils', () => {
  it('applyThemeToDOM toggles class and attribute', () => {
    applyThemeToDOM('dark')
    const root = document.documentElement
    expect(root.classList.contains('dark')).toBe(true)
    expect(root.getAttribute('data-theme')).toBe('dark')
  })

  it('toggleThemeSimple flips theme and persists', () => {
    saveTheme('light')
    const next = toggleThemeSimple('light')
    expect(next).toBe('dark')
    expect(getStoredTheme()).toBe('dark')
  })
})
