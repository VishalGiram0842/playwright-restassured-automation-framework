import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login page
    await loginPage.navigateToLogin();
    
    // Perform login
    await loginPage.login(
      process.env.TEST_USER_EMAIL || 'testuser@example.com',
      process.env.TEST_USER_PASSWORD || 'TestPassword123!'
    );
    
    // Verify successful login
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.mainContent).toBeVisible();
    
    // Use the authenticated page
    await use(page);
  },
});

export { expect };
