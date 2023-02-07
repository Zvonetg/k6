import { GwgTimesheetResponseModel } from 'gwg';
import Auth from '../../common/Auth';
import WorkerHomePage from '../../pages/WorkerHome.page';
import WorkerTimesheetPage from '../../pages/WorkerTimesheets.page';

describe('Worker Timesheets', () => {
  
  const workerTimesheetsInstance = new WorkerTimesheetPage();
  let timesheets: Partial<GwgTimesheetResponseModel[]> = [];

  before('Login as worker', async () => {
    await Auth.loginAsWorker();
    const response = await workerTimesheetsInstance.createWorkerTimesheets();
    timesheets = response?.data?.createTimesheetForWorker?.timesheets;
  });

  it('should be able to view open timesheet through pending card on the home page', async () => {
    await WorkerHomePage.open();
    await (await WorkerHomePage.viewTimesheetButton).waitForExist();
    await (await WorkerHomePage.viewTimesheetButton).click();
    expect(await browser.getUrl()).toContain('/timesheets');
  });

  it('should be able to view open timesheet through open timesheet card on home page', async () => {
    await WorkerHomePage.open();
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.uid;
    await (await WorkerTimesheetPage.getOpenTimesheetByUid(timesheetUid)).waitForExist();
    await (await WorkerTimesheetPage.getOpenTimesheetByUid(timesheetUid)).click();
    expect(await browser.getUrl()).toContain(`/timesheets/${timesheetUid}`);
    expect(await browser.getUrl()).toContain(`/timesheets/${timesheetUid}`);
  });

  it('should be able to view all history timesheets', async () => {
    await WorkerHomePage.open();
    await (await WorkerHomePage.timesheetsNavigationLink).waitForExist();
    await (await WorkerHomePage.timesheetsNavigationLink).click();
    await (await WorkerTimesheetPage.allHistoryTimesheetsNavigationLink).waitForExist();
    await (await WorkerTimesheetPage.allHistoryTimesheetsNavigationLink).click();
    expect(await browser.getUrl()).toContain('/timesheets/history');
  });

  it('should be able to open an open timesheet', async () => {
    await WorkerHomePage.open();
    await (await WorkerHomePage.timesheetsNavigationLink).waitForExist();
    await (await WorkerHomePage.timesheetsNavigationLink).click();
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.uid;
    await (await WorkerTimesheetPage.getOpenTimesheetByUid(timesheetUid)).waitForExist();
    await (await WorkerTimesheetPage.getOpenTimesheetByUid(timesheetUid)).click();
    expect(await browser.getUrl()).toContain(`/timesheets/${timesheetUid}`);
  });

  it('should be able to open a history timesheet', async () => {
    await WorkerHomePage.open();
    await (await WorkerHomePage.timesheetsNavigationLink).waitForExist();
    await (await WorkerHomePage.timesheetsNavigationLink).waitForDisplayed();
    await (await WorkerHomePage.timesheetsNavigationLink).click();
    await (await WorkerTimesheetPage.allHistoryTimesheetsNavigationLink).waitForExist();
    await (await WorkerTimesheetPage.allHistoryTimesheetsNavigationLink).waitForDisplayed();
    await (await WorkerTimesheetPage.allHistoryTimesheetsNavigationLink).click();
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'PENDING')?.[0]?.uid;
    await (await WorkerTimesheetPage.getHistoryTimesheetbyUid(timesheetUid)).waitForExist();
    await (await WorkerTimesheetPage.getHistoryTimesheetbyUid(timesheetUid)).waitForDisplayed();
    await (await WorkerTimesheetPage.getHistoryTimesheetbyUid(timesheetUid)).click();
    await (await WorkerTimesheetPage.getTimesheetDetailsButton()).waitForExist();
    await (await WorkerTimesheetPage.getTimesheetDetailsButton()).waitForDisplayed();
    await (await WorkerTimesheetPage.getTimesheetDetailsButton()).scrollIntoView();
    await (await WorkerTimesheetPage.getTimesheetDetailsButton()).waitForClickable();
    await (await WorkerTimesheetPage.getTimesheetDetailsButton()).click();
    expect(await browser.getUrl()).toContain(`/timesheets/${timesheetUid}`);
  });

  it('should be able to submit an open timesheet', async () => {
    await WorkerHomePage.open();
    await (await WorkerHomePage.timesheetsNavigationLink).waitForExist();
    await (await WorkerHomePage.timesheetsNavigationLink).click();
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.uid;
    await (await WorkerTimesheetPage.getOpenTimesheetByUid(timesheetUid)).waitForExist();
    await (await WorkerTimesheetPage.getOpenTimesheetSubmitButtonByUid(timesheetUid)).waitForExist();
    await (await WorkerTimesheetPage.getOpenTimesheetSubmitButtonByUid(timesheetUid)).click();
    await (await WorkerTimesheetPage.timesheetSubmissionSuccessToast).waitForExist();
  });
});
