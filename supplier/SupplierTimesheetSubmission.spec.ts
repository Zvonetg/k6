import SupplierHomePage from '../../pages/SupplierHome.page';
import {supplierTimesheet} from '../../pages/supplier/SupplierTimesheet.page';

const COSTCENTER1 = 'Fake Cost Center';
const COSTCENTER2 = 'Fake Cost Center New';
const TIMECODEREGULAR = 'Regular';
const TIMECODEOTHER = 'Other';

describe('GWG - Supplier Timesheet', () => {
  const supplierTimesheetsInstance = new SupplierHomePage();
  let timesheets: any = [];
 
  let value;

  beforeEach('Supplier login', async () => {
    await SupplierHomePage.loginAsSupplier();
    value = '8,01';
    const response = await supplierTimesheetsInstance.createSupplierTimesheet();
    timesheets = response?.data?.dev_createWorkerTimesheetsForSupplier?.timesheets ?? [];
    await SupplierHomePage.openTimesheets();
  });

  afterEach('Delete timesheets', async () => {
    await supplierTimesheetsInstance.removeAllTimesheet();
    await browser.pause(1500);
  });

  it('should successfully add time on timesheet', async () => {
    await supplierTimesheet
        .clickTimesheet(timesheets)
        .clickWorkdayAndPick()
        .clickAndAddHoursInput()
        .clickIncreaseAndDecrease(value)
        .clickFirstFieldCostCenter()
        .clickAndGetCostCenter(COSTCENTER1)
        .clickFirstFieldTimeCode()
        .clickAndAddTimecode(TIMECODEREGULAR)
        .clickSubmitAndGetMessage();
  });

  it('should successfully check correct button', async () => {
    await supplierTimesheet
        .clickTimesheetApproved(timesheets)
        .clickCorrectButton();
  });

  it('should be able to add two time entry with different timecode', async () => {
    await supplierTimesheet
    .clickTimesheet(timesheets)
    .clickWorkdayAndPick()
    .clickAndAddHoursInput()
    .clickIncreaseAndDecrease(value)
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddSecondHoursInput()
    .clickSecondFieldTimeCode()
    .clickAndAddSecondTimecode(TIMECODEOTHER)
    .clickSubmitAndGetMessage();
  });

  it('should be able to add two time entry with different cost center', async () => {
    await supplierTimesheet
    .clickTimesheet(timesheets)
    .clickWorkdayAndPick()
    .clickAndAddHoursInput()
    .clickIncreaseAndDecrease(value)
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetSecondCostCenter(COSTCENTER2)
    .clickAndAddSecondHoursInput()
    .clickSecondFieldTimeCode()
    .clickAndAddSecondTimecode(TIMECODEOTHER)
    .clickSubmitAndGetMessage();
  });

  it('should successfully check search option', async () => {
    await browser.pause(1000);
    await SupplierHomePage.search(`${timesheets[0].number}`);
    await browser.pause(1000);
    expect(await SupplierHomePage.tableRow).toExist();
  });
});
