import Page from '../Page';

class SupplierProfilePage extends Page {
  static async companyDisplayName() {
    await (await SupplierProfilePage.companyDisplayNameInput).waitForExist();
    await (await SupplierProfilePage.companyDisplayNameInput).click();
    return this;
  }

  static get companyDisplayNameInput() {
    return $('[data-test="company__display__name"]');
  }

  static get companySizeField() {
    return $('[data-test="select-field"]');
  }

  static get phoneNumberInput() {
    return $('[data-test="phone-number-phone-number"] input');
  }

  static get geographiesServed() {
    return $('[data-test="iconButton-company-filters-edit-geo-location"]');
  }

  static get checkboxLabel() {
    return $('[data-test="checkbox-label"]');
  }

  static get saveGeo() {
    return $('[data-test="button-company-filters-save-changes-geo-location"]');
  }

  static get industriesServed() {
    return $('[data-test="company-filters-industries-served-edit-icon-button"]');
  }

  static get jobCategories() {
    return $('[data-test="company-filters-job-categories-edit-icon-button"]');
  }

  static get diversityCertificate() {
    return $('[data-test="company-filters-diversity-certificate-types-edit-icon-button"]');
  }

  static get cancelIndustries() {
    return $('[data-test="cancel-changes-filters-industries-served"]');
  }

  static get cancelJobCategories() {
    return $('[data-test="cancel-changes-filters-job-categories"]');
  }

  static get cancelDiversityCertificate() {
    return $('[data-test="cancel-changes-filters-diversity-certificate-types"]');
  }

  static get cancelProgramSupport() {
    return $('[data-test="cancel-changes-filters-program-support"]');
  }

  static get cancelDeiSupport() {
    return $('[data-test="cancel-changes-filters-dei-support-categories"]');
  }

  static get cancelKeywords() {
    return $('[data-test="cancel-changes-filters-keywords"]');
  }

  static get cancelGeo() {
    return $('[data-test="button-company-filters-cancel-changes-geo-location"]');
  }

  static get programSupport() {
    return $('[data-test="company-filters-program-support-edit-icon-button"]');
  }

  static get deiSupport() {
    return $('[data-test="company-filters-dei-support-categories-edit-icon-button"]');
  }

  static get filtersKeyword() {
    return $('[data-test="company-filters-keywords-edit-icon-button"]');
  }

  static get updateSuccessToasterMessage() {
    return $('div[data-test="addBankAccountStart"]');
  }

  static get companySizeNumber() {
    return $('[data-test="select-list-item"]');
  }

  static get headlineInput() {
    return $('[data-test="company__headline"]');
  }

  static async companyDescription() {
    await (await SupplierProfilePage.companyDescriptionInput).waitForExist();
    await (await SupplierProfilePage.companyDescriptionInput).click();
    return this;
  }

  static get companyDescriptionInput() {
    return $('[data-test="company__description"]');
  }

  static saveChangesButton() {
    return $('[data-test="save-changes-button"]');
  }

  static saveChangesButtonTestimonial() {
    return $('[data-test="save-change"]');
  }

  static get updateSuccessProfileMessage() {
    return $('div[data-test="update-profile"]');
  }

