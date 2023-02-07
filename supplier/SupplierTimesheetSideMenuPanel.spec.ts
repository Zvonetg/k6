import AuthPage from '../../pages/Auth.page';
import SupplierHomePage from '../../pages/SupplierHome.page';
import TimeAndExpensesPage from '../../pages/TimeAndExpenses.page';

const timeAndExpensesInstance = new TimeAndExpensesPage();

describe('GWG - Supplier TimesheetSideMenuPanel', () => {

  let timesheets: any = [];

  beforeEach('Login as supplier', async () => {
  await AuthPage.loginAsSupplier();
  const response = await timeAndExpensesInstance.createSupplierTimesheet();
  timesheets = response?.data?.dev_createWorkerTimesheetsForSupplier?.timesheets ?? [];
  });

  after('Delete timesheets', async () => {
    await timeAndExpensesInstance.removeAllTimesheet();
  });

  it('should successfully open side menu panel and show data', async () => {
    await SupplierHomePage.open('supplier/time-and-expenses');
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.number;
    await (await TimeAndExpensesPage.timesheetIdOpen(timesheetUid)).waitForExist();
    await (await TimeAndExpensesPage.timesheetIdOpen(timesheetUid)).click();
    expect(await TimeAndExpensesPage.sidePanel()).toExist();
  });

  it('should successfully check bulk action', async () => {
    await SupplierHomePage.open('supplier/time-and-expenses');
    await TimeAndExpensesPage.checkbox.waitForExist();
    await TimeAndExpensesPage.checkbox.click();
    await TimeAndExpensesPage.bulkActionCsv.waitForExist();
    await TimeAndExpensesPage.bulkActionCsv.click();
    expect(await TimeAndExpensesPage.successfullyToastMessage).toExist();
  });
});
