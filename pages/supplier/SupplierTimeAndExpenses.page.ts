import { GwgTimesheetPageModel, GwgTimesheetStatusModel } from 'gwg';
import { CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER } from '../../api/CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER';
import Page from '../Page';
import { REMOVE_ALL_TIMESHEETS } from '../../api/REMOVE_ALL_TIMESHEETS';
import DatePicker, { DateFormat } from '../../common/DatePicker';


class TimeAndExpenses extends Page {
  static startDatePicker = new DatePicker('#start-date');

  static endDatePicker = new DatePicker('#end-date');

  static get filterSideMenuButton() {
    return $('button[data-test="filter-side-menu"]');
  }

  static async toggleFilterSideMenu() {
    return (await TimeAndExpenses.filterSideMenuButton).click();
  }

  static setFromDate(startDate: any) {
    const [year, month, day] = startDate.split('-');
    this.startDatePicker.pickDate(
      {
        day,
        month,
        year
      },
      DateFormat.ymd
    );
  }

  static setToDate(endDate: any) {
    const [year, month, day] = endDate.split('-');
    this.endDatePicker.pickDate(
      {
        day,
        month,
        year
      },
      DateFormat.ymd
    );
  }

  public static async open() {
    await Page.open('supplier/time-and-expenses');
  }

  static get timesheetIdButton() {
    return $('tr:nth-child(2) td:nth-child(2)');
  }

  static get chevron() {
    return $(`[data-test="open-allocation-chevron"]`);
  }

  static get allocationCostCenterName() {
    return $(`[data-test="allocation-cost-center"]`);
  }

  static get allocationTimeCode() {
    return $(`[data-test="allocation-time-code"]`);
  }

  static get allocationHours() {
    return $(`[data-test="allocation-hours"]`);
  }

  static get allocationAmount() {
    return $(`[data-test="allocation-amount"]`);
  }

  static get contextOptionsButton() {
    return $('button[data-test="tae-table-context-menu"]');
  }

  static get exportToCsv() {
    return $('button[data-test="button-bulk-csv"]');
  }

  static get exportToExcel() {
    return $('button[data-test="button-bulk-excel"]');
  }

  static get successfulExportedTimesheetsToaster() {
    return $(`div[data-test="successfully-exported-timesheets"]`);
  }

  static get searchInput() {
    return $('[data-test="search-input"]');
  }

  static get totalCount() {
    return $('div[data-test="data-table-message"]');
  }

  static get statusFilterButton() {
    return $('[data-test="filtered-header-icon"]');
  }

  static get workerSortButton() {
    return $('[data-test-type="WORKER"] button[data-test="sort-button"]');
  }

  static get modifiedSortButton() {
    return $('[data-test="MODIFIED-sort-down"]');
  }

  static get checkAllCheckbox() {
    return $('[data-test="checkbox"]');
  }

  static getStatusFilterCheckbox(status: GwgTimesheetStatusModel) {
    return $(`[data-test="checkbox-tree"] [data-test="${status}"] label`);
  }

  static async toggleStatusFilterCheckbox(status: GwgTimesheetStatusModel) {
    const value = (await (await TimeAndExpenses.getStatusFilterCheckbox(status)).$('checkbox')).getValue();
    await (await TimeAndExpenses.getStatusFilterCheckbox(status)).click();
    await browser.waitUntil(
      async () => (await (await TimeAndExpenses.getStatusFilterCheckbox(status)).$('checkbox')).getValue() !== value
    );
    return TimeAndExpenses.getStatusFilterCheckbox(status);
  }

  static async waitForTotalCountToBe(count: number) {
    return browser.waitUntil(
      async () => (await (await TimeAndExpenses.totalCount).getText()) !== `Viewing ${count} Timesheets`
    );
  }

  static async search(search: string) {
    await (await TimeAndExpenses.searchInput).waitForExist();
    await (await TimeAndExpenses.searchInput).setValue(search);
    await browser.waitUntil(async () => (await (await TimeAndExpenses.searchInput).getValue()) === search);
    return this;
  }

  static async getLineItems() {
    return $$(`[data-test="time-and-expenses-table-container"] tbody tr:not(.oc-no-result-table-item)`);
  }

  static get getRowItem() {
    return $(`[data-test="data-table-row"]`);
  }

  static getLineItemsWorkerNames() {
    return $$(`[data-test="time-and-expenses-table-container"] tbody tr:not(.oc-no-result-table-item) td:nth-child(7)`);
  }

  static getLineItemsModified() {
    return $$(`[data-test="time-and-expenses-table-container"] tbody tr:not(.oc-no-result-table-item) td:nth-child(7)`);
  }

  static async getStatuses(status: string) {
    return $$(
      `//div[@data-test="time-and-expenses-table-container"]//tbody//tr[not(contains(@class, 'oc-no-result-table-item'))]//td[contains(., "${status}")]`
    );
  }

  static lineItemCheckbox(uid: string) {
    return $(`span[data-test="checkbox"]`);
  }

  static ItemCheckbox() {
    return $(`span[data-test="checkbox"]`);
  }

  static lineItemId(number: number) {
    return $(`td[data-test="button-open-timesheet-details-version-id-${number}"]`);
  }

  static lineItemWorkerName(uid: string) {
    return $(`td[data-test="worker-${uid}"]`);
  }

  static lineItemStatus(uid: string) {
    return $(`td[data-test="status-${uid}"]`);
  }

  static lineItemDate(uid: string) {
    return $(`td[data-test="date-${uid}"]`);
  }

  async createWorkerTimesheetsForSupplier() {
    return this.graphql<{ dev_createWorkerTimesheetsForSupplier: GwgTimesheetPageModel }>({
      query: CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER.loc.source.body
    });
  }

  async removeAllTimesheets() {
    return this.graphql<{ dev_removeAllTimesheets: Boolean }>({
      query: REMOVE_ALL_TIMESHEETS.loc.source.body
    });
  }
}

export default TimeAndExpenses;
