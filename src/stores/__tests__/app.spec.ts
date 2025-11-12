import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAppStore } from '@/stores/app'

describe('app store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('setTheme persists and applies', () => {
    const store = useAppStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('setLang persists and reloads', () => {
    const store = useAppStore()
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})
    store.setLang('en')
    expect(store.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
    expect(reloadSpy).toHaveBeenCalled()
    reloadSpy.mockRestore()
  })
})
