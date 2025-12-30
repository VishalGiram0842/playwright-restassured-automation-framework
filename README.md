# Playwright + REST Assured - UI & API Automation Framework

A comprehensive test automation framework combining **TypeScript + Playwright** for UI automation and **Java + REST Assured** for API testing. This framework demonstrates best practices for enterprise-grade UI and API test automation with modular architecture, reusable utilities, and CI/CD integration.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [UI Testing with Playwright (TypeScript)](#ui-testing-with-playwright-typescript)
- [API Testing with REST Assured (Java)](#api-testing-with-rest-assured-java)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
playwright-restassured-framework/
│
├── ui-tests/                           # Playwright TypeScript UI Tests
│   ├── src/
│   │   ├── tests/
│   │   │   ├── e2e/
│   │   │   │   ├── login.spec.ts
│   │   │   │   ├── dashboard.spec.ts
│   │   │   │   └── user-profile.spec.ts
│   │   │   └── api-integration/
│   │   │       └── api-ui-flow.spec.ts
│   │   ├── pages/                      # Page Object Model
│   │   │   ├── BasePage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   └── UserProfilePage.ts
│   │   ├── utils/
│   │   │   ├── helpers.ts
│   │   │   ├── constants.ts
│   │   │   ├── test-data.ts
│   │   │   └── logger.ts
│   │   ├── fixtures/
│   │   │   ├── auth.fixture.ts         # Reusable auth fixture
│   │   │   └── browser.fixture.ts
│   │   └── api/
│   │       ├── api-client.ts           # Playwright request context wrapper
│   │       └── endpoints.ts
│   ├── playwright.config.ts            # Playwright configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── api-tests-restassured/              # REST Assured Java API Tests
│   ├── src/
│   │   ├── test/
│   │   │   ├── java/com/framework/
│   │   │   │   ├── tests/
│   │   │   │   │   ├── UserApiTest.java
│   │   │   │   │   ├── AuthApiTest.java
│   │   │   │   │   └── ContractTest.java
│   │   │   │   ├── utils/
│   │   │   │   │   ├── ApiClient.java
│   │   │   │   │   ├── TestDataBuilder.java
│   │   │   │   │   ├── JsonSchemaValidator.java
│   │   │   │   │   └── ApiConstants.java
│   │   │   │   ├── models/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   └── LoginResponse.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── EnvironmentConfig.java
│   │   │   │   │   └── ApiConfig.java
│   │   │   │   ├── listeners/
│   │   │   │   │   └── TestListener.java
│   │   │   │   └── base/
│   │   │   │       └── BaseApiTest.java
│   │   │   └── resources/
│   │   │       ├── schemas/
│   │   │       │   ├── user-schema.json
│   │   │       │   └── login-schema.json
│   │   │       ├── testdata/
│   │   │       │   └── test-users.json
│   │   │       └── application.properties
│   ├── pom.xml
│   ├── .env.example
│   └── README.md
│
├── .github/
│   └── workflows/
│       ├── ui-tests.yml
│       ├── api-tests.yml
│       └── combined-tests.yml
│
├── docker/
│   ├── Dockerfile.ui
│   └── Dockerfile.api
│
└── README.md (this file)
```

---

## 🛠️ Tech Stack

### UI Testing
- **Playwright** - Cross-browser automation
- **TypeScript** - Type-safe scripting
- **Page Object Model** - Maintainable test structure
- **Fixtures** - Reusable test setup (browser, auth, etc.)

### API Testing
- **REST Assured** - RESTful API testing library
- **TestNG** - Test framework
- **JSON Schema Validation** - Contract testing
- **Lombok** - Reduce boilerplate
- **Jackson** - JSON serialization

### Build & CI/CD
- **Maven** - Java dependency management
- **npm/yarn** - Node dependency management
- **GitHub Actions** - CI/CD automation
- **Docker** - Containerized test execution

---

## 📦 Prerequisites

- **Node.js** `v18+` (for Playwright/TypeScript)
- **Java** `11+` (for REST Assured)
- **Maven** `3.8+`
- **npm** or **yarn**
- **Git**
- IDE: VS Code or IntelliJ IDEA

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/playwright-restassured-framework.git
cd playwright-restassured-framework
```

### 2. Set Up Playwright UI Tests (TypeScript)

```bash
cd ui-tests

# Install dependencies
npm install
# or
yarn install

# Install Playwright browsers
npx playwright install

# Create .env file from template
cp .env.example .env

# Edit .env with your configuration
# BASE_URL=https://staging.example.com
# API_BASE_URL=https://api.staging.example.com
# USERNAME=test_user
# PASSWORD=test_password
```

### 3. Set Up REST Assured API Tests (Java)

```bash
cd ../api-tests-restassured

# Create .env file
cp .env.example .env

# Update properties
# Edit src/test/resources/application.properties with API endpoints
```

## 🍫 UI Testing with Playwright (TypeScript)

### File Structure Overview

**`playwright.config.ts`** - Main configuration file

```typescript
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
  ],
  
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### Page Object Model Example

**`src/pages/LoginPage.ts`**

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('/dashboard');
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}
```

### Fixtures for Reusable Setup

**`src/fixtures/auth.fixture.ts`**

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USERNAME || 'test_user',
      process.env.TEST_PASSWORD || 'test_password'
    );
    await use();
  },
});

