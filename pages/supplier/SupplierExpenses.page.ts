import Page from '../Page';
import {toSync} from "../../../utils/utils/toSync";

class SupplierExpenses extends Page {
    get expensesButtonNavigation() {
        return $('a[title="Expenses"]');
    }

    get addExpenses() {
        return $('[data-test="button"]');
    }

    get navigateToExpenses() {
        return $('a[title="Expenses"]');
    }

    async clickNavigateToExpenses(){
        await this.navigateToExpenses.waitForExist();
        await this.navigateToExpenses.click();
        return this;
    }

    static get addWorkerExpenses() {
        return $('[data-test="expense-type-card-worker-expense"]');
    }

    get addGeneralExpenses() {
        return $('[data-test="expense-type-card-general-expense"]');
    }

    async clickAddGeneral(){
        await this.addGeneralExpenses.waitForExist();
        await this.addGeneralExpenses.click();
        return this;
    }

    get expensesEnterprise() {
        return $('[data-test="expenseModel.enterpriseUid-field"]');
    }

    get expensesFirstEnterprise() {
        return $('[data-test="select-menu-item"]');
    }

    static get rowActionExpenses() {
        return $('[data-test="data-table-row-actions-button"]');
    }

    get expensesFirstCostCenter() {
        return $('[data-test="select-menu-item"]');
    }

    get expensesFirstCategory() {
        return $('[data-test="select-menu-item"]');
    }

    get addCostCenter() {
        return $('[data-test="expenseModel.costCenterUid-field"]');
    }

    static getCostCenterLabel(costCenterName: string) {
        return $(`[data-test="${costCenterName}"]`);
    }

    get addCategory() {
        return $('[data-test="categoryUid-field"]');
    }

    get addToExpensesSubmitButton() {
        return $('[data-test="submit-button"]');
    }

    async clickAddToExpensesSubmitButton(){
        await this.addToExpensesSubmitButton.waitForExist();
        await this.addToExpensesSubmitButton.click();
        expect (await this.expensesSumbitToastMessage).toExist();
        return this;
    }

    get addToExpensesSaveButton() {
        return $('[data-test="save-button"]');
    }

    async clickAddToExpensesSaveButton(){
        await this.addToExpensesSaveButton.waitForExist();
        await this.addToExpensesSaveButton.click();
        expect (await this.expensesSumbitToastMessage).toExist();
        return this;
    }

    static get addCategoryTravel() {
        return $('[data-test="Travel"]');
    }

    get addExpensesAmount() {
        return $('[data-test="amount.currency.code-field"]');
    }

    get addFirstExpensesAmount() {
        return $('[data-test="select-menu-item"]');
    }

    get addExpensesAmountDetails() {
        return $('[data-test="expense-details-amount"]');
    }

    async clickAddExpensesAmountDetails(amount: number){
        await this.addExpensesAmountDetails.waitForExist();
        await this.addExpensesAmountDetails.click();
        await this.addExpensesAmountDetails.setValue(amount);
        return this;
    }

    async clickAddDescription(text: string){
        await this.addDescription.waitForExist();
        await this.addDescription.click();
        await this.addDescription.setValue(text);
        return this;
    }

    async clickAddMerchant(text: string){
        const element = await SupplierExpenses.addMerchant;
        await element.scrollIntoView();
        await this.addMerchant.waitForExist();
        await this.addMerchant.click();
        await this.addMerchant.setValue(text);
        return this;
    }

    get addDescription() {
        return $('[data-test="expense-details-description"]');
    }

    get addMerchant() {
        return $('[data-test="expense-details-vendor"]');
    }

    static get addMerchant() {
        return $('[data-test="expense-details-vendor"]');
    }

    get addDate() {
        return $('[data-test="expense-details-date-spent"]');
    }

    async clickAddDate(date: number){
        await this.addDate.waitForExist();
        await this.addDate.click();
        await this.addDate.setValue(date);
        return this;
    }

    static get createExpensesDialog() {
        return $('[data-test="create_expense-dialog"]');
    }

    get expensesSumbitToastMessage() {
        return $('[data-test="create-expense-success"]');
    }

    static get clickOnId() {
        return $('[data-test="overflow-typography"]');
    }

    static get submitExpenseButton() {
        return $('[data-test="submit-expense-button"]');
    }

    static get importButton() {
        return $('[data-test="iconButton-import"]');
    }

    get exportButton() {
        return $('[data-test="data-table-row-actions-button"]');
    }

    async clickExportButton(){
        await this.exportButton.waitForExist();
        await this.exportButton.click();
        return this;
    }

    static get checkbox() {
        return $('[data-test="checkbox"]');
    }

    static get bulkActionCsv() {
        return $('[data-test="button-bulk-csv"]');
    }

    static get bulkActionExcel() {
        return $('[data-test="button-bulk-excel"]');
    }

    get successfullyExportToastMessage() {
        return $('[data-test="successfully-exported-expenses"]');
    }

    get exportAsCsv() {
        return $('[data-test="iconButton-export-csv"]');
    }

    async clickExportToCsv(){
        await this.exportAsCsv.waitForExist();
        await this.exportAsCsv.click();
        expect (await this.successfullyExportToastMessage).toExist();
        return this;
    }

    static get exportAsExcel() {
        return $('[data-test="iconButton-export-excel"]');
    }

    async openExpenses() {
        await this.expensesButtonNavigation.waitForExist();
        await this.expensesButtonNavigation.click();
        await browser.pause(1000);
        await this.addExpenses.waitForExist();
        await this.addExpenses.click();
        return this;
    }

    async clickAddEnterprise() {
        await this.expensesEnterprise.waitForExist();
        await this.expensesEnterprise.click();
        await browser.pause(1000);
        await this.expensesFirstEnterprise.waitForExist();
        await this.expensesFirstEnterprise.click();
        return this;
    }

    async clickAddFirstCostCenter() {
        await this.addCostCenter.waitForExist();
        await this.addCostCenter.click();
        await browser.pause(1000);
        await this.expensesFirstCostCenter.waitForExist();
        await this.expensesFirstCostCenter.click();
        return this;
    }

    async clickAddFirstCategory() {
        await this.addCategory.waitForExist();
        await this.addCategory.click();
        await browser.pause(1000);
        await this.expensesFirstCategory.waitForExist();
        await this.expensesFirstCategory.click();
        return this;
    }

    async clickAddFirstAmount() {
        await this.addExpensesAmount.waitForExist();
        await this.addExpensesAmount.click();
        await browser.pause(1000);
        await this.addFirstExpensesAmount.waitForExist();
        await this.addFirstExpensesAmount.click();
        return this;
    }

}

export const supplierExpenses = toSync(new SupplierExpenses());
