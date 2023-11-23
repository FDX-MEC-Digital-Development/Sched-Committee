import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  // expect to have text "ALPA Scheduling Committee" on the page
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'ALPA Scheduling Committee' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('ALPA Scheduling Committee');
  await page.getByRole('navigation').getByRole('link', { name: 'Duty Limits' }).click();
  await expect(page.locator('h3')).toContainText('Duty Limits');
});
