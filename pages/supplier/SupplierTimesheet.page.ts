import Page from '../Page';
import {toSync} from "../../../utils/utils/toSync";

class SupplierTimesheet extends Page {
  get addTimeEntry() {
    return $('button[data-test="iconButton-add-time-entry"]');
  }

  async clickAddTimeEntry() {
    await browser.pause(2000);
    await this.addTimeEntry.waitForExist();
    await this.addTimeEntry.click();
    return this;
  }

  async clickTimesheet(timesheets) {
    await browser.pause(1000);
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.number;
    await browser.pause(1000);
    await supplierTimesheet.getOpenTimesheetByUid(timesheetUid).waitForExist();
    await supplierTimesheet.getOpenTimesheetByUid(timesheetUid).click();
    await browser.pause(1000);
    await this.addTimeEntry.waitForExist();
    await this.addTimeEntry.click();
    return this;
  }

  async clickTimesheetApproved(timesheets) {
    await browser.pause(1500);
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'APPROVED')?.[1]?.number;
    await supplierTimesheet.getOpenTimesheetByUid(timesheetUid).waitForExist();
    await supplierTimesheet.getOpenTimesheetByUid(timesheetUid).click();
    await browser.pause(1000);
    await this.addCorrectEntry.waitForExist();
    await this.addCorrectEntry.click();
    return this;
  }

  static get iconDropDown() {
    return $('[data-test="icon-dropdown-button"]');
  }

  get addCorrectEntry() {
    return $('[data-test="iconButton-correct-time-entry"]');
  }

  async clickCorrectEntry() {
    await this.addCorrectEntry.waitForExist();
    await this.addCorrectEntry.click();
    return this;
  }

  get clickCorrect() {
    return $('[data-test="button"]');
  }

  async clickCorrectButton() {
    await this.clickCorrect.waitForExist();
    await this.clickCorrect.click();
    expect (await this.updateSuccess).toExist();
    return this;
  }

  get counterInput() {
    return $('[data-test="counter-input"]');
  }

  static get clickOnId() {
    return $('[data-test="overflow-typography"]');
  }

  static get tableRow() {
    return $('[data-test="data-table-row"]');
  }

  async hoursInputField(index: number) {
    return $(`[data-test="timesheets.${index}.hours-field-control"] input`);
  }

  async clickAndAddHoursInput() {
    await supplierTimesheet.hoursInputField(0).waitForExist();
    await supplierTimesheet.hoursInputField(0).click();
    await supplierTimesheet.hoursInputField(0).setValue(8);
    return this;
  }

  async clickAndAddSecondHoursInput() {
    await supplierTimesheet.hoursInputField(1).waitForExist();
    await supplierTimesheet.hoursInputField(1).click();
    await supplierTimesheet.hoursInputField(1).setValue(8);
    return this;
  }

  async clickAndAddThirdHoursInput() {
    await supplierTimesheet.hoursInputField(2).waitForExist();
    await supplierTimesheet.hoursInputField(2).click();
    await supplierTimesheet.hoursInputField(2).setValue(8);
    return this;
  }



  get clickHours() {
    return $('[data-test="counter-input"] input');
  }

  async clickAndSetHours(hours: number) {
    await this.clickHours.waitForExist();
    await this.clickHours.click();
    await this.clickHours.setValue(hours);
    return this;
  }

  async clickIncreaseAndDecrease(value: string) {
    await this.counterIncreaseButton.waitForExist();
    await this.counterIncreaseButton.click();
    await this.counterInput.getValue();
    await this.counterDecreaseButton.waitForExist();
    await this.counterDecreaseButton.click();
    return this;
  }

  get updateSuccess() {
    return $('[data-test="timesheet-updated-success"]');
  }

  static get timeCode() {
    return $('[data-test="timesheets.0.timeCode-field-control"]');
  }

  async timeCodeInputField(index: number) {
    return $(`[data-test="timesheets.${index}.timeCode-field"]`);
  }

  async clickFirstFieldTimeCode() {
    await supplierTimesheet.timeCodeInputField(0).waitForExist();
    await supplierTimesheet.timeCodeInputField(0).click();
    return this;
  }

  async clickSecondFieldTimeCode() {
    await supplierTimesheet.timeCodeInputField(1).waitForExist();
    await supplierTimesheet.timeCodeInputField(1).click();
    return this;
  }

  async clickThirdFieldTimeCode() {
    await supplierTimesheet.timeCodeInputField(2).waitForExist();
    await supplierTimesheet.timeCodeInputField(2).click();
    return this;
  }

  async clickAndAddTimecode(TIMECODEREGULAR: string) {
    await browser.pause(1000);
    await supplierTimesheet.getTimeCodeLabel(TIMECODEREGULAR).waitForExist();
    await supplierTimesheet.getTimeCodeLabel(TIMECODEREGULAR).click();
    return this;
  }

  async clickAndAddSecondTimecode(TIMECODEOTHER: string) {
    await browser.pause(1000);
    await supplierTimesheet.getTimeCodeLabel(TIMECODEOTHER).waitForExist();
    await supplierTimesheet.getTimeCodeLabel(TIMECODEOTHER).click();
    return this;
  }

  async clickAndGetCostCenter(COSTCENTER1: string) {
    await browser.pause(1000);
    await supplierTimesheet.getCostCenterLabel(COSTCENTER1).waitForExist();
    await supplierTimesheet.getCostCenterLabel(COSTCENTER1).click();
    return this;
  }

  async clickAndGetSecondCostCenter(COSTCENTER2: string) {
    await browser.pause(1000);
    await supplierTimesheet.getCostCenterLabel(COSTCENTER2).waitForExist();
    await supplierTimesheet.getCostCenterLabel(COSTCENTER2).click();
    return this;
  }

  async clickAndGetThirdCostCenter(COSTCENTER3: string) {
    await browser.pause(1000);
    await supplierTimesheet.getCostCenterLabel(COSTCENTER3).waitForExist();
    await supplierTimesheet.getCostCenterLabel(COSTCENTER3).click();
    return this;
  }

  async clickFirstFieldCostCenter() {
    await supplierTimesheet.costCenterInputField(0).waitForExist();
    await supplierTimesheet.costCenterInputField(0).click();
    return this;
  }

  async clickSecondFieldCostCenter() {
    await supplierTimesheet.costCenterInputField(1).waitForExist();
    await supplierTimesheet.costCenterInputField(1).click();
    return this;
  }

  async clickThirdFieldCostCenter() {
    await supplierTimesheet.costCenterInputField(2).waitForExist();
    await supplierTimesheet.costCenterInputField(2).click();
    return this;
  }

  async getTimeCodeLabel(timeCodeName: string) {
    return $(`li[data-test-value="${timeCodeName}"]`);
  }

  get addToTimesheet() {
    return $('[data-test="add-to-timesheet-submit-button"]');
  }

  async clickSubmitAndGetMessage() {
    await this.addToTimesheet.waitForExist();
    await this.addToTimesheet.click();
    expect (await this.updateSuccess).toExist();
    return this;
  }

  static get costCenter() {
    return $('[data-test="timesheets.0.costCenter-field"]');
  }

  async costCenterInputField(index: number) {
    return $(`div[data-test="timesheets.${index}.costCenter-field-control"]`);
  }

  get clickFirstItem() {
    return $('[data-test="select-menu-item"]');
  }

  get workdayFiled() {
    return $('[data-test="workday-field"]');
  }

  async clickWorkdayAndPick() {
    await this.workdayFiled.waitForExist();
    await this.workdayFiled.click();
    await browser.pause(1000);
    await this.clickFirstItem.waitForExist();
    await this.clickFirstItem.click();
    return this;
  }

  static saveChangesButton() {
    return $('[data-test="save-changes-button"]');
  }

  async getOpenTimesheetByUid(timesheetUid: string) {
    return $(`div[data-test="button-open-timesheet-details-version-id-${timesheetUid}"]`);
  }

  static get expandAllButton() {
    return $('button[data-test="toggle-allocations-button"]');
  }

  static get dataTableBody() {
    return $('div[data-test="data-table-body"]');
  }

  get counterDecreaseButton() {
    return $('button[data-test="counter-decrease-button"]');
  }

  get counterIncreaseButton() {
    return $('button[data-test="counter-increase-button"]');
  }

  static get addSearchInput() {
    return $('[data-test="search-input"]');
  }

  async getCostCenterLabel(costCenterName: string) {
    return $(`li[data-test-value="${costCenterName}"]`);
  }

  static costCenterInput(index: number) {
    return $(`[data-test="timesheets.${index}.costCenter-field-control"] button`);
  }

  static timeCodeInput(index: number) {
    return $(`[data-test="timesheets.${index}.timeCode-field-control"] button`);
  }

  get addNewEntry() {
    return $('span[data-test="button-add-entry"]');
  }

  async clickAddNewEntry() {
    await this.addNewEntry.waitForExist();
    await this.addNewEntry.click();
    return this;
  }
}
export const supplierTimesheet = toSync(new SupplierTimesheet());
