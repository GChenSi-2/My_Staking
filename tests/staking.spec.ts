import { test, expect } from '@playwright/test';

test.describe('Staking Portal', () => {
  test('should display validators', async ({ page }) => {
    await page.goto('http://localhost:3000/staking');
    await expect(page.getByText('Staking Portal')).toBeVisible();
    await expect(page.getByText('Validator Alpha')).toBeVisible();
  });

  test('should open stake modal on validator click', async ({ page }) => {
    await page.goto('http://localhost:3000/staking');
    await page.getByText('Validator Alpha').click();
    await expect(page.getByText('Stake to Validator Alpha')).toBeVisible();
  });
});
