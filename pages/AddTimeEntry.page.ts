import {toSync} from "../../utils/utils/toSync";
import Page from './Page';


class AddTimeEntryPage extends Page {
  async hoursInputField(index: number) {
    return $(`[data-test="timesheets.${index}.hours-field-control"] input`);
  }

  async clickAndAddHoursInput() {
    await addTimeEntry.hoursInputField(0).waitForExist();
    await addTimeEntry.hoursInputField(0).click();
    await addTimeEntry.hoursInputField(0).setValue(8);
    return this;
  }

    async clickAndAddHoursSecond() {
    await addTimeEntry.hoursInputField(1).waitForExist();
    await addTimeEntry.hoursInputField(1).click();
    await addTimeEntry.hoursInputField(1).setValue(8);
    return this;
  }

  async clickAndAddHoursThird() {
    await addTimeEntry.hoursInputField(2).waitForExist();
    await addTimeEntry.hoursInputField(2).click();
    await addTimeEntry.hoursInputField(2).setValue(8);
    return this;
  }

  async clickHoursInputField() {
    await addTimeEntry.hoursInputField(0).waitForExist();
    await addTimeEntry.hoursInputField(0).doubleClick();
    await browser.pause(1000);
    await browser.keys('Delete');
    await addTimeEntry.hoursInputField(0).setValue(6);
    return this;
  }

  async clickAllocationAction() {
    await addTimeEntry.allocationActions(0).waitForExist();
    await addTimeEntry.allocationActions(0).click();
    return this;
  }

  async clickIncreaseAndDecraseButton(value: string) {
    await this.counterIncreaseButton.waitForExist();
    await this.counterIncreaseButton.click();
    await this.counterInput.getValue();
    await this.counterDecreaseButton.waitForExist();
    await this.counterDecreaseButton.click();
    return this;
  }

  async costCenterInputField(index: number) {
    return $(`[data-test="timesheets.${index}.costCenter-field-control"] button`);
  }

  async clickFirstFieldCostCenter() {
    await addTimeEntry.costCenterInputField(0).waitForExist();
    await addTimeEntry.costCenterInputField(0).click();
    return this;
  }

  async clickSecondFieldCostCenter() {
    await addTimeEntry.costCenterInputField(1).waitForExist();
    await addTimeEntry.costCenterInputField(1).click();
    return this;
  }

  async clickThirdFieldCostCenter() {
    await addTimeEntry.costCenterInputField(2).waitForExist();
    await addTimeEntry.costCenterInputField(2).click();
    return this;
  }

  async timeCodeInputField(index: number) {
    return $(`[data-test="timesheets.${index}.timeCode-field-control"] button`);
  }

  async clickFirstFieldTimeCode() {
    await addTimeEntry.timeCodeInputField(0).waitForExist();
    await addTimeEntry.timeCodeInputField(0).click();
    return this;
  }

  async clickSecondFieldTimeCode() {
    await addTimeEntry.timeCodeInputField(1).waitForExist();
    await addTimeEntry.timeCodeInputField(1).click();
    return this;
  }

  async clickThirdFieldTimeCode() {
    await addTimeEntry.timeCodeInputField(2).waitForExist();
    await addTimeEntry.timeCodeInputField(2).click();
    return this;
  }

  get addTimeEntryButton() {
    return $('[data-test="add-time-button"]');
  }

  async clickAddTimeEntryButton() {
    await this.addTimeEntryButton.waitForExist();
    await this.addTimeEntryButton.click();
    await browser.pause(1000);
    return this;
  }

  async getOpenTimesheetByUid(uid: string) {
    return $(`div[data-test="open-timesheet-item-${uid}"]`);
  }

  async clickTimesheet(timesheets) {
    const timesheetUid = timesheets?.filter?.((t) => t.status === 'WAITING_FOR_SUBMISSION')?.[0]?.uid;
    await addTimeEntry.getOpenTimesheetByUid(timesheetUid).waitForExist();
    await addTimeEntry.getOpenTimesheetByUid(timesheetUid).click();
    return this;
  }

  async getCostCenterLabel(costCenterName: string) {
    return $(`[data-test="${costCenterName}"]`);
  }

  async clickAndGetCostCenter(COSTCENTER1: string) {
    await addTimeEntry.getCostCenterLabel(COSTCENTER1).waitForExist();
    await addTimeEntry.getCostCenterLabel(COSTCENTER1).click();
    return this;
  }

  async clickAndGetCostCenterSecond(COSTCENTER2: string) {
    await addTimeEntry.getCostCenterLabel(COSTCENTER2).waitForExist();
    await addTimeEntry.getCostCenterLabel(COSTCENTER2).click();
    return this;
  }

  async clickAndGetCostCenterThird(COSTCENTER3: string) {
    await addTimeEntry.getCostCenterLabel(COSTCENTER3).waitForExist();
    await addTimeEntry.getCostCenterLabel(COSTCENTER3).click();
    return this;
  }

  get counterInput() {
    return $('[data-test="counter-input"]');
  }

