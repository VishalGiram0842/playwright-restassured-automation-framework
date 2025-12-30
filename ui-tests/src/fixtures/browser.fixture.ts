import { test as base, BrowserContext } from '@playwright/test';

type BrowserFixture = {
  context: BrowserContext;
};

export const test = base.extend<BrowserFixture>({
  context: async ({ browser }, use) => {
    // Create a new context with specific settings
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      locale: 'en-US',
      timezoneId: 'America/New_York',
    });

    // Add network logging
    context.on('request', (request) => {
      if (process.env.DEBUG === 'true') {
        console.log('Request:', request.url());
      }
    });

    context.on('response', (response) => {
      if (process.env.DEBUG === 'true') {
        console.log('Response:', response.url(), response.status());
      }
    });

    // Use the context
    await use(context);

    // Cleanup
    await context.close();
  },
});

export { expect } from '@playwright/test';
