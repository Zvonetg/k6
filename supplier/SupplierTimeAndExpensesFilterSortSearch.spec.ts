import { GwgTimesheetResponseModel } from 'gwg';
import TimeAndExpensesPage from '../../pages/supplier/SupplierTimeAndExpenses.page';
import { logger } from '../../../utils/utils/logger';

const timeAndExpensesPageInstance = new TimeAndExpensesPage();

const getTimesheets = async () => {
  const { data, errors } = await timeAndExpensesPageInstance.createWorkerTimesheetsForSupplier();
  logger.error(errors);
  return data?.dev_createWorkerTimesheetsForSupplier.timesheets;
};

const removeAllTimesheets = async () => {
  const { data, errors } = await timeAndExpensesPageInstance.removeAllTimesheets();
  logger.error(errors);
  return data;
};

describe('Supplier Time and Expenses Page: Filter Sort Search', () => {
  let timesheets: GwgTimesheetResponseModel[];

  before('setup', async () => {
    await TimeAndExpensesPage.loginAsSupplier();
    await removeAllTimesheets();
    const timesheets1 = await getTimesheets();
    const timesheets2 = await getTimesheets();
    timesheets = [...timesheets1, ...timesheets2];
  });

  it('should search by id', async () => {
    await TimeAndExpensesPage.open();
    await TimeAndExpensesPage.search(`${timesheets[0].number}`);
    // eslint-disable-next-line jest/valid-expect
    expect(await TimeAndExpensesPage.lineItemId(timesheets[0].number));
    await TimeAndExpensesPage.waitForTotalCountToBe(1);
    expect(await TimeAndExpensesPage.totalCount).toHaveText('Viewing 1 Timesheet');
  });

  it('should search by worker name', async () => {
    await TimeAndExpensesPage.open();
    await TimeAndExpensesPage.search(`${timesheets[0].workerProfileModel.name.fullName}`);
    timesheets.forEach(async (timesheet) => {
      expect(await TimeAndExpensesPage.lineItemWorkerName(timesheet.uid)).toBe(
        `${timesheet.workerProfileModel.name.fullName}`
      );
    });
    expect(await TimeAndExpensesPage.totalCount).toHaveText('Viewing 7 Timesheet');
  });

  it('should check/uncheck timesheets', async () => {
    await TimeAndExpensesPage.open();
    await (await TimeAndExpensesPage.checkAllCheckbox).click();
    await browser.pause(500);
    timesheets.forEach(async ({ uid }) => {
      expect(await (await TimeAndExpensesPage.lineItemCheckbox(uid)).getAttribute('class')).toContain('checked');
    });
    await (await TimeAndExpensesPage.checkAllCheckbox).click();
    await browser.pause(500);
    timesheets.forEach(async ({ uid }) => {
      expect(await (await TimeAndExpensesPage.lineItemCheckbox(uid)).getAttribute('class')).not.toContain('checked');
    });
  });
});
