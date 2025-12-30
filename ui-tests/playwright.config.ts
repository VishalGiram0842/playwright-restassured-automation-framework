import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'test-results/html' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // Multi-browser testing with all installed binaries
  projects: [
    // Chromium - Default, recommended for testing
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Firefox - Alternative engine for cross-browser testing
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    // WebKit - Safari-based engine for cross-browser testing
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  
  // Web server configuration for local development
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
