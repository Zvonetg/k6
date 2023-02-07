import { GwgEngagementModel, GwgTimesheetPageModel } from 'gwg';
import { CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER } from 'src/tests/api/CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER';
import { CREATE_ENGAGEMENT } from '../api/CREATE_ENGAGEMENT';
import { REMOVE_ALL_TIMESHEETS } from '../api/REMOVE_ALL_TIMESHEETS';
import Page from './Page';

class SupplierHomePage extends Page {
  static get tasksPageButton() {
    return $('.desktop button[data-test="task-icon"]');
  }

  public static async openTimesheets() {
    await Page.open('supplier/time-and-expenses');
  }

  static get jobPostingsButton() {
    return $('a[title="Job Postings"]');
  }

  static get AdminSettingsButton() {
    return $('a[title="Admin Settings"]');
  }

  static get TimeAndExpensesButton() {
    return $('a[title="Time & Expenses"]');
  }

  static get expensesButtonNavigation() {
    return $('a[title="Expenses"]');
  }

  static get remindMeLaterTaskButon() {
    return $('button[data-test="dismiss-button"]');
  }

  static get addSearchWorkforce() {
    return $('[data-test="search-input"]');
  }

  static get dropDownButton() {
    return $('button[data-test="icon-dropdown-button"]');
  }

  static get confirmButton() {
    return $('button[data-test="confirm-button"]');
  }

  static get smartFormPrompt() {
    return $('div[data-test="prompt-SMARTFORM"]');
  }

  static get updateSuccessProfileMessage() {
    return $('div[data-test="update-profile"]');
  }

  static get updateSuccessProfile() {
    return $('div[data-test="updated-profile"]');
  }

  static getCostCenterLabel(costCenterName: string) {
    return $(`div[data-test="${costCenterName}"]`);
  }
  
  static get bulkActionJobPosting() {
    return $('[data-test="add-job-posting"]');
  }

  static get bulkActionAddEngagement() {
    return $('[data-test="add-engagement"]');
  }


  static get formOpen() {
    return $('[data-test="modal__content"]');
  }

  static saveChangesButton() {
    return $('[data-test="save-changes-button"]');
  }

  createSupplierTimesheet() {
    return this.graphql<{ dev_createWorkerTimesheetsForSupplier: GwgTimesheetPageModel }>({
      query: CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER.loc.source.body
    });
  }

  static async search(search: string) {
    await (await SupplierHomePage.addSearchInput).waitForExist();
    await (await SupplierHomePage.addSearchInput).setValue(search);
    await browser.waitUntil(async () => (await (await SupplierHomePage.addSearchInput).getValue()) === search);
    return this;
  }

  static get addSearchInput() {
    return $('[data-test="search-input"]');
  }

  static get tableRow() {
    return $('[data-test="data-table-row"]');
  }

  createEngagement(workerUid: string, engagementToCreate: Partial<GwgEngagementModel>) {
    return this.graphql<{ createEngagement: GwgEngagementModel }>({
        query: CREATE_ENGAGEMENT.loc.source.body,
        variables: {
            workerUid,
            engagement: engagementToCreate
        }
    });
}

removeAllTimesheet() {
  return this.graphql<{ dev_removeAllTimesheets: GwgTimesheetPageModel }>({
    query: REMOVE_ALL_TIMESHEETS.loc.source.body
  });
}

}

export default SupplierHomePage;
