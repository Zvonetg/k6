import { CreateExpenseMediaModel, ExpenseModel, ExpensesModel } from 'gwg';
import { CREATE_EXPENSE } from 'src/tests/api/CREATE_EXPENSE';
import Random from 'src/tests/common/Random';
import Page from '../Page';
import { CREATE_EXPENSES_FOR_WORKER } from '../../api/CREATE_EXPENSES_FOR_WORKER';
import {toSync} from "../../../utils/utils/toSync";

export enum WorkerCategoryExpensesTypes {
  TRAVEL = 'Travel',
  MEAL = 'Meal',
  OTHER = 'Other'
}

export class WorkerExpenses extends Page {
  public static async open() {
    await Page.open('worker/');
  }

  public static async getOpenExpensesByUid(uid: string) {
    return $(`div[data-test="open-expense-item-${uid}"]`);
  }

  async clickGetOpenExpensesApproved(expenses) {
    const expensesUid = expenses?.filter?.((t) => t.status === 'APPROVED')?.[0]?.uid;
    await (await WorkerExpenses.getOpenExpensesByUid(expensesUid)).waitForExist();
    await (await WorkerExpenses.getOpenExpensesByUid(expensesUid)).click();
    return this;
  }

  async clickLabelElement(clientLabelElement) {
    await clientLabelElement.waitForExist();
    await clientLabelElement.click();
    return this;
  }

  async clickGetOpenExpensesRejected(expenses) {
    const expensesUid = expenses?.filter?.((t) => t.status === 'REJECTED')?.[0]?.uid;
    await (await WorkerExpenses.getOpenExpensesByUid(expensesUid)).waitForExist();
    await (await WorkerExpenses.getOpenExpensesByUid(expensesUid)).click();
    return this;
  }

  static getHistoryExpensesUid(uid: string) {
    return $(`div[data-test="open-expense-item-${uid}"] button`);
  }

  get addOptionMenu() {
    return $('[data-test="options-menu"]');
  }

  async clickAddOptionMenu() {
    await this.addOptionMenu.waitForExist();
    await this.addOptionMenu.click();
    await browser.pause(1000);
    return this;
  }

  get addHistoryExpenses() {
    return $('[data-test="history-expenses-link"]');
  }

  async clickAddHistoryExpenses() {
    await this.addHistoryExpenses.waitForExist()
    await this.addHistoryExpenses.click()
    return this;
  }

  get addCorrectButton() {
    return $('[data-test="correct-button"]');
  }

  async clickAddCorrectButton() {
    await this.addCorrectButton.waitForExist()
    await this.addCorrectButton.click()
    return this;
  }

  get correctApprovedExpense() {
    return $('[data-test="button"]');
  }

  async clickCorrectApprovedExpense() {
    await this.correctApprovedExpense.waitForExist();
    await this.correctApprovedExpense.click();
    expect (await this.correctAnExpensesForm).toExist();
    return this;
  }

  get addEditButton() {
    return $('[data-test="edit-button"]');
  }

  async clickAddEditButton() {
    await this.addEditButton.waitForExist();
    await this.addEditButton.click();
    return this;
  }

  get addExpenses() {
    return $('[data-test="button"]');
  }

  async clickAddExpenses() {
    await this.addExpenses.waitForExist();
    await this.addExpenses.click();
    return this;
  }

  get expensesNavigationLink() {
    return $('a[title="Expenses"]');
  }

  async clickExpensesNavigationLink() {
    await this.expensesNavigationLink.waitForExist();
    await this.expensesNavigationLink.click();
    return this;
  }
  
  get addEngagement() {
    return $('[data-test="expenseModel.engagementUid-field"]');
  }

  async clickAddEngagement() {
    await this.addEngagement.waitForExist();
    await this.addEngagement.click();
    return this;
  }

  get addCostCenter() {
    return $('[data-test="expenseModel.costCenterUid-field"]');
  }

  async clickAddCostCenter() {
    await this.addCostCenter.waitForExist();
    await this.addCostCenter.click();
    return this;
  }

  async getCostCenterLabel(costCenterName: string) {
    return $(`[data-test-value="${costCenterName}"]`);
  }

  async clickAndGetCostCenter(costCenterName: string) {
    await (await workerExpenses.getCostCenterLabel(costCenterName)).waitForExist();
    await (await workerExpenses.getCostCenterLabel(costCenterName)).click();
    return this;
  }

