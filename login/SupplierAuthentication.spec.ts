import AuthPage from '../../pages/Auth.page';
import SupplierHomePage from '../../pages/SupplierHome.page';
import { logger } from '../../../utils/utils/logger';

describe('Authentication', () => {
  const LOGIN_ERROR_MESSAGE =
    'There was a problem logging in, please try again. For your security, we may temporarily lock your account after too many failed attempts.';

  afterEach(async () => {
    try {
      await AuthPage.logout();
    } catch (e) {
      logger.error(e);
    }
  });

  it('should deny access with wrong credentials for Supplier', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username('bad@example.com');
    await AuthPage.password('123456');
    await AuthPage.loginButton.click();
    await (await AuthPage.authorisationError()).waitForExist();
    expect(await (await AuthPage.authorisationError()).getText()).toEqual(LOGIN_ERROR_MESSAGE);
  });

  it('should deny access with wrong password for Supplier', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username(process.env.DEFAULT_SUPPLIER_EMAIL);
    await AuthPage.password('asdfdf');
    await AuthPage.loginButton.click();
    await (await AuthPage.authorisationError()).waitForExist();
    expect(await (await AuthPage.authorisationError()).getText()).toEqual(LOGIN_ERROR_MESSAGE);
  });

  it('should grant access with valid credentials for Supplier', async () => {
    await AuthPage.authenticateSupplier();
    await SupplierHomePage.utmostLogo.waitForExist();
    expect(await SupplierHomePage.title).toEqual('Utmost - Workforce at full force');
  });
});