  static get updateSuccessProfileDeletingTestimonials() {
    return $('div[data-test="updated-profile"]');
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

  static get progressText() {
    return $('[data-test="company-linear-progress-text"]');
  }

  static get progressValue() {
    return $('[data-test="company-linear-progress-value"]');
  }

  static get companyDescriptionProfile() {
    return $('[data-test="company-description"]');
  }

  static get logoFieldInput() {
    return $('[data-test="document-field-input"]');
  }

  static get logoFieldUpload() {
    return $('[data-test="logo-field-upload-button"]');
  }

  static get bannerFieldUpload() {
    return $('[data-test="banner-field-upload-button"]');
  }

  static get bannerFieldInput() {
    return $('[data-test="banner-field-input"]');
  }

  static get adminSettingsContent() {
    return $('[data-test="admin-settings__content"]');
  }

  static get updateProfileToastMessage() {
    return $('[data-test="updated-profile"]');
  }

  static get manageAdditionalInformation() {
    return $('[data-test="open-additional-info-dialog-button"]');
  }

  static get companyWebsite() {
    return $('[data-test="company__website"]');
  }

  static get companyEmail() {
    return $('[data-test="company__email"]');
  }

  static get checkBoxLinkedin() {
    return $('[data-test="add-expense-worker-linkedin"]');
  }

  static get checkBoxFacebook() {
    return $('[data-test="add-expense-worker-facebook"]');
  }

  static get checkBoxTwitter() {
    return $('[data-test="add-expense-worker-twitter"]');
  }

  static get companySocialLinkLinkedin() {
    return $('[data-test="company-socialLinks-linkedIn"]');
  }

  static get companySocialLinkFacebook() {
    return $('[data-test="company-socialLinks-facebook"]');
  }

  static get companySocialLinkTwitter() {
    return $('[data-test="company-socialLinks-twitter"]');
  }

  static get saveChanges() {
    return $('[data-test="save-changes"]');
  }

  static get saveChange() {
    return $('[data-test="save-change"]');
  }

  static get updateSuccessProfile() {
    return $('div[data-test="updated-profile"]');
  }

  static get linkedinIcon() {
    return $('div[data-test="company-linkedIn-icon"]');
  }

  static get facebookIcon() {
    return $('div[data-test="company-facebook-icon"]');
  }

  static get twitterIcon() {
    return $('div[data-test="company-twitter-icon"]');
  }

  static get summaryName() {
    return $('[data-test="supplier-name"] div[placeholder]');
  }

  static get websiteName() {
    return $('[data-test="supplier-website"] div[placeholder]');
  }

  static get description() {
    return $('[data-test="supplier-description"] div[placeholder]');
  }

  static get email() {
    return $('[data-test="supplier__contact__office__email"] div[placeholder]');
  }

  static get phone() {
    return $('[data-test="supplier__contact__office__phone"] div[placeholder]');
  }

  static get legalBusinessName() {
    return $('[data-test="legal__business__name"] div[placeholder]');
  }

  static get businessLicense() {
    return $('[data-test="business__license__number"] div[placeholder]');
  }

  static get dbaNumber() {
    return $('[data-test="dba__number"] div[placeholder]');
  }

  static get insuranceProvider() {
    return $('[data-test="insurance__provider"] div[placeholder]');
  }

  static get insuranceNumber() {
    return $('[data-test="insurance__number"] div[placeholder]');
  }

  static get addNewClient() {
    return $('[data-test="open-add-new-client-dialog-button"]');
  }

  static get addCompanyName() {
    return $('[data-test="client-company-name-input"]');
  }

  static get clientFieldUpload() {
    return $('[data-test="client-logo-field-upload-button"]');
  }

  static get clientFieldInput() {
    return $('[data-test="client-document-field-input"]');
  }

  static get einNumber() {
    return $('[data-test="ein__number"] div[placeholder]');
  }

  static get otherTaxId() {
    return $('[data-test="other__tax__id"] div[placeholder]');
  }

  static get incorpotationType() {
    return $('[data-test="incorporation__type"] div[placeholder]');
  }

  static get addBank() {
    return $('button[data-test="add__bank__button"]');
  }

  static get addTestimonials() {
    return $('[data-test="open-testimonials-dialog-button"]');
  }

  static get addTestimonialsPosition() {
    return $('[data-test="testimonial-job-title"]');
  }

  static get addTestimonialsAuthor() {
    return $('[data-test="testimonial-author-name"]');
  }

  static get addTestimonialsCompany() {
    return $('[data-test="testimonial-company-name"]');
  }

  static get addTestimonialsMessage() {
    return $('[data-test="testimonial-message"]');
  }

  static get confirmInlineEdit() {
    return $('[data-test="confirm-inline-edit"] div[button]');
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

  static get accountName() {
    return $('input[data-test="account__name"]');
  }

  static get accountNumber() {
    return $('input[data-test="account__number"]');
  }

  static get routingNumber() {
    return $('input[data-test="routing__number"]');
  }

  static get removeTestimonials() {
    return $('[data-test="remove-testimonials"]');
  }

  static get removeTestimonialsItem() {
    return $('[data-test="menu-list-item"]');
  }

  static get confirmDialog() {
    return $('[data-test="confirm"]');
  }

  static get selectGeo() {
    return $('div[data-test="checkbox-input]');
  }

  static get selectIndustries() {
    return $('[data-test="select-field]');
  }

  static get selectJobCategories() {
    return $('[data-test="select-field]');
  }

  static async headline() {
    await (await SupplierProfilePage.headlineInput).waitForExist();
    await (await SupplierProfilePage.headlineInput).click();
    return this;
  }

  static async companySize() {
    await (await SupplierProfilePage.companySizeField).waitForExist();
    await (await SupplierProfilePage.companySizeField).click();
    return this;
  }

  static async clickSummaryName() {
    await (await SupplierProfilePage.summaryName).waitForExist();
    await (await SupplierProfilePage.summaryName).click();
    return this;
  }

  static async clickWebsiteName() {
    await (await SupplierProfilePage.websiteName).waitForExist();
    await (await SupplierProfilePage.websiteName).click();
    return this;
  }

  static async clickDescription() {
    await (await SupplierProfilePage.description).waitForExist();
    await (await SupplierProfilePage.description).click();
    return this;
  }

  static async clickEmail() {
    await (await SupplierProfilePage.email).waitForExist();
    await (await SupplierProfilePage.email).click();
    return this;
  }

  static async clickPhone() {
    await (await SupplierProfilePage.phone).waitForExist();
    await (await SupplierProfilePage.phone).click();
    return this;
  }

  static async clickLegalBusinessName() {
    await (await SupplierProfilePage.legalBusinessName).waitForExist();
    await (await SupplierProfilePage.legalBusinessName).click();
    return this;
  }

  static async clickBusinessLicence() {
    await (await SupplierProfilePage.businessLicense).waitForExist();
    await (await SupplierProfilePage.businessLicense).click();
    return this;
  }

  static async clickDbaNumber() {
    await (await SupplierProfilePage.dbaNumber).waitForExist();
    await (await SupplierProfilePage.dbaNumber).click();
    return this;
  }

  static async clickInsuranceProvider() {
    await (await SupplierProfilePage.insuranceProvider).waitForExist();
    await (await SupplierProfilePage.insuranceProvider).click();
    return this;
  }

  static async clickInsuranceNumber() {
    await (await SupplierProfilePage.insuranceNumber).waitForExist();
    await (await SupplierProfilePage.insuranceNumber).click();
    return this;
  }

  static async clickEinNumber() {
    await (await SupplierProfilePage.einNumber).waitForExist();
    await (await SupplierProfilePage.einNumber).click();
    return this;
  }

  static async clickOtherTaxId() {
    await (await SupplierProfilePage.otherTaxId).waitForExist();
    await (await SupplierProfilePage.otherTaxId).click();
    return this;
  }

  static async clickIncorpotationType() {
    await (await SupplierProfilePage.incorpotationType).waitForExist();
    await (await SupplierProfilePage.incorpotationType).click();
    return this;
  }

  static async clickAddBank() {
    await (await SupplierProfilePage.addBank).waitForExist();
    await (await SupplierProfilePage.addBank).click();
    return this;
  }

  static async clickBankName() {
    await (await SupplierProfilePage.bankName).waitForExist();
    await (await SupplierProfilePage.bankName).click();
    return this;
  }

  static async clickAccountName() {
    await (await SupplierProfilePage.accountName).waitForExist();
    await (await SupplierProfilePage.accountName).click();
    return this;
  }

  static async clickAccountNumber() {
    await (await SupplierProfilePage.accountNumber).waitForExist();
    await (await SupplierProfilePage.accountNumber).click();
    return this;
  }

  static async clickRoutingNumber() {
    await (await SupplierProfilePage.routingNumber).waitForExist();
    await (await SupplierProfilePage.routingNumber).click();
    return this;
  }

  static async clickConfirmButton() {
    await (await SupplierProfilePage.confirmButton).waitForExist();
    await (await SupplierProfilePage.confirmButton).click();
    return this;
  }
}
export default SupplierProfilePage;
