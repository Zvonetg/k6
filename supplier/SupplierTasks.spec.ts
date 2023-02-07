import AuthPage from '../../pages/Auth.page';
import SupplierTasksPage from '../../pages/supplier/SupplierTasks.page';
import SupplierHomePage from '../../pages/SupplierHome.page';

const supplierTasksInstance = new SupplierTasksPage();

const createTask = async () => {
  const response = await supplierTasksInstance.createSupplierTask();
  return response.data.dev_createSupplierTask.uid;
};

describe('GWG - Supplier Tasks', () => {
  let taskUid;
  let validRequestMock;
  before('Supplier login', async () => {
    await AuthPage.loginAsSupplier();
    taskUid = await createTask();

    validRequestMock = await browser.mock(' **/gwp/graphql', {
      headers: { 'content-type': 'application/json' },
      postData: (data) => data.includes('fetchTaskUrl') && data.includes(taskUid)
    });

    validRequestMock.respond({
      data: {
        fetchTaskUrl: {
          url: 'https://localhost:3000/external/smartforms/update-engagement?formUid=SFO6945155e-b278-4bb1-9b8f-ed9ca91a7015&code=jzPYCSGq0v8J1JMQ&personUid=P00828862-5fe5-4d31-ae57-31a9afb6c17a&engagementUid=E303f1174-dd19-4ae7-8c83-0470aea888b6&taskUid=K9304a42b-ab35-4fa3-8a68-2486b334859d',
          token: 'jzPYCSGq0v8J1JMQ'
        }
      }
    });
  });



  it('should successfully navigate to the Tasks page', async () => {
  await SupplierHomePage.open();
  await SupplierHomePage.waitForPageToLoad();
  await SupplierHomePage.tasksPageButton.waitForExist();
  await SupplierHomePage.tasksPageButton.click();
  expect(await browser.getUrl()).toContain('/my-tasks');
  });

  // TODO open smart form

});
