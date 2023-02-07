import Random from '../../common/Random';
import SupplierUsersPage from '../../pages/supplier/SupplierUsers.page';
import SupplierHomePage from '../../pages/supplier/SupplierHome.page';
import SupplierAdminPage from '../../pages/supplier/SupplierAdmin.page';
import { logger } from '../../../utils/utils/logger';

const supplierUsersPageInstance = new SupplierUsersPage();

const getEnterprise = async () => {
  const { data, errors } = await supplierUsersPageInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient;
};

describe('GWG - Supplier User Creation', () => {
  let enterprise;

  before('Create enterprise', async () => {
    await SupplierUsersPage.loginAsSupplier();
    enterprise = await getEnterprise();
  });

  beforeEach('Login as Supplier', async () => {
    await SupplierUsersPage.loginAsSupplier();
  });

  it('should successfully create a supplier with client name', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.firstnameTextInput.setValue('1');
    await SupplierAdminPage.lastnameTextInput.setValue('Smith');
    await SupplierAdminPage.emailTextInput.setValue(`${Random.randomString()}@saltees.com`);
    await SupplierAdminPage.clientsInputUser.click();
    await SupplierAdminPage.selectMenuItem(enterprise).click();
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.successfulUserCreationToaster).toExist();
  });

  it('should get an error when creating user without first name', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.lastnameTextInput.setValue('Smith');
    await SupplierAdminPage.emailTextInput.setValue(`${Random.randomString()}@saltees.com`);
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.firstNameErrorMessage).toExist();
  });

  it('should get an error when creating user without last name', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.firstnameTextInput.setValue('1');
    await SupplierAdminPage.emailTextInput.setValue(`${Random.randomString()}@saltees.com`);
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.lastNameErrorMessage).toExist();
  });

  it('should get an error when creating user without email', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.firstnameTextInput.setValue('1');
    await SupplierAdminPage.lastnameTextInput.setValue('Smith');
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.emailErrorMessage).toExist();
  });

  it('should get an error when creating user with invalid email', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.firstnameTextInput.setValue('1');
    await SupplierAdminPage.lastnameTextInput.setValue('Smith');
    await SupplierAdminPage.emailTextInput.setValue(`${Random.randomString()}`);
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.emailErrorMessage).toExist();
  });

  it('should successfully create a user without client name', async () => {
    await SupplierHomePage.AdminSettingsNavigationLink.waitForExist();
    await SupplierAdminPage.open();
    await SupplierAdminPage.addUserButton.click();
    await SupplierAdminPage.firstnameTextInput.setValue('1');
    await SupplierAdminPage.lastnameTextInput.setValue('Smith');
    await SupplierAdminPage.emailTextInput.setValue(`${Random.randomString()}@saltees.com`);
    await SupplierAdminPage.createUserSubmitButton.click();
    expect(await SupplierAdminPage.emailErrorMessage).toExist();
  });
});