export { expect } from '@playwright/test';
```

### Test Example - UI Only

**`src/tests/e2e/login.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('testuser@example.com', 'Password@123');
    
    // Verify redirection to dashboard
    expect(page.url()).toContain('/dashboard');
  });

  test('should display error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'WrongPassword');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Invalid credentials');
  });
});
```

### Test Example - API + UI Integration

**`src/tests/api-integration/api-ui-flow.spec.ts`**

```typescript
import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../api/api-client';

test.describe('API + UI Integration', () => {
  test('should login via API then verify UI state', async ({ page }) => {
    const apiClient = new ApiClient(page);

    // Step 1: Login via API
    const loginResponse = await apiClient.post('/auth/login', {
      username: 'testuser@example.com',
      password: 'Password@123',
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Step 2: Navigate to dashboard with token
    await page.goto('/dashboard', { waitUntil: 'networkidle' });

    // Step 3: Verify API data is displayed in UI
    const dashboardData = await apiClient.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(dashboardData.status()).toBe(200);
    const userData = await dashboardData.json();

    // Verify UI shows the correct user info
    const userNameElement = page.locator(`text=${userData.firstName} ${userData.lastName}`);
    await expect(userNameElement).toBeVisible();
  });
});
```

### API Client Wrapper for Playwright

**`src/api/api-client.ts`**

```typescript
import { Page, APIRequestContext } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(page: Page) {
    this.request = page.request;
    this.baseURL = process.env.API_BASE_URL || 'https://api.example.com';
  }

  async get(endpoint: string, options = {}) {
    return await this.request.get(`${this.baseURL}${endpoint}`, options);
  }

  async post(endpoint: string, data: any, options = {}) {
    return await this.request.post(`${this.baseURL}${endpoint}`, { data, ...options });
  }

  async put(endpoint: string, data: any, options = {}) {
    return await this.request.put(`${this.baseURL}${endpoint}`, { data, ...options });
  }

  async delete(endpoint: string, options = {}) {
    return await this.request.delete(`${this.baseURL}${endpoint}`, options);
  }
}
```

## 🔌 API Testing with REST Assured (Java)

### Base Test Class

**`src/test/java/com/framework/base/BaseApiTest.java`**

```java
package com.framework.base;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.testng.annotations.BeforeSuite;
import com.framework.config.EnvironmentConfig;
import com.framework.utils.ApiClient;

public class BaseApiTest {
    
    protected ApiClient apiClient;
    protected String baseUri;
    protected String token;

    @BeforeSuite
    public void setUp() {
        baseUri = EnvironmentConfig.getBaseUrl();
        RestAssured.baseURI = baseUri;
        RestAssured.basePath = "/api/v1";
        RestAssured.defaultParser = io.restassured.parsing.Parser.JSON;
        apiClient = new ApiClient();
    }

    protected void setAuthToken(String token) {
        this.token = token;
    }
}
```

### API Client Utility

**`src/test/java/com/framework/utils/ApiClient.java`**

```java
package com.framework.utils;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class ApiClient {

    private static final String CONTENT_TYPE = "application/json";

    public Response get(String endpoint, String token) {
        return RestAssured.given()
            .header("Authorization", "Bearer " + token)
            .contentType(CONTENT_TYPE)
            .when()
            .get(endpoint);
    }

    public Response post(String endpoint, Object body, String token) {
        return RestAssured.given()
            .header("Authorization", "Bearer " + token)
            .contentType(CONTENT_TYPE)
            .body(body)
            .when()
            .post(endpoint);
    }

    public Response post(String endpoint, Object body) {
        return RestAssured.given()
            .contentType(CONTENT_TYPE)
            .body(body)
            .when()
            .post(endpoint);
    }

    public Response put(String endpoint, Object body, String token) {
        return RestAssured.given()
            .header("Authorization", "Bearer " + token)
            .contentType(CONTENT_TYPE)
            .body(body)
            .when()
            .put(endpoint);
    }

    public Response delete(String endpoint, String token) {
        return RestAssured.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .delete(endpoint);
    }
}
```

### Test Example - User API

**`src/test/java/com/framework/tests/UserApiTest.java`**

```java
package com.framework.tests;

import io.restassured.response.Response;
import org.testng.annotations.Test;
import static org.hamcrest.Matchers.*;
import com.framework.base.BaseApiTest;
import com.framework.models.User;

public class UserApiTest extends BaseApiTest {

    @Test(priority = 1)
    public void testGetAllUsers() {
        Response response = apiClient.get("/users", token);
        
        response.then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].id", notNullValue())
            .body("[0].email", matchesPattern(".*@.*\\..*"));
    }

    @Test(priority = 2)
    public void testGetUserById() {
        Response response = apiClient.get("/users/1", token);
        
        response.then()
            .statusCode(200)
            .body("id", equalTo(1))
            .body("firstName", notNullValue())
            .body("lastName", notNullValue())
            .body("email", notNullValue());
    }

    @Test(priority = 3)
    public void testCreateUser() {
        User user = new User("John", "Doe", "john.doe@example.com");
        
        Response response = apiClient.post("/users", user);
        
        response.then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("firstName", equalTo("John"))
            .body("lastName", equalTo("Doe"))
            .body("email", equalTo("john.doe@example.com"));
    }

    @Test(priority = 4)
    public void testUpdateUser() {
        User updatedUser = new User("Jane", "Doe", "jane.doe@example.com");
        
        Response response = apiClient.put("/users/1", updatedUser, token);
        
        response.then()
            .statusCode(200)
            .body("firstName", equalTo("Jane"))
            .body("email", equalTo("jane.doe@example.com"));
    }

    @Test(priority = 5)
    public void testDeleteUser() {
        Response response = apiClient.delete("/users/1", token);
        
        response.then()
            .statusCode(204);
    }
}
```

### Test Example - Authentication

**`src/test/java/com/framework/tests/AuthApiTest.java`**

```java
package com.framework.tests;

