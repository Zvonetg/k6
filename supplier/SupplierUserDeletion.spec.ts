import Random from '../../common/Random';
import SupplierUsersPage from '../../pages/SupplierUsers.page';
import SupplierAdminPage from '../../pages/supplier/SupplierAdmin.page';

const supplierUsersPageInstance = new SupplierUsersPage();

describe('GWG - Supplier User Delete', () => {
  let email;
  let firstName;
  let lastName;
  let clientsUids;

  beforeEach('create enterprise', async () => {
    email = `${Random.randomString()}@saltees.com`.toLocaleLowerCase();
    firstName = Random.randomString();
    lastName = Random.randomString();
    await SupplierUsersPage.loginAsSupplier();
    await supplierUsersPageInstance.getUser({
      email,
      firstName,
      lastName,
      clientsUids
    });
  });

  it('should successfully delete user via row actions', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    await supplierUsersPageInstance.deleteUser(`${firstName} ${lastName}`);
    await SupplierAdminPage.userConfirmDeleteButton.click();
    expect(await SupplierAdminPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should successfully delete user via bulk actions', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    await supplierUsersPageInstance.deleteUserViaBulkActions([`${firstName} ${lastName}`]);
    await SupplierAdminPage.userConfirmDeleteButton.click();
    expect(await SupplierAdminPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should successfully delete a multiple users via bulk actions', async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
    await supplierUsersPageInstance.deleteMultipleUsers();
    await SupplierAdminPage.userConfirmDeleteButton.click();
    expect(await SupplierAdminPage.usersUpdateSuccessToasterMessage).toExist();
  });
});
