import { toSync } from 'src/utils/utils/toSync';
import Page from '../Page';

class SupplierProfile extends Page {

  openGeneral = async () => {
    await Page.open('supplier/suppliers/profile/general');
    return this;
};

openLegal = async () => {
    await Page.open('supplier/suppliers/profile/legal');
    return this;
};

  static get industriesServed() {
    return $('[data-test="company-filters-industries-served-edit-icon-button"]');
  }

  static get jobCategories() {
    return $('[data-test="company-filters-job-categories-edit-icon-button"]');
  }

  static get programSupport() {
    return $('[data-test="company-filters-program-support-edit-icon-button"]');
  }

  static get logo() {
    return $('[data-test="company-logo"]');
  }

  static get companyName() {
    return $('[data-test="company-display-name"]');
  }

  static get companyHeadline() {
    return $('[data-test="company-headline"]');
  }

  static get saveChanges() {
    return $('[data-test="save-changes"]');
  }

  get summaryName() {
    return $('[data-test="supplier-name"] div[placeholder]');
  }

  get websiteName() {
    return $('[data-test="supplier-website"] div[placeholder]');
  }

  get description() {
    return $('[data-test="supplier-description"] div[placeholder]');
  }

  get email() {
    return $('[data-test="supplier__contact__office__email"] div[placeholder]');
  }

  get phone() {
    return $('[data-test="supplier__contact__office__phone"] div[placeholder]');
  }

  get legalBusinessName() {
    return $('[data-test="legal__business__name"] div[placeholder]');
  }

  get businessLicense() {
    return $('[data-test="business__license__number"] div[placeholder]');
  }

  get dbaNumber() {
    return $('[data-test="dba__number"] div[placeholder]');
  }

  get insuranceProvider() {
    return $('[data-test="insurance__provider"] div[placeholder]');
  }

  get insuranceNumber() {
    return $('[data-test="insurance__number"] div[placeholder]');
  }

  get einNumber() {
    return $('[data-test="ein__number"] div[placeholder]');
  }

  get otherTaxId() {
    return $('[data-test="other__tax__id"] div[placeholder]');
  }

  get incorpotationType() {
    return $('[data-test="incorporation__type"] div[placeholder]');
  }

  static get bankName() {
    return $('input[data-test="bank__name"]');
  }

  static get checkbox() {
    return $('span[data-test="checkbox"]');
  }

  static get confirmButton() {
    return $('button[data-test="confirm-button"]');
  }

  static get accountNumber() {
    return $('input[data-test="account__number"]');
  }

  static get routingNumber() {
    return $('input[data-test="routing__number"]');
  }

  async clickSummaryName() {
    await this.summaryName.waitForExist()
    await this.summaryName.click()
    return this;
  }

  async clickWebsiteName() {
    await this.websiteName.waitForExist()
    await this.websiteName.click()
    return this;
  }

  async clickDescription() {
    await this.description.waitForExist()
    await this.description.click()
    return this;
  }

  async clickEmail() {
    await this.email.waitForExist()
    await this.email.click()
    return this;
  }

  async clickPhone() {
    await this.phone.waitForExist()
    await this.phone.click()
    return this;
  }


  async clickBusinessLicence() {
    await this.businessLicense.waitForExist()
    await this.businessLicense.click()
    return this;
  }

  async clickDbaNumber() {
    await this.dbaNumber.waitForExist()
    await this.dbaNumber.click()
    return this;
  }

  async clickInsuranceNumber() {
    await this.insuranceNumber.waitForExist()
    await this.insuranceNumber.click()
    return this;
  }

  async clickEinNumber() {
    await this.einNumber.waitForExist()
    await this.einNumber.click()
    return this;
  }

  async clickOtherTaxId() {
    await this.otherTaxId.waitForExist()
    await this.otherTaxId.click()
    return this;
  }

  async clickIncorpotationType() {
    await this.incorpotationType.waitForExist()
    await this.incorpotationType.click()
    return this;
  }

}
export const supplierProfile = toSync(new SupplierProfile());
