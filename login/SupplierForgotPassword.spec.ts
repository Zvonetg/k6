import AuthPage from '../../pages/Auth.page';
import ForgotPasswordPage from '../../pages/ForgotPassword.page';

describe('GWG - Forgot Password', () => {
  const FORGOT_PASSWORD_MESSAGE =
    "We have sent reset password instruction to your email address. If you don't see the email in your inbox, check your spam folder.";

  it('should give success message to valid supplier email', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.forgotPasswordButton.click();
    await ForgotPasswordPage.emailTextInput.waitForExist();
    expect((await $$('div*=Forgot Password')).length).toBeGreaterThan(0);
    await ForgotPasswordPage.email(process.env.DEFAULT_SUPPLIER_EMAIL);
    await ForgotPasswordPage.submitButton.click();
    await ForgotPasswordPage.backToLoginButton.waitForExist();
    await browser.pause(1000);
    expect((await $$('div*=Check Your Email')).length).toBeGreaterThan(0);
    expect((await $$(`div*=${FORGOT_PASSWORD_MESSAGE}`)).length).toBeGreaterThan(0);
  });

  it('should allow to return to login page before submit supplier email', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.forgotPasswordButton.click();
    await ForgotPasswordPage.emailTextInput.waitForExist();
    expect((await $$('div*=Forgot Password')).length).toBeGreaterThan(0);
    await ForgotPasswordPage.backToLoginButton.waitForExist();
    await ForgotPasswordPage.backToLoginButton.click();
    await AuthPage.form.waitForExist();
    expect(await browser.getUrl()).toContain('/login');
  });

  it('should allow to return to login page after submit supplier email', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.forgotPasswordButton.click();
    await ForgotPasswordPage.emailTextInput.waitForExist();
    expect((await $$('div*=Forgot Password')).length).toBeGreaterThan(0);
    await ForgotPasswordPage.email(process.env.DEFAULT_SUPPLIER_EMAIL);
    await ForgotPasswordPage.submitButton.click();
    await ForgotPasswordPage.backToLoginButton.waitForExist();
    await browser.pause(1000);
    expect((await $$('div*=Check Your Email')).length).toBeGreaterThan(0);
    await ForgotPasswordPage.backToLoginButton.click();
    await AuthPage.form.waitForExist();
    expect(await browser.getUrl()).toContain('/login');
  });
});
