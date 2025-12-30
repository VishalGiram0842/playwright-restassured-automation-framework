import { Page } from '@playwright/test';

/**
 * Waits for an element to be visible with retries
 */
export async function waitForElementVisible(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

/**
 * Waits for an element to be hidden with retries
 */
export async function waitForElementHidden(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.locator(selector).waitFor({ state: 'hidden', timeout });
}

/**
 * Get text content from element
 */
export async function getElementText(page: Page, selector: string): Promise<string | null> {
  return await page.locator(selector).textContent();
}

/**
 * Fill form field with value
 */
export async function fillField(page: Page, selector: string, value: string): Promise<void> {
  await page.locator(selector).fill(value);
}

/**
 * Click element and wait for navigation if needed
 */
export async function clickElement(page: Page, selector: string, waitNav: boolean = false): Promise<void> {
  if (waitNav) {
    await Promise.all([
      page.waitForNavigation(),
      page.locator(selector).click(),
    ]);
  } else {
    await page.locator(selector).click();
  }
}

/**
 * Take screenshot and save with timestamp
 */
export async function takeScreenshot(page: Page, name: string): Promise<Buffer | undefined> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return await page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
}

/**
 * Clear browser storage
 */
export async function clearBrowserStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