  async getTimeCodeLabel(timeCodeName: string) {
    return $(`[data-test="${timeCodeName}"]`);
  }

  async clickAndAddTimecode(TIMECODEREGULAR: string) {
    await addTimeEntry.getTimeCodeLabel(TIMECODEREGULAR).waitForExist();
    await addTimeEntry.getTimeCodeLabel(TIMECODEREGULAR).click();
    return this;
  }

  async clickAndAddTimecodeSecond(TIMECODEOTHER: string) {
    await addTimeEntry.getTimeCodeLabel(TIMECODEOTHER).waitForExist();
    await addTimeEntry.getTimeCodeLabel(TIMECODEOTHER).click();
    return this;
  }

  async clickAndAddTimecodeThird(TIMECODETEST: string) {
    await addTimeEntry.getTimeCodeLabel(TIMECODETEST).waitForExist();
    await addTimeEntry.getTimeCodeLabel(TIMECODETEST).click();
    return this;
  }

  get applyToAllDaysInPeriodSwitchElement() {
    return $('[data-test="apply-to-all-available-days-in-period"]');
  }

  async clickApplyToAllDaysInPeriodSwitchElement() {
    await this.applyToAllDaysInPeriodSwitchElement.waitForExist();
    await this.applyToAllDaysInPeriodSwitchElement.click();
    return this;
  }

  get addToTimesheetSubmitButton() {
    return $('[data-test="add-to-timesheet-submit-button"]');
  }

  async clickSubmitButton() {
   this.addToTimesheetSubmitButton.waitForExist();
   this.addToTimesheetSubmitButton.click();
   expect (await this.successfullyUpdateToastMessage).toExist();
   return this;
  }

  static get applyToAllDaysInPeriodSwitch() {
    return $('[data-test="apply-to-all-available-days-in-period"]');
  }

  get counterDecreaseButton() {
    return $('[data-test="counter-decrease-button"]');
  }

  get counterIncreaseButton() {
    return $('[data-test="counter-increase-button"]');
  }

  get addNewEntry() {
    return $('span[data-test="button-add-entry"]');
  }

  async clickAddNewEntry() {
    await this.addNewEntry.waitForExist();
    await this.addNewEntry.click();
    return this;
  }

  async clickSumbitAndGetError() {
    await this.addToTimesheetSubmitButton.waitForExist();
    await this.addToTimesheetSubmitButton.click();
    expect (await this.failedUpdateToastMessage).toExist();
    return this;
  }

  get successfullyUpdateToastMessage() {
    return $('[data-test="timesheet-updated-success"]');
  }

  get failedUpdateToastMessage() {
    return $('[data-test="timesheet-update-failed"]');
  }

  static getTimeAllocationItem(allocationDate: string) {
    return $(`div[data-test="${allocationDate}"]`);
  }

  static get backButton() {
    return $('[data-test="navigation-back-icon"]');
  }

  static get dateButton() {
    return $('[data-test="button"]');
  }

  static getDate() {
    return $('[data-test="add_time_dialog"]');
  }

  static getTimeCode() {
    return $('[data-test="timesheets.0.timeCode-field-control"]');
  }

  static get addTimeEntry() {
    return $('[data-test="add-time-button"]');
  }

  static get submitTimesheetButton() {
    return $('[data-test="submit-timesheet-button"]');
  }

  static get addTimeEntryButton() {
    return $('[data-test="add-time-button"]');
  }

  get editTimeEntryButton() {
    return $('[data-test="edit-time-entry"]');
  }

  async clickeditTimeEntryButton() {
    await this.editTimeEntryButton.waitForExist()
    await this.editTimeEntryButton.click()
    await browser.pause(1000);
    return this;
  }

  get applyToAllDaysInPeriodButton() {
    return $('[data-test="apply-to-all-days-in-period"]');
  }

  async clickApplyToAllDayRowAction() {
    await this.applyToAllDaysInPeriodButton.waitForExist();
    await this.applyToAllDaysInPeriodButton.click();
    expect (await this.successfullyUpdateToastMessage).toExist();
    return this;
  }

  get deleteTimeEntryButton() {
    return $('[data-test="delete-time-entry"]');
  }

  async clickDeleteTimeEntryButton() {
    await this.deleteTimeEntryButton.waitForExist();
    await this.deleteTimeEntryButton.click();
    expect (await this.successfullyUpdateToastMessage).toExist();
    return this;
  }

  async allocationActions(index: number) {
    return $(`[data-test="timesheet-actions-${index}"]`);
  }

  static get applyToAllDaysInPeriodSwitchElement() {
    return $('[data-test="apply-to-all-days-in-period"]');
  }

  static get addToTimesheetSubmitButton() {
    return $('[data-test="add-to-timesheet-submit-button"]');
  }

  static get timesheetUpdateSuccessToast() {
    return $('[data-test="timesheet-updated-success"]');
  }

  static get timesheetSubmitSuccessToast() {
    return $('[data-test="timesheet-submission-success"]');
  }

}

export const addTimeEntry = toSync(new AddTimeEntryPage());

