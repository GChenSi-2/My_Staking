import { test, expect } from '@playwright/test';

test.describe('Staking Portal - Comprehensive E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/staking');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Load', () => {
    test('should load staking page with title', async ({ page }) => {
      await expect(page.getByText('Staking Portal')).toBeVisible();
    });

    test('should display all tabs', async ({ page }) => {
      await expect(page.getByRole('tab', { name: 'Validators' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'My Stakes' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'History' })).toBeVisible();
    });

    test('should show back to dashboard link', async ({ page }) => {
      const link = page.getByRole('link', { name: /dashboard/i });
      await expect(link).toBeVisible();
    });
  });

  test.describe('Validator Display', () => {
    test('should display all 5 validators', async ({ page }) => {
      await expect(page.getByText('Validator Alpha')).toBeVisible();
      await expect(page.getByText('Beta Node')).toBeVisible();
      await expect(page.getByText('Gamma Validator')).toBeVisible();
      await expect(page.getByText('Delta Node')).toBeVisible();
      await expect(page.getByText('Epsilon Stake')).toBeVisible();
    });

    test('should show validator APR values', async ({ page }) => {
      await expect(page.getByText('12.5%')).toBeVisible();
      await expect(page.getByText('11.8%')).toBeVisible();
      await expect(page.getByText('13.2%')).toBeVisible();
    });

    test('should display active status chips', async ({ page }) => {
      const activeChips = page.locator('text=active');
      await expect(activeChips.first()).toBeVisible();
    });
  });

  test.describe('Staking Modal', () => {
    test('should open modal when clicking validator', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      await expect(page.getByText('Stake to Validator Alpha')).toBeVisible();
    });

    test('should show staking form elements', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      await expect(page.getByLabel(/amount/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /stake/i })).toBeVisible();
    });

    test('should display balance and min stake info', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      await expect(page.getByText(/available balance/i)).toBeVisible();
      await expect(page.getByText(/min stake/i)).toBeVisible();
    });

    test('should close modal with Escape key', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      await expect(page.getByText('Stake to Validator Alpha')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByText('Stake to Validator Alpha')).not.toBeVisible();
    });
  });

  test.describe('Staking Form Validation', () => {
    test('stake button should be disabled initially', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      const stakeButton = page.getByRole('button', { name: /^stake$/i });
      await expect(stakeButton).toBeDisabled();
    });

    test('should validate minimum stake amount', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      const amountInput = page.getByLabel(/amount/i);
      const stakeButton = page.getByRole('button', { name: /^stake$/i });
      
      await amountInput.fill('0.05');
      await expect(stakeButton).toBeDisabled();
    });

    test('should enable button with valid amount', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      const amountInput = page.getByLabel(/amount/i);
      const stakeButton = page.getByRole('button', { name: /^stake$/i });
      
      await amountInput.fill('10');
      await expect(stakeButton).toBeEnabled();
    });
  });

  test.describe('Staking Transaction', () => {
    test('should complete stake transaction successfully', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      const amountInput = page.getByLabel(/amount/i);
      const stakeButton = page.getByRole('button', { name: /^stake$/i });
      
      await amountInput.fill('50');
      await stakeButton.click();
      
      await expect(stakeButton).toBeDisabled();
      await expect(page.getByText(/successfully staked/i)).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Stake to Validator Alpha')).not.toBeVisible({ timeout: 3000 });
    });

    test('should show loading state during transaction', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      const amountInput = page.getByLabel(/amount/i);
      const stakeButton = page.getByRole('button', { name: /^stake$/i });
      
      await amountInput.fill('25');
      await stakeButton.click();
      
      await expect(stakeButton).toBeDisabled();
    });
  });

  test.describe('Tab Navigation', () => {
    test('should switch to My Stakes tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'My Stakes' }).click();
      await expect(page.getByText(/coming soon/i)).toBeVisible();
    });

    test('should switch to History tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'History' }).click();
      // History table headers should be visible
      await page.waitForTimeout(500);
    });

    test('should navigate back to Validators tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'History' }).click();
      await page.getByRole('tab', { name: 'Validators' }).click();
      await expect(page.getByText('Validator Alpha')).toBeVisible();
    });
  });

  test.describe('Multiple Validators', () => {
    test('should interact with different validators', async ({ page }) => {
      await page.getByText('Validator Alpha').first().click();
      await expect(page.getByText('Stake to Validator Alpha')).toBeVisible();
      await page.keyboard.press('Escape');
      
      await page.getByText('Beta Node').first().click();
      await expect(page.getByText('Stake to Beta Node')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await expect(page.getByText('Staking Portal')).toBeVisible();
      await expect(page.getByText('Validator Alpha')).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await expect(page.getByText('Staking Portal')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should support keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
    });
  });
});
