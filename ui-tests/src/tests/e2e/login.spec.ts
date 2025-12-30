import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLogin();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await loginPage.login('testuser@example.com', 'TestPassword123!');
    await expect(dashboardPage.mainContent).toBeVisible();
  });

  test('should display error message with invalid email', async () => {
    await loginPage.enterEmail('invalid-email');
    await loginPage.enterPassword('TestPassword123!');
    await loginPage.clickLogin();
    
    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
  });

  test('should display error message with wrong password', async () => {
    await loginPage.enterEmail('testuser@example.com');
    await loginPage.enterPassword('WrongPassword123!');
    await loginPage.clickLogin();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should navigate to signup page', async () => {
    await loginPage.clickSignup();
    await expect(loginPage.page).toHaveURL(/\/signup/);
  });

  test('should navigate to forgot password page', async () => {
    await loginPage.clickForgotPassword();
    await expect(loginPage.page).toHaveURL(/\/forgot-password/);
  });
});
