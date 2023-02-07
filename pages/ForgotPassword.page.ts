import Page from './Page';

class ForgotPasswordPage extends Page {
  static get emailTextInput() {
    return $('input[type="email"]');
  }

  /**
   * Setter/Getter function for the email input field
   * @param value if undefined will return the value, set value otherwise
   */
  static async email(value?: string) {
    if (value !== undefined) {
      const element = await this.emailTextInput;
      await element.setValue(value);
      return value;
    }

    const element = await this.emailTextInput;
    return element.getValue();
  }

  static get submitButton() {
    return $('button[data-test="submit-button"]');
  }

  static get backToLoginButton() {
    return $('a[data-test="back-button"]');
  }

  static get forgotPasswordText() {
    return $('div[class=h3]');
  }
}

export default ForgotPasswordPage;
