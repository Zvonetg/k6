import { SupplierUserProfileModel, WorkerProfileModel } from 'gwg';
import Auth from '../../common/Auth';
import AuthPage from '../../pages/Auth.page';
import ChooseAccountPage from '../../pages/ChooseAccount.page';
import SupplierHomePage from '../../pages/SupplierHome.page';
import WorkerHomePage from '../../pages/WorkerHome.page';
import { logger } from '../../../utils/utils/logger';

const PRIMARY_EMAIL = 'jimmy@salteese.com';

describe('GWG - Choose account', () => {
  const instance = new ChooseAccountPage();
  let supplierUserProfile: SupplierUserProfileModel;
  let workerProfile: WorkerProfileModel;

  before(async () => {
    await Auth.login({ email: PRIMARY_EMAIL, password: process.env.DEFAULT_PASSWORD });
    supplierUserProfile = await getSupplierUserProfile();
    workerProfile = await getWorkerProfile();
    await Auth.logout();
  });

  afterEach(async () => {
    await AuthPage.logout();
  });

  it('should login as supplier', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username(PRIMARY_EMAIL);
    await AuthPage.password(process.env.DEFAULT_PASSWORD);
    await AuthPage.loginButton.click();
    await ChooseAccountPage.waitForPageToLoad();
    await ChooseAccountPage.chooseAccountsSection.waitForExist();
    const supplierAccount = supplierUserProfile.suppliers[0];
    await ChooseAccountPage.chooseAccount(supplierAccount.uid);
    await SupplierHomePage.utmostLogo.waitForExist();
    expect(await SupplierHomePage.title).toEqual('Utmost - Workforce at full force');
  });

  it('should login as worker', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username(PRIMARY_EMAIL);
    await AuthPage.password(process.env.DEFAULT_PASSWORD);
    await AuthPage.loginButton.click();
    await ChooseAccountPage.waitForPageToLoad();
    await ChooseAccountPage.chooseAccountsSection.waitForExist();
    await ChooseAccountPage.chooseAccount(workerProfile.uid);
    await WorkerHomePage.utmostLogo.waitForExist();
    expect(await WorkerHomePage.title).toEqual('Utmost - Workforce at full force');
  });

  it('should check button "Back to login screen"', async () => {
    await AuthPage.open();
    await AuthPage.form.waitForExist();
    await AuthPage.username(PRIMARY_EMAIL);
    await AuthPage.password(process.env.DEFAULT_PASSWORD);
    await AuthPage.loginButton.click();
    await ChooseAccountPage.backToLoginScreen.waitForExist();
    await ChooseAccountPage.backToLoginScreen.click();
    expect(await ChooseAccountPage.signInButton).toExist();
  });

  const getSupplierUserProfile = async () => {
    const { data, errors } = await instance.getSupplierUserProfile();
    logger.error(errors);
    return data?.getSupplierUserProfileSelf;
  };

  const getWorkerProfile = async () => {
    const { data, errors } = await instance.getWorkerProfile();
    logger.error(errors);
    return data?.dev_getWorkerProfileSelf;
  };
  
});
