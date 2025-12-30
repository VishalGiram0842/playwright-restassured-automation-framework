import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  readonly userGreeting: Locator;
  readonly logoutButton: Locator;
  readonly profileLink: Locator;
  readonly settingsLink: Locator;
  readonly mainContent: Locator;
  readonly navbar: Locator;
  readonly sidebarMenu: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.userGreeting = page.locator('[data-testid="user-greeting"]');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.profileLink = page.locator('a[href="/profile"]');
    this.settingsLink = page.locator('a[href="/settings"]');
    this.mainContent = page.locator('[data-testid="main-content"]');
    this.navbar = page.locator('[data-testid="navbar"]');
    this.sidebarMenu = page.locator('[data-testid="sidebar"]');
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
  }

  async navigateToDashboard(): Promise<void> {
    await this.page.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async getUserGreeting(): Promise<string | null> {
    return await this.userGreeting.textContent();
  }

  async isMainContentVisible(): Promise<boolean> {
    return await this.mainContent.isVisible();
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickProfile(): Promise<void> {
    await this.profileLink.click();
  }

  async clickSettings(): Promise<void> {
    await this.settingsLink.click();
  }

  async isNavbarVisible(): Promise<boolean> {
    return await this.navbar.isVisible();
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebarMenu.isVisible();
  }

  async getWelcomeMessage(): Promise<string | null> {
    return await this.welcomeMessage.textContent();
  }
}
