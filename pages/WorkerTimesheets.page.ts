import { GwgTimesheetPageModel } from 'gwg';
import { CREATE_TIMESHEETS_FOR_WORKER } from 'src/tests/api/CREATE_TIMESHEETS_FOR_WORKER';

import Page from './Page';

class WorkerTimesheetPage extends Page {
  static getOpenTimesheetByUid(uid: string) {
    return $(`div[data-test="open-timesheet-item-${uid}"]`);
  }

  static getHistoryTimesheetbyUid(uid: string) {
    return $(`div[data-test="timesheet-history-item-${uid}"] button`);
  }

  static getTimesheetCorrectButton() {
    return $('[data-test="timesheet-correct"]');
  }

  static getTimesheetDetailsButton() {
    return $(`[data-test="timesheet-details"]`);
  }

  static getOpenTimesheetSubmitButtonByUid(uid: string) {
    return $(`div[data-test="open-timesheet-item-${uid}"] button`);
  }

  static getWindowCorrectApprovedTimesheet() {
    return $('div[data-test="modal__content"]');
  }

  static get timesheetSubmissionSuccessToast() {
    return $('div[data-test="timesheet-submission-success"]');
  }

  static get allHistoryTimesheetsNavigationLink() {
    return $('a[data-test="history-timesheets-link"]');
  }

  createWorkerTimesheets() {
    return this.graphql<{ createTimesheetForWorker: GwgTimesheetPageModel }>({
      query: CREATE_TIMESHEETS_FOR_WORKER.loc.source.body
    });
  }
}

export default WorkerTimesheetPage;
