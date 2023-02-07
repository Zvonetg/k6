import { ExpensesModel, WorkerProfileModel } from 'gwg';
import { CREATE_EXPENSES_FOR_WORKER } from '../api/CREATE_EXPENSES_FOR_WORKER';
import { GET_PROFILE_SELF } from '../api/GET_PROFILE_SELF';
import Page from './Page';

export enum WorkerCategoryExpensesTypes {
  TRAVEL = 'Travel',
  MEAL = 'Meal',
  OTHER = 'Other'
}
class WorkerHomePage extends Page {
  public static async open() {
    await Page.open('worker/');
  }

  public static async openTimesheets() {
    await Page.open('worker/timesheets');
  }

  public static async openPath(path: string) {
    await Page.open(`worker/${path}`);
  }

  static get viewAllEngagementsLink() {
    return $(`a[data-test="Engagements"]`);
  }

  static get timesheetsNavigationLink() {
    return $('a[title="Timesheets"]');
  }

  static get expensesNavigationLink() {
    return $('a[title="Expenses"]');
  }

  static get engagementsNavigationLink() {
    return $('a[title="Engagements"]');
  }

  static get myAccountLink() {
    return $('a[title="My Profile"]');
  }

  static get openMenuButton() {
    return $('[data-test="button"]');
  }

  static get viewTimesheetButton() {
    return $('button[data-test="view-timesheet-button"]');
  }

  static get addExpenses() {
    return $('[data-test="button"]');
  }

  static get addExpensesAmount() {
    return $('[data-test="expense-details-currency"]');
  }

  static get addExpensesAmountAED() {
    return $('[data-test="AED"]');
  }

  static get addExpensesAmountDetails() {
    return $('input[data-test="expense-details-amount"]');
  }

  static get addDescription() {
    return $('[data-test="expense-details-description"]');
  }

  static get addMerchant() {
    return $('[data-test="expense-details-vendor"]');
  }

  static get addEngagement() {
    return $('[data-test="expense-allocation-details-engagement"]');
  }

  static get addDate() {
    return $('[data-test="expense-details-date-spent"]');
  }

  static get addCategory() {
    return $('[data-test="expense-details-category"]');
  }

  static get addCategoryTravel() {
    return $('[data-test="Travel"]');
  }

  static get addCostCenter() {
    return $('[data-test="expense-allocation-details-cost-center"]');
  }

  static get addToExpensesSubmitButton() {
    return $('[data-test="submit-button"]');
  }

  static get clickOnAvatar() {
    return $('[data-test="avatar-icon"]');
  }

  static get avatarFiledUpload() {
    return $('[data-test="button"]');
  }

  static get avatarFieldInput() {
    return $('[data-test="profile-picture-input"]');
  }

  static get addToExpensesSaveButton() {
    return $('[data-test="save-button"]');
  }

  static get selectBody() {
    return $('[data-test="form"]');
  }

  static get saveToasterMessage() {
    return $('[data-test="create-expense-success"]');
  }

  static get submitToasterMessage() {
    return $('[data-test="submit-expense-success"]');
  }

  static getCostCenterLabel(costCenterName: string) {
    return $(`div[data-test="${costCenterName}"]`);
  }

  static getClient(clientName: string) {
    return $(`[data-test-value="${clientName}"]`);
  }

  static getEngagement(engagementName: string) {
    return $(`[data-test="${engagementName}"]`);
  }

  static get travelCategory() {
    return $(`[data-test-value="Travel"]`);
  }

  static get mealCategory() {
    return $(`[data-test-value="Meal"]`);
  }

  static get otherCategory() {
    return $(`[data-test-value="Other"]`);
  }

  async selectCategoryExpensesType(expensesType: WorkerCategoryExpensesTypes) {
    let selectedCategoryElement;
    switch (expensesType) {
      case WorkerCategoryExpensesTypes.TRAVEL:
        selectedCategoryElement = await WorkerHomePage.travelCategory;
        break;
      case WorkerCategoryExpensesTypes.MEAL:
        selectedCategoryElement = await WorkerHomePage.mealCategory;
        break;
      case WorkerCategoryExpensesTypes.OTHER:
        selectedCategoryElement = await WorkerHomePage.otherCategory;
        break;
    }
    await selectedCategoryElement.waitForExist();
    await selectedCategoryElement.click();
    return this;
  }

  getWorkerProfileInfo() {
    return this.graphql<{ getProfileSelf: WorkerProfileModel }>({ query: GET_PROFILE_SELF.loc.source.body });
  }

  createWorkerExpenses() {
    return this.graphql<{ dev_createRandomExpensesForWorker: ExpensesModel }>({
      query: CREATE_EXPENSES_FOR_WORKER.loc.source.body
    });
  }
}

export default WorkerHomePage;
