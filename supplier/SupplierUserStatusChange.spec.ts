import Random from '../../common/Random';
import SupplierUsersPage from '../../pages/SupplierUsers.page';
import { logger } from '../../../utils/utils/logger';

const supplierUsersPageInstance = new SupplierUsersPage();

const getEnterprise = async () => {
  const { data, errors } = await supplierUsersPageInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient;
};

describe('GWG - Supplier User Status Change', () => {
  const noOfUsers = 2;
  const users: { email: string; firstName: string; lastName: string; clientsUids: string[] }[] = [];
  const usernames: string[] = [];
  let enterprise;
  let clientsUids;

  before('create enterprise', async () => {
    await SupplierUsersPage.loginAsSupplier();
    enterprise = await getEnterprise();
    for(let i=0; i < noOfUsers; i+=1) {
      const email =  `${Random.randomString()}@saltees.com`.toLocaleLowerCase();
      const firstName = Random.randomString();
      const lastName = Random.randomString();
      users.push({ 
        email,
        firstName,
        lastName,
        clientsUids
      });
      usernames.push(`${firstName} ${lastName}`);
      /* eslint-disable no-await-in-loop */
      await supplierUsersPageInstance.getUser({
        email,
        firstName,
        lastName,
        clientsUids
      });
    }
  });

  beforeEach(async () => {
    await SupplierUsersPage.open('supplier/admin-settings/users');
  });

  it('should be able to deactivate an existing user via inline option', async () => {
    await (await SupplierUsersPage.selectBody(enterprise.name)).scrollIntoView();
    await (await SupplierUsersPage.selectBody(enterprise.name)).click();
    await supplierUsersPageInstance.deactivateUser(`${users[0]?.firstName} ${users[0]?.lastName}`);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should be able to activate an existing user via inline option', async () => {
    await (await SupplierUsersPage.selectBody(enterprise.name)).scrollIntoView();
    await (await SupplierUsersPage.selectBody(enterprise.name)).click();
    await supplierUsersPageInstance.activateUser(`${users[0]?.firstName} ${users[0]?.lastName}`);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
    await browser.refresh();
  });

  it('should be able to deactivate user via bulk action', async () => {
    await (await SupplierUsersPage.selectBody(enterprise.name)).scrollIntoView();
    await (await SupplierUsersPage.selectBody(enterprise.name)).click();
    await supplierUsersPageInstance.deactivateUserViaBulkActions([`${users[0]?.firstName} ${users[0]?.lastName}`]);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should be able to activate user via bulk action', async () => {
    await (await SupplierUsersPage.selectBody(enterprise.name)).scrollIntoView();
    await (await SupplierUsersPage.selectBody(enterprise.name)).click();
    await supplierUsersPageInstance.activateUserViaBulkActions([`${users[0]?.firstName} ${users[0]?.lastName}`]);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should bulk deactivate if multiple active users are selected', async () => {
    await supplierUsersPageInstance.deactivateMultipleUsers(usernames);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
  });

  it('should bulk activate if multiple inactive users are selected', async () => {
    await supplierUsersPageInstance.activateMultipleUsers(usernames);
    expect(await SupplierUsersPage.usersUpdateSuccessToasterMessage).toExist();
  });
});
