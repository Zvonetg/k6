import AuthPage from '../../pages/Auth.page';
import WorkerHomePage from '../../pages/WorkerHome.page';

describe('Worker authentication', () => {
  const LOGIN_ERROR_MESSAGE =
    'There was a problem logging in, please try again. For your security, we may temporarily lock your account after too many failed attempts.';

  afterEach(async () => {
    try {
      await AuthPage.logout();
    } catch (e) {}
  });

  it('should deny access with wrong credentials for Worker', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username('bad@example.com');
    await AuthPage.password('123456');
    await AuthPage.loginButton.click();
    await (await AuthPage.authorisationError()).waitForExist();
    expect(await (await AuthPage.authorisationError()).getText()).toEqual(LOGIN_ERROR_MESSAGE);
  });

  it('should deny access with wrong password for Worker', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username(process.env.DEFAULT_WORKER_EMAIL);
    await AuthPage.password('123456');
    await AuthPage.loginButton.click();
    await (await AuthPage.authorisationError()).waitForExist();
    expect(await (await AuthPage.authorisationError()).getText()).toEqual(LOGIN_ERROR_MESSAGE);
  });

  it('should grant access with valid credentials for Worker', async () => {
    await AuthPage.authenticateWorker();
    await WorkerHomePage.mobileUtmostLogo.waitForExist();
    expect(await WorkerHomePage.title).toEqual('Utmost - Workforce at full force');
  });
});
