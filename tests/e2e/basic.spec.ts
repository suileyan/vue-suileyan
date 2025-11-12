import { test, expect } from '@playwright/test'

test('首页渲染与导航', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('link', { name: '首页' })).toBeVisible()
  await page.getByRole('link', { name: '关于' }).click()
  await expect(page.getByText('关于')).toBeVisible()
})

test('Vue I18n 示例', async ({ page }) => {
  await page.goto('./i18n')
  await expect(page.getByText('I18n 示例')).toBeVisible()
  await expect(page.getByText(/Hello|你好/)).toBeVisible()
})

test('HTTP 示例页面存在', async ({ page }) => {
  await page.goto('./http-demo')
  await expect(page.getByText('HTTP 示例')).toBeVisible()
})