  get addCategory() {
    return $('[data-test="expenseModel.category.uid-field"]');
  }

  async clickAddCategory() {
    await this.addCategory.waitForExist();
    await this.addCategory.click();
    return this;
  }

  async selectCategoryExpensesType(expensesType: WorkerCategoryExpensesTypes) {
    let selectedCategoryElement;
    switch (expensesType) {
      case WorkerCategoryExpensesTypes.TRAVEL:
        selectedCategoryElement = await workerExpenses.travelCategory;
        break;
      case WorkerCategoryExpensesTypes.MEAL:
        selectedCategoryElement = await workerExpenses.mealCategory;
        break;
      case WorkerCategoryExpensesTypes.OTHER:
        selectedCategoryElement = await workerExpenses.otherCategory;
        break;
    }
    await selectedCategoryElement.waitForExist();
    await selectedCategoryElement.click();
    return this;
  }

  get travelCategory() {
    return $(`[data-test-value="Travel"]`);
  }

  get mealCategory() {
    return $(`[data-test-value="Meal"]`);
  }

  get otherCategory() {
    return $(`[data-test-value="Other"]`);
  }

  get addExpensesAmount() {
    return $('div[data-test="amount.currency.code-field"]');
  }

  get addExpensesAmountItem() {
    return $('li[data-test="select-menu-item"]');
  }

  get addExpensesAmountDetails() {
    return $('input[data-test="expense-details-amount"]');
  }

  get addDescription() {
    return $('[data-test="expense-details-description"]');
  }

  async clickAndAddDescription() {
    await this.addDescription.waitForExist()
    await this.addDescription.click()
    await this.addDescription.setValue(`${Random.randomString()}`);
    return this;
  }

  get addMerchant() {
    return $('[data-test="expense-details-vendor"]');
  }

  static get addMerchant() {
    return $('[data-test="expense-details-vendor"]');
  }

  async clickAndAddMerchant() {
    const element = await WorkerExpenses.addMerchant;
    await element.scrollIntoView();
    await this.addMerchant.waitForExist()
    await this.addMerchant.click()
    await this.addMerchant.setValue(`${Random.randomString()}`);
    return this;
  }

  get addDate() {
    return $('[data-test="expense-details-date-spent"]');
  }

  async clickAndAddDate(date: number) {
    await this.addDate.waitForExist()
    await this.addDate.click()
    await this.addDate.setValue(date);
    return this;
  }

  static get correctAnExpense() {
    return $('[data-test="correct-button"]');
  }

  get addToExpensesSubmitButton() {
    return $('[data-test="submit-button"]');
  }

  async clickExpenseSubmit() {
    await this.addToExpensesSubmitButton.waitForExist();
    await this.addToExpensesSubmitButton.click();
    expect (await this.addToExpensesSubmitButton).toExist();
    return this;
  }

  get addToExpensesSaveButton() {
    return $('[data-test="save-button"]');
  }

  async clickExpenseSave() {
    await this.addToExpensesSaveButton.waitForExist();
    await this.addToExpensesSaveButton.click();
    expect (await this.submitToasterMessage).toExist();
    return this;
  }

  get submitToasterMessage() {
    return $('[data-test="submit-expense-success"]');
  }

  static get correctExpenseMessage() {
    return $('[data-test="correct-expense-success"]');
  }

  get correctAnExpensesForm() {
    return $('[data-test="modal__content"]');
  }

  async addExpensesAmountAndDetails(amount: number) {
    await this.addExpensesAmount.waitForExist();
    await this.addExpensesAmount.click();
    await browser.pause(1000);
    await this.addExpensesAmountItem.waitForExist();
    await this.addExpensesAmountItem.click();
    await this.addExpensesAmountDetails.waitForExist();
    await this.addExpensesAmountDetails.click();
    await this.addExpensesAmountDetails.setValue(amount);
    return this;
  }

  createExpense(expenseModel: ExpenseModel, attachments: CreateExpenseMediaModel) {
    return this.graphql<{ createExpense: ExpenseModel }>({
      query: CREATE_EXPENSE.loc.source.body,
      variables: {
        uid: expenseModel.uid,
        engagementUid: expenseModel.engagementUid
      }
    });
  }

  createWorkerExpenses() {
    return this.graphql<{ dev_createRandomExpensesForWorker: ExpensesModel }>({
      query: CREATE_EXPENSES_FOR_WORKER.loc.source.body
    });
  }
}

export const workerExpenses = toSync(new WorkerExpenses());