import io.restassured.response.Response;
import org.testng.annotations.Test;
import static org.hamcrest.Matchers.*;
import com.framework.base.BaseApiTest;
import com.framework.models.LoginRequest;

public class AuthApiTest extends BaseApiTest {

    @Test(priority = 1)
    public void testLoginWithValidCredentials() {
        LoginRequest loginRequest = new LoginRequest("test@example.com", "Password@123");
        
        Response response = apiClient.post("/auth/login", loginRequest);
        
        response.then()
            .statusCode(200)
            .body("token", notNullValue())
            .body("user.id", notNullValue())
            .body("user.email", equalTo("test@example.com"));
        
        // Extract token for subsequent requests
        String token = response.jsonPath().getString("token");
        setAuthToken(token);
    }

    @Test(priority = 2)
    public void testLoginWithInvalidCredentials() {
        LoginRequest loginRequest = new LoginRequest("invalid@example.com", "WrongPassword");
        
        Response response = apiClient.post("/auth/login", loginRequest);
        
        response.then()
            .statusCode(401)
            .body("error", equalTo("Invalid credentials"));
    }

    @Test(priority = 3)
    public void testValidateJWTToken() {
        Response response = apiClient.get("/auth/validate", token);
        
        response.then()
            .statusCode(200)
            .body("valid", equalTo(true));
    }
}
```

---

## ⚡ Running Tests

### Run Playwright UI Tests

```bash
cd ui-tests

# Run all tests
npm run test

# Run specific test file
npm run test -- login.spec.ts

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with specific browser
npm run test -- --project=chromium
```

### Run REST Assured API Tests

```bash
cd api-tests-restassured

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserApiTest

# Run specific test method
mvn test -Dtest=UserApiTest#testGetAllUsers

# Run with specific environment
mvn test -Denv=staging
```

### Run Both UI and API Tests

```bash
# From root directory
mvn test -f api-tests-restassured/pom.xml && npm run test --prefix ui-tests
```

---

## 🚀 CI/CD Integration

### GitHub Actions Workflow

**`.github/workflows/ui-tests.yml`**

```yaml
name: Playwright UI Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd ui-tests && npm install
      - run: cd ui-tests && npx playwright install
      - run: cd ui-tests && npm run test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: ui-tests/test-results/
```

**`.github/workflows/api-tests.yml`**

```yaml
name: REST Assured API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      - run: cd api-tests-restassured && mvn clean test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: api-tests-restassured/target/surefire-reports/
```

---

## 🌟 Best Practices

- **Page Object Model**: Keep locators and interactions separated from tests
- **Data-Driven Tests**: Use external data sources for test parameters
- **Fixtures**: Reuse setup/teardown logic across tests
- **Assertions**: Use specific assertions, avoid generic checks
- **Error Handling**: Implement proper exception handling and logging
- **Environment Configuration**: Use environment variables for configuration
- **Test Isolation**: Ensure tests don't depend on each other
- **Parallel Execution**: Configure parallel test execution for faster feedback
- **Reporting**: Generate comprehensive HTML reports for visibility
- **Code Reusability**: Create utility classes for common operations

---

## 🚧 Troubleshooting

### Playwright Issues

**Problem**: Playwright browsers not found
```bash
npx playwright install
```

**Problem**: Tests timing out
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify application is accessible

### REST Assured Issues

**Problem**: Authentication failures
- Verify token is correctly extracted
- Check token expiration
- Ensure Authorization header format is correct

**Problem**: JSON parsing errors
- Validate response Content-Type header
- Check JSON schema
- Use proper model mappings

---

## 📄 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📂 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤛 Support

For issues, questions, or suggestions, please open an issue in the [GitHub Issues](https://github.com/yourusername/playwright-restassured-framework/issues) section.

**Happy Testing! 🚀**
