import { GwgInvoiceCreateModel, GwgTimesheetPageModel, LegalEntityModel } from 'gwg';
import Page from '../Page';
import { CREATE_ENTERPRISE } from '../../api/CREATE_ENTERPRISE';
import { CREATE_INVOICE } from '../../api/CREATE_INVOICE';
import { CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER_WITH_ENTERPRISE } from '../../api/CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER_WITH_ENTERPRISE';

const dateFormat = require('dateformat');

class SupplierInvoicesPage extends Page {
  static async openInvoicesPage() {
    await (await $('[title="Invoices"]')).click();
    await this.waitForPageToLoad();
  }

  static async getInvoiceLinkByUid(uid: string) {
    return (await $(`[data-test="invoice-${uid}"]`)).$('div[role="link"]');
  }

  static async getInvoiceCheckboxByUid(uid: string) {
    return (await $(`[data-test="invoice-${uid}"]`)).$('label');
  }

  static get getInvoiceStatusByUid() {
    return $(`[data-test="data-table-row"]`).$('span[class="MuiChip-label"]');
  }

  static get optionsButton() {
    return $('[data-test="view-options-btn"]');
  }

  static get uploadDialogButton() {
    return $('button[data-test="upload-invoice"]');
  }

  static get selectClientOption() {
    return $('[data-test="select-form-control"]');
  }

  static get uploadFileInput() {
    return $('input[id="uploadFile"]');
  }

  static async getClient(uid) {
    return $(`[data-value="${uid}"]`);
  }

  static get submitInvoiceButton() {
    return $('[data-test="submit-invoices-button"]');
  }

  static get submitInvoiceButtonRow() {
    return $('[data-test="data-table-row-action"]');
  }

  static getInvoiceRowByUid(uid: string) {
    return $(`[data-test="invoice-${uid}"]`);
  }

  static get invoicesAction() {
    return $('button[data-test="data-table-row-actions-button"]');
  }

  static get uploadCSVButton() {
    return $$('button[data-test="button"]');
  }

  static get invoiceSuccessToast() {
    return $('[data-test="invoice-success-toast"]');
  }

  createEnterprise() {
    return this.graphql<{ createEnterpriseClient: LegalEntityModel }>({
      query: CREATE_ENTERPRISE.loc.source.body
    });
  }

  static async getSupplierInvoiceNoInput() {
    return (await $('[data-test="invoiceUpdateModel.supplierInvoiceId-field-wrapper"]')).$('input[type="text"]');
  }

  static get supplierInvoiceNo() {
    return $('[data-test="invoiceUpdateModel.supplierInvoiceId-field-wrapper"]');
  }

  static get updateButton() {
    return $('span*=Update');
  }

  static get deleteActionInvoiceButton() {
    return $('[data-test="menu-item__delete"]');
  }

  static get confirmDialog() {
    return $('[data-test="confirm"]');
  }

  static get exportActionInvoiceButton() {
    return $('[data-test="menu-item__export"]');
  }

  static get clickIdInvoices() {
    return $('div[data-test="button-invoice-id"]');
  }

  static get successfullyToastMsg() {
    return $('button[data-test="successfully-deleted-invoice"]');
  }

  static get actionsInvoiceButton() {
    return $('button[data-test="icon-dropdown-button"]');
  }

  static get editInvoiceOtherDetails() {
    return $('button[data-test="invoiceUpdateModel.supplierInvoiceId-field-control"]');
  }

  static async openInvoicePage(invoiceUid) {
    await this.open(`invoices/${invoiceUid}`);
    await this.waitForPageToLoad();
  }

  static async getEditInvoiceButton() {
    const element = await $('button*=Edit');
    return element;
  }

  createInvoice(enterpriseUid: string, timesheets) {
    return this.graphql<{ createInvoice: GwgInvoiceCreateModel }>({
      query: CREATE_INVOICE.loc.source.body,
      variables: {
        model: {
          invoiceDate: dateFormat(new Date(), 'yyyy-mm-dd'),
          supplierInvoiceId: enterpriseUid,
          timesheetUids: timesheets
        }
      }
    });
  }

  async createWorkerTimesheetsForSupplierWithEnterprise(enterpriseUid) {
    return this.graphql<{ dev_createWorkerTimesheetsForSupplier: GwgTimesheetPageModel }>({
      query: CREATE_WORKER_TIMESHEETS_FOR_SUPPLIER_WITH_ENTERPRISE.loc.source.body,
      variables: {
        enterpriseUid
      }
    });
  }
}

export default SupplierInvoicesPage;
