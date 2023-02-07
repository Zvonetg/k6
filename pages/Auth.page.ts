import Page from './Page';

class AuthPage extends Page {
  static async authenticateWorker(email = process.env.DEFAULT_WORKER_EMAIL, password = process.env.DEFAULT_PASSWORD) {
    await AuthPage.open();
    await (await AuthPage.form).waitForExist();
    await AuthPage.username(email);
    await AuthPage.password(password);
    await (await AuthPage.loginButton).click();
  }

  static async authenticateSupplier(
    email = process.env.DEFAULT_SUPPLIER_EMAIL,
    password = process.env.DEFAULT_PASSWORD
  ) {
    await AuthPage.open();
    await (await AuthPage.form).waitForExist();
    await AuthPage.username(email);
    await AuthPage.password(password);
    await (await AuthPage.loginButton).click();
  }

  static get form() {
    return $('[data-test="auth-form"]');
  }

  static get usernameTextInput() {
    return $('input[type="email"]');
  }

  /**
   * Setter/Getter function for the username input field
   * @param value if undefined will return the value, set value otherwise
   */
  static async username(value?: string) {
    if (value !== undefined) {
      const element = await AuthPage.usernameTextInput;
      await element.setValue(value);
      return value;
    }

    const element = await AuthPage.usernameTextInput;
    return element.getValue();
  }

  static get passwordTextInput() {
    return $('input[type="password"]');
  }

  /**
   * Setter/Getter function for the password input field
   * @param value if undefined will return the value, set value otherwise
   */
  static async password(value?: string) {
    if (value !== undefined) {
      const element = await this.passwordTextInput;
      await element.setValue(value);
      return value;
    }

    const element = await this.passwordTextInput;
    return element.getValue();
  }

  static get loginButton() {
    return $('button[data-test="login-button"]')
  }

  static get forgotPasswordButton() {
    return $('a[data-test="forgot-password-button"]');
  }

  static async authorisationError() {
    return $('div.error');
  }
}

export default AuthPage;
