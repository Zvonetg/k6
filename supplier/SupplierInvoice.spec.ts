import { writeFileSync, unlinkSync } from 'fs';
import Auth from '../../common/Auth';
import SupplierInvoicesPage from '../../pages/supplier/SupplierInvoices.page';
import { logger } from '../../../utils/utils/logger';
import Random from '../../common/Random';

const path = require('path');
const dateFormat = require('dateformat');

const invoicesInstance = new SupplierInvoicesPage();

const getEnterpriseUid = async () => {
  const { data, errors } = await invoicesInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient?.uid;
};

const getInvoice = async (enterpriseUid, timesheets) => {
  const { data, errors } = await invoicesInstance.createInvoice(enterpriseUid, timesheets);
  logger.error(errors);
  return data?.createInvoice;
};

const createWorkerTimesheetsForSupplier = async (enterpriseUid) => {
  const { data } = await invoicesInstance.createWorkerTimesheetsForSupplierWithEnterprise(enterpriseUid);
  return data.dev_createWorkerTimesheetsForSupplier.timesheets;
};

const createCSVFile = (supplierInvoiceId, timesheets) => {
  const csvData = [
    [
      'Invoice Code',
      'Invoice Date',
      'Line Item Type',
      'Line Item ID',
      'Line Item Amount',
      'Tax 1',
      'Tax 2',
      'Tax 3',
      'Tax 4',
      'Tax 5',
      'Grand Total',
      'Currency'
    ]
  ];
  for (const timesheet of timesheets) {
    const row = [
      supplierInvoiceId,
      dateFormat(new Date(), 'yyyy-mm-dd'),
      'TIMESHEET',
      timesheet.number,
      timesheet.totalAmount,
      '',
      '',
      '',
      '',
      '',
      timesheet.totalAmount,
      'EUR'
    ];
    csvData.push(row);
  }
  return csvData.map((e) => e.join(',')).join('\n');
};

describe('Invoices', () => {
  let enterpriseUid;
  let invoice;
  let timesheetsApproved;

  before('create Enterprise', async () => {
    await Auth.loginAsSupplier();
    enterpriseUid = await getEnterpriseUid();
  });

  beforeEach('setup the Invoice', async () => {
    await Auth.loginAsSupplier();
    timesheetsApproved = (await createWorkerTimesheetsForSupplier(enterpriseUid)).filter(
      ({ status }) => status === 'APPROVED'
    );
    invoice = await getInvoice(
      enterpriseUid,
      timesheetsApproved.map((timesheet) => timesheet.uid)
    );
    await SupplierInvoicesPage.waitForPageToLoad();
  });

  after('', async () => {
    try {
      unlinkSync('src/invoice.csv');
    } catch {}
  });

  it('should delete an invoice', async () => {
    await SupplierInvoicesPage.openInvoicesPage();
    await SupplierInvoicesPage.waitForPageToLoad();
    await SupplierInvoicesPage.clickIdInvoices.waitForExist();
    await SupplierInvoicesPage.clickIdInvoices.click();
    await SupplierInvoicesPage.actionsInvoiceButton.waitForExist();
    await SupplierInvoicesPage.actionsInvoiceButton.click();
    await SupplierInvoicesPage.deleteActionInvoiceButton.waitForExist();
    await SupplierInvoicesPage.deleteActionInvoiceButton.click();
    await SupplierInvoicesPage.confirmDialog.waitForExist();
    await SupplierInvoicesPage.confirmDialog.click();
    expect(await SupplierInvoicesPage.successfullyToastMsg).toExist();
  });

  it('should submit existing invoice', async () => {
    await SupplierInvoicesPage.openInvoicesPage();
    await SupplierInvoicesPage.invoicesAction.waitForExist();
    await SupplierInvoicesPage.invoicesAction.click();
    await SupplierInvoicesPage.submitInvoiceButtonRow.waitForExist();
    await SupplierInvoicesPage.submitInvoiceButtonRow.click();
    await browser.refresh();
    expect(await (await SupplierInvoicesPage.getInvoiceStatusByUid).getText()).toBe('Submitted');
  });

  it('should edit existing invoice', async () => {
    await SupplierInvoicesPage.openInvoicesPage();
    await SupplierInvoicesPage.clickIdInvoices.waitForExist();
    await SupplierInvoicesPage.clickIdInvoices.click();
    await SupplierInvoicesPage.waitForPageToLoad();
    expect(await (await browser.getUrl()).includes(invoice.uid)).toBeTruthy();
    await (await SupplierInvoicesPage.getEditInvoiceButton()).waitForDisplayed();
    await (await SupplierInvoicesPage.getEditInvoiceButton()).click();
    await (await SupplierInvoicesPage.getSupplierInvoiceNoInput()).waitForExist();
    expect(await SupplierInvoicesPage.editInvoiceOtherDetails).toBeClickable();
  });

  it('should upload new invoice', async () => {
    const newTimesheetsApproved = (await createWorkerTimesheetsForSupplier(enterpriseUid)).filter(
      ({ status }) => status === 'APPROVED'
    );
    const csvContent = createCSVFile(Random.randomString(), newTimesheetsApproved);
    const filePath = path.join(__dirname, '../invoice.csv');
    writeFileSync(filePath, csvContent);
    await SupplierInvoicesPage.openInvoicesPage();
    await SupplierInvoicesPage.uploadDialogButton.waitForExist();
    await SupplierInvoicesPage.uploadDialogButton.click();
    await SupplierInvoicesPage.selectClientOption.waitForExist();
    await SupplierInvoicesPage.selectClientOption.click();
    await (await SupplierInvoicesPage.getClient(enterpriseUid)).waitForExist();
    await (await SupplierInvoicesPage.getClient(enterpriseUid)).click();
    await SupplierInvoicesPage.uploadFileInput.setValue(filePath);
    const buttonUpload = (await SupplierInvoicesPage.uploadCSVButton)[1];
    await (await buttonUpload).waitForEnabled();
    await (await buttonUpload).click();
    expect(await SupplierInvoicesPage.invoiceSuccessToast).toBeDisplayed();
  });
});
