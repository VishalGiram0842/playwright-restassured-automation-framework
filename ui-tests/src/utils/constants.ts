// Application URLs
export const APP_URLS = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  LOGIN_URL: '/login',
  DASHBOARD_URL: '/dashboard',
  PROFILE_URL: '/profile',
  SETTINGS_URL: '/settings',
};

// Timeouts (in ms)
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  EXTRA_LONG: 15000,
};

// Default test credentials
export const TEST_CREDENTIALS = {
  VALID_EMAIL: process.env.TEST_USER_EMAIL || 'testuser@example.com',
  VALID_PASSWORD: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
  ADMIN_EMAIL: process.env.TEST_ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.TEST_ADMIN_PASSWORD || 'AdminPassword123!',
};

// Browser options
export const BROWSER_OPTIONS = {
  HEADLESS: process.env.HEADLESS !== 'false',
  SLOW_MO: parseInt(process.env.SLOW_MO || '0', 10),
};

// Test data
export const TEST_DATA = {
  VALID_USER: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  },
  INVALID_USER: {
    firstName: '',
    lastName: '',
    email: 'invalid-email',
    phone: '',
  },
};
