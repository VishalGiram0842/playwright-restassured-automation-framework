import { test, expect } from '@playwright/test';
import { DashboardPage } from '@pages/DashboardPage';
import { test as authenticatedTest } from '@fixtures/auth.fixture';

authenticatedTest.describe('Dashboard Tests', () => {
  let dashboardPage: DashboardPage;

  authenticatedTest.beforeEach(async ({ page, authenticatedPage }) => {
    dashboardPage = new DashboardPage(authenticatedPage);
  });

  authenticatedTest('should display dashboard after login', async ({ authenticatedPage }) => {
    await expect(dashboardPage.mainContent).toBeVisible();
    await expect(dashboardPage.navbar).toBeVisible();
  });

  authenticatedTest('should display user greeting', async () => {
    const greeting = await dashboardPage.getUserGreeting();
    expect(greeting).toBeTruthy();
  });

  authenticatedTest('should navigate to profile page', async () => {
    await dashboardPage.clickProfile();
    await expect(dashboardPage.page).toHaveURL(/\/profile/);
  });

  authenticatedTest('should navigate to settings page', async () => {
    await dashboardPage.clickSettings();
    await expect(dashboardPage.page).toHaveURL(/\/settings/);
  });

  authenticatedTest('should logout successfully', async () => {
    await dashboardPage.clickLogout();
    await expect(dashboardPage.page).toHaveURL(/\/login/);
  });
});
