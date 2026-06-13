import { expect, test } from '@nuxt/test-utils/playwright'

test('home page exposes the CoziCraft join path', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'CoziCraft', exact: true })).toBeVisible()
  await expect(page.getByText('play.cozicraftmc.com')).toBeVisible()
  await expect(page.locator('#main-content').getByText('Java 1.21.11', { exact: true }).first()).toBeVisible()
  await expect(page.getByLabel('Primary navigation').getByRole('link', { name: 'Wiki' })).toBeVisible()
})

test('wiki page lists categories and searches public content', async ({ page }) => {
  await page.goto('/wiki')

  await expect(page.getByRole('heading', { name: 'CoziCraft Wiki' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Getting Started/ })).toBeVisible()

  await page.getByPlaceholder('Search wiki, rules, FAQ, and news').fill('claims')
  await expect(page.getByRole('region', { name: 'Search The Server Guide' }).getByRole('link', { name: /Claims/ })).toBeVisible()
})
