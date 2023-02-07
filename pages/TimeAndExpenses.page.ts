import { GwgTimesheetPageModel } from 'gwg';
import { CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER } from '../api/CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER';
import {REMOVE_ALL_TIMESHEETS} from "../api/REMOVE_ALL_TIMESHEETS";
import Page from './Page';

class TimeAndExpenses extends Page {

  static timesheetIdButton(number: number) {
    return $(`div[data-test="${number}-number"]`);
  }

  static timesheetIdOpen(number: number) {
    return $(`div[data-test="button-open-timesheet-details-version-id-${number}"]`);
  }

  static expandAllButton() {
    return $(`[data-test="toggle-allocations-button"]`);
  }

  static sidePanel() {
    return $('div[data-test="timesheet-details-side-panel"]');
  }

  static get allocationCostCenterName() {
    return $(`[data-test="allocation-cost-center"]`);
  }

  static workerSection() {
    return $('[data-test="worker-section"]');
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

  static get bulkActionCsv() {
    return $(`[data-test="button-bulk-csv"]`);
  }

  static get checkbox() {
    return $(`[data-test="checkbox"]`);
  }

  static get successfullyToastMessage() {
    return $(`[data-test="successfully-exported-timesheets"]`);
  }

  createSupplierTimesheet() {
    return this.graphql<{ dev_createWorkerTimesheetsForSupplier: GwgTimesheetPageModel }>({
      query: CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER.loc.source.body
    });
  }

  removeAllTimesheet() {
    return this.graphql<{ dev_removeAllTimesheets: GwgTimesheetPageModel }>({
      query: REMOVE_ALL_TIMESHEETS.loc.source.body
    });
  }

}

export default TimeAndExpenses;
