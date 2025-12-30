import { Page } from '@playwright/test';

export class BasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async waitForSelector(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }
}
