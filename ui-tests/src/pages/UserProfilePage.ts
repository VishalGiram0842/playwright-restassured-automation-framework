import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class UserProfilePage extends BasePage {
  readonly profileHeader: Locator;
  readonly editProfileButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailDisplay: Locator;
  readonly phoneInput: Locator;
  readonly avatarImage: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;
  readonly changePasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.profileHeader = page.locator('[data-testid="profile-header"]');
    this.editProfileButton = page.locator('button:has-text("Edit Profile")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailDisplay = page.locator('[data-testid="email-display"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.avatarImage = page.locator('[data-testid="avatar-image"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.changePasswordLink = page.locator('a:has-text("Change Password")');
  }

  async navigateToProfile(): Promise<void> {
    await this.page.goto('/profile');
    await this.page.waitForLoadState('networkidle');
  }

  async isProfileHeaderVisible(): Promise<boolean> {
    return await this.profileHeader.isVisible();
  }

  async clickEditProfile(): Promise<void> {
    await this.editProfileButton.click();
  }

  async updateFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  async updateLastName(lastName: string): Promise<void> {
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  async updatePhone(phone: string): Promise<void> {
    await this.phoneInput.clear();
    await this.phoneInput.fill(phone);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.successMessage.textContent();
  }

  async clickChangePassword(): Promise<void> {
    await this.changePasswordLink.click();
  }

  async getEmailDisplay(): Promise<string | null> {
    return await this.emailDisplay.textContent();
  }
}
