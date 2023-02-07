import { LegalEntityModel } from 'gwg';
import { Mock } from 'webdriverio';
import { supplierWorkersHub } from '../../pages/supplier/SupplierWorkersHub.page';
import SupplierHomePage from '../../pages/SupplierHome.page';
import Random from '../../common/Random';

describe('Supplier Add Client Worker', () => {
  let firstEnterprise: LegalEntityModel;
  let secondEnterprise: LegalEntityModel;
  let validRequestMock: Mock;
  let invalidRequestMock: Mock;
  let search;

  before('Supplier login and client creation', async () => {
    await supplierWorkersHub.loginAsSupplier();
    search = Random.randomString(10);
    firstEnterprise = await supplierWorkersHub.getCreatedEnterprise();
    secondEnterprise = await supplierWorkersHub.getCreatedEnterprise();
    validRequestMock = await browser.mock(' **/gwp/graphql', {
      headers: { 'content-type': 'application/json' },
      postData: (data) => data.includes('fetchActionUrl') && data.includes(firstEnterprise?.uid)
    });
    validRequestMock.respond({
      data: {
        fetchActionUrl: {
          url: 'http://localhost:3000/external/smartforms/add-worker?formUid=SFO8eff3ed3-4c0f-4c03-bc9d-fc14bcd0e942&code=9U1Pl2JFZBlrVTkJ',
          token: '9U1Pl2JFZBlrVTkJ'
        }
      }
    });
    invalidRequestMock = await browser.mock(' **/gwp/graphql', {
      headers: { 'content-type': 'application/json' },
      postData: (data) => data.includes('fetchActionUrl') && data.includes(secondEnterprise?.uid)
    });

    invalidRequestMock.respond({
      data: null,
      errors: [
        {
          code: 'GWG400021',
          message: 'Could not determine URL for this client'
        }
      ]
    });
  });

  beforeEach('navigate to the WorkerHub', async () => {
    await supplierWorkersHub.open();
  });

  after('delete created enterprise', async () => {
    await supplierWorkersHub.removeCreatedEnterprise(firstEnterprise?.uid);
    await supplierWorkersHub.removeCreatedEnterprise(secondEnterprise?.uid);
  });

  it('should have the actions of the assigned clients populated correctly', async () => {
    const firstEnterpriseWorkerForms = firstEnterprise?.supplierActions?.actions?.map?.((action) => action?.label);
    const secondEnterpriseWorkerForms = secondEnterprise?.supplierActions?.actions?.map?.((action) => action?.label);

    await supplierWorkersHub
      .openClientWorkerDialog()
      .addClientDialog.selectClient(firstEnterprise?.name)
      .expectWorkerFormSelected(firstEnterpriseWorkerForms)
      .selectClient(secondEnterprise?.name)
      .expectWorkerFormSelected(secondEnterpriseWorkerForms);
  });

  it(`should have the 'Add Worker Form' select disabled if the client is not selected`, async () => {
    await supplierWorkersHub
      .openClientWorkerDialog()
      .addClientDialog.expectWorkerFormToBeDisabled()
      .expectSubmitButtonToBeDisabled();
  });

  it('should show a warning popup on parent window when unable to retrieve the url', async () => {
    await supplierWorkersHub.openClientWorkerDialog().addClientDialog.selectClient(secondEnterprise?.name).submit();
    expect(validRequestMock).toBeRequestedTimes(0);
    expect(invalidRequestMock).toBeRequestedTimes(1);
  });

  it('should check is search is working', async () => {
    await SupplierHomePage.addSearchWorkforce.waitForExist;
    await SupplierHomePage.addSearchWorkforce.click();
    await SupplierHomePage.addSearchWorkforce.setValue(search);
    expect(await SupplierHomePage.addSearchWorkforce).toHaveTextContaining(search);
  });

  it(`should stay in same dialog smartform with the valid mocked url on submit button click`, async () => {
    const parentWindow = await browser.getWindowHandle();
    await supplierWorkersHub
      .openClientWorkerDialog()
      .addClientDialog.selectClient(firstEnterprise?.name)
      .selectWorkerForm(firstEnterprise?.supplierActions?.actions?.[0]?.label)
      .submit();
    await browser.pause(1000);
    const windows = await browser.getWindowHandles();
    expect(windows.length).toBe(1);
    expect(validRequestMock).toBeRequestedTimes(1);
    expect(browser).toHaveUrlContaining('add-worker?formUid=**&code=**');
    const childWindow = windows.filter((window) => window !== parentWindow).pop();
    browser.switchToWindow(childWindow);
    browser.closeWindow();
    await browser.pause(1000);
    browser.switchToWindow(parentWindow);
  });
});
