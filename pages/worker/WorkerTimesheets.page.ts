import { GwgTimesheetPageModel } from 'gwg';
import { CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER } from '../../api/CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER';
import Page from '../Page';

class TimeAndExpenses extends Page {
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

  async createWorkerTimesheetsForSupplier() {
    return this.graphql<{ dev_createWorkerTimesheetsForSupplier: GwgTimesheetPageModel }>({
      query: CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER.loc.source.body
    });
  }
}

export default TimeAndExpenses;
