import Random from '../../common/Random';
import SupplierUsersPage from '../../pages/SupplierUsers.page';
import { logger } from '../../../utils/utils/logger';
import SupplierAdminPage from '../../pages/supplier/SupplierAdmin.page';

const supplierUsersPageInstance = new SupplierUsersPage();

const getEnterprise = async () => {
  const { data, errors } = await supplierUsersPageInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient;
};

describe('GWG - Supplier User Edit', () => {
  let enterprise;
  let email;
  let firstName;
  let lastName;
  let clientsUids;

  beforeEach('create enterprise', async () => {
    email = `${Random.randomString()}@saltees.com`.toLocaleLowerCase();
    firstName = Random.randomString();
    lastName = Random.randomString();
    await SupplierUsersPage.loginAsSupplier();
    enterprise = await getEnterprise();
    await supplierUsersPageInstance.getUser({
      email,
      firstName,
      lastName,
      clientsUids
    });
  });

  it('should successfully edit a supplier user via row actions', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    await supplierUsersPageInstance.editUser(`${firstName} ${lastName}`);
    expect(await SupplierAdminPage.firstnameTextInput).toBeDisabled();
    expect(await SupplierAdminPage.lastnameTextInput).toBeDisabled();
    expect(await SupplierAdminPage.emailTextInput).toBeDisabled();
    await (await SupplierAdminPage.clientsInput).setValue(enterprise.name);
    await browser.keys(['Enter']);
    await (await SupplierAdminPage.userUpdateButton).click();
    await (await SupplierAdminPage.successfulUserUpdateToaster).waitForExist();
    await browser.refresh();
    const rowDetails = await supplierUsersPageInstance.getRowDetails(`${firstName} ${lastName}`);
    expect(rowDetails.CLIENT).toEqual(enterprise.name);
  });

  it('should successfully edit a supplier user via bulk actions', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    await supplierUsersPageInstance.editUserViaBulkActions([`${firstName} ${lastName}`]);
    expect(await SupplierAdminPage.firstnameTextInput).toBeDisabled();
    expect(await SupplierAdminPage.lastnameTextInput).toBeDisabled();
    expect(await SupplierAdminPage.emailTextInput).toBeDisabled();
    await SupplierAdminPage.clientsInput.click();
    await SupplierAdminPage.selectMenuItem(enterprise.name).scrollIntoView();
    await SupplierAdminPage.selectMenuItem(enterprise.name).click();
    await SupplierAdminPage.clientsInput.click();
    await SupplierAdminPage.userUpdateButton.click();
    expect(await SupplierAdminPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should NOT have bulk edit action if mutiple users are selected', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    const errorMessage = await supplierUsersPageInstance.getErrorForMultipleEdit();
    expect(errorMessage).toEqual('Bulk action "Edit" doesn\'t exist');
  });
});
