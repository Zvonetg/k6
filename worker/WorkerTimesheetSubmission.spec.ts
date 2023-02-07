import Auth from '../../common/Auth';
import {addTimeEntry} from '../../pages/AddTimeEntry.page';
import WorkerHomePage from '../../pages/WorkerHome.page';
import WorkerTimesheetPage from '../../pages/WorkerTimesheets.page';

const COSTCENTER1 = 'Fake Cost Center';
const COSTCENTER2 = 'Fake Cost Center New';
const COSTCENTER3 = 'Fake Center';
const TIMECODEREGULAR = 'Regular';
const TIMECODEOTHER = 'Other';
const TIMECODETEST = 'Test';

describe('Worker Timesheets', () => {
  const workerTimesheetsInstance = new WorkerTimesheetPage();
  let timesheets: any = [];
  const value = '8,01';

  beforeEach('Login as worker', async () => {
    await Auth.loginAsWorker();
    const response = await workerTimesheetsInstance.createWorkerTimesheets();
    timesheets = response?.data?.createTimesheetForWorker?.timesheets;
    await WorkerHomePage.openTimesheets();
  });

  it('should be able to add a time entry for hours', async () => {
    await addTimeEntry
        .clickTimesheet(timesheets)
        .clickAddTimeEntryButton()
        .clickFirstFieldCostCenter()
        .clickAndGetCostCenter(COSTCENTER1)
        .clickAndAddHoursInput()
        .clickIncreaseAndDecraseButton(value)
        .clickFirstFieldTimeCode()
        .clickAndAddTimecode(TIMECODEREGULAR)
        .clickSubmitButton();
  });

  it('should be able to add a time entry for hours and apply to all days in period', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickApplyToAllDaysInPeriodSwitchElement()
    .clickSubmitButton();
  });

  it('should be able to edit time entry', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAllocationAction()
    .clickeditTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickHoursInputField()
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickSubmitButton();
  });

  it('should be able to apply to all days through allocation actions', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAllocationAction()
    .clickApplyToAllDayRowAction();
  });

  it('should be able to delete a time allocation', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAllocationAction()
    .clickDeleteTimeEntryButton();
  });

  it('should be able to add two time entry with different timecode', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursSecond()
    .clickSecondFieldTimeCode()
    .clickAndAddTimecodeSecond(TIMECODEOTHER)
    .clickSubmitButton();
  });

  it('should be able to add two time entry with different timecode and apply on all days', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursSecond()
    .clickSecondFieldTimeCode()
    .clickAndAddTimecodeSecond(TIMECODEOTHER)
    .clickApplyToAllDaysInPeriodSwitchElement()
    .clickSubmitButton();
  });

  it('should be NOT able to add two time entry with same timecode', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursSecond()
    .clickSecondFieldTimeCode()
    .clickAndAddTimecodeSecond(TIMECODEOTHER)
    .clickSumbitAndGetError();
  });

  it('should be able to add two time entry with different cost centers', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenterSecond(COSTCENTER2)
    .clickAndAddHoursSecond()
    .clickSecondFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickSubmitButton();
  });

  it('should be able to add three time entry with different cost centers and timecode', async () => {
    await addTimeEntry
    .clickTimesheet(timesheets)
    .clickAddTimeEntryButton()
    .clickFirstFieldCostCenter()
    .clickAndGetCostCenter(COSTCENTER1)
    .clickAndAddHoursInput()
    .clickIncreaseAndDecraseButton(value)
    .clickFirstFieldTimeCode()
    .clickAndAddTimecode(TIMECODEREGULAR)
    .clickAddNewEntry()
    .clickSecondFieldCostCenter()
    .clickAndGetCostCenterSecond(COSTCENTER2)
    .clickAndAddHoursSecond()
    .clickSecondFieldTimeCode()
    .clickAndAddTimecodeSecond(TIMECODEOTHER)
    .clickAddNewEntry()
    .clickThirdFieldCostCenter()
    .clickAndGetCostCenterThird(COSTCENTER3)
    .clickAndAddHoursThird()
    .clickIncreaseAndDecraseButton(value)
    .clickThirdFieldTimeCode()
    .clickAndAddTimecodeThird(TIMECODETEST)
    .clickSubmitButton();
  });
});
