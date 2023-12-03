import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Sidebar', async ({ page }) => {
    await page.goto('/');
    // expect to have text "ALPA Scheduling Committee" on the page
    await expect(page.getByRole('heading', { name: 'ALPA Scheduling Committee' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('ALPA Scheduling Committee');
    await page.locator('nav').getByRole('link', { name: 'Duty Limits' }).click();
    await expect(page.getByLabel('title-section').locator('div').locator('h3')).toContainText('Duty Limits');
    await page.getByRole('link', { name: 'Fatigue' }).click();

    await page.getByRole('link', { name: 'Fatigue' }).click();
    await expect(page.getByLabel('content-Fatigue Self-Assessment')).toContainText('Fatigue Self-Assessment');
  });

  test('Home page nav', async ({ page }) => {
    await page.goto('/');
    // expect to have text "ALPA Scheduling Committee" on the page
    await expect(page.getByRole('heading', { name: 'ALPA Scheduling Committee' })).toBeVisible();
    await page.locator('main').getByRole('link', { name: 'Duty Limits' }).click();
    await expect(page.getByLabel('title-section').locator('div').locator('h3')).toContainText('Duty Limits');
    await page.getByRole('link', { name: 'Fatigue' }).click();
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'ALPA Scheduling Committee' })).toBeVisible();

    await page.locator('main').getByRole('link', { name: 'Fatigue' }).click();
    await expect(page.getByLabel('content-Fatigue Self-Assessment')).toContainText('Fatigue Self-Assessment');
  });
});
test.describe('Duty limits', () => {
  test('Domestic duty limit', async ({ page }) => {
    await page.goto('/dutyLimits');
    await page.getByLabel('Datepicker input').first().click();
    await page.getByLabel('Open years overlay').click();
    await page.getByText('2030').click();
    await page.getByLabel('Open months overlay').click();
    await page.getByText('Jun').click();
    await page.getByText('15').click();
    await page.getByLabel('Datepicker input').nth(1).click();
    await page.getByLabel('Increment hours').click();
    await page.getByLabel('Increment minutes').click();
    await page.getByLabel('Open hours overlay').click();
    await page.getByText('12', { exact: true }).click();
    await page.getByLabel('Open minutes overlay').click();
    await page.getByText('30').click();
    await page.getByLabel('Domicile').click();
    await page.getByRole('option', { name: 'IND' }).click();
    await page.getByRole('button', { name: 'View Duty Limits' }).click();
    await expect(page.getByLabel('based on date')).toContainText('06-15-30 12:30Z');
    await expect(page.getByLabel('day night or critical')).toContainText('day');
    await expect(page.getByLabel('duty limit type')).toContainText('non-blended');
    await expect(page.getByLabel('based on lbt')).toContainText('0730 LBT');

    await expect(page.getByLabel('title Scheduled duty limit').locator('dd')).toContainText('13 hours');
    await expect(page.getByLabel('title Operational duty limit').locator('dd')).toContainText('14:30 hours');
    await expect(page.getByLabel('title FAR duty limit').locator('dd')).toContainText('16 hours');
    await expect(page.getByLabel('duty end time Scheduled duty')).toContainText('06-16-30 01:30Z');
    await expect(page.getByLabel('duty end time Operational')).toContainText('06-16-30 03:00Z');
    await expect(page.getByLabel('duty end time FAR duty limit')).toContainText('06-16-30 04:30Z');
  });

  test('International duty limit grid', async ({ page }) => {
    await page.goto('/dutyLimits');
    await page.getByLabel('Datepicker input').first().click();
    await page.getByLabel('Open years overlay').click();
    await page.getByText('2030').click();
    await page.getByLabel('Open months overlay').click();
    await page.getByText('May').click();
    await page.getByText('16').click();
    await page.getByLabel('Datepicker input').nth(1).click();
    await page.getByLabel('Open hours overlay').click();
    await page.getByText('10', { exact: true }).click();
    await page.getByLabel('Open minutes overlay').click();
    await page.getByRole('gridcell', { name: '10' }).locator('div').click();
    await page.locator('.space-y-6 > div:nth-child(2) > div').first().click();
    await page.getByLabel('International').click();
    await page.getByLabel('Number of Pilots').selectOption('3');
    await page.getByRole('button', { name: 'View Duty Limits' }).click();
    await expect(page.getByLabel('duty end time Scheduled duty')).toContainText('05-16-30 23:40Z');
    await expect(page.getByLabel('grid or not grid')).toContainText('grid');
  });

  test('International duty limit non-grid', async ({ page }) => {
    await page.goto('/dutyLimits');
    await page.getByLabel('International').click();
    await page.getByRole('button', { name: 'View Duty Limits' }).click();
    await expect(page.getByLabel('time remaining Scheduled duty limit')).toContainText('in 13 hours');
    await expect(page.getByLabel('time remaining Operational duty limit')).toContainText('in 15 hours');
  });
});
