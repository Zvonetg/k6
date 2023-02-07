import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import SupplierHomePage from '../../pages/SupplierHome.page';
import SupplierProfilePage from '../../pages/supplier/SupplierProfile.page';
import Random from '../../common/Random';

const path = require('path');

describe('GWG - Supplier Admin Settings Profile', () => {
  let displayName;
  let headline;
  let companyDescription;
  let companyWebsite;
  let phone;

  before('Supplier login', async () => {
    displayName = Random.randomString(10);
    headline = Random.randomString(10);
    companyDescription = Random.randomString(10);
    companyWebsite = Random.randomString(10);
    phone = '4455667788';
    await SupplierHomePage.loginAsSupplier();
    const supplierHomeInstance = new SupplierHomePage();
    await supplierHomeInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.supplierProfileSettings);
  });

  it('should successfully add information about company', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    await SupplierProfilePage.companyDisplayName();
    await SupplierProfilePage.companyDisplayNameInput.setValue(displayName);
    await SupplierProfilePage.companySize();
    await SupplierProfilePage.companySizeNumber.waitForExist();
    await SupplierProfilePage.companySizeNumber.click();
    await SupplierProfilePage.headline();
    await SupplierProfilePage.headlineInput.setValue(headline);
    await SupplierProfilePage.companyDescription();
    await SupplierProfilePage.companyDescriptionInput.setValue(companyDescription);
    await SupplierProfilePage.saveChangesButton().waitForExist();
    await SupplierProfilePage.saveChangesButton().click();
    expect(await SupplierProfilePage.updateSuccessProfileMessage).toExist();
  });

  it('should successfully check if data is changed', async () => {
    await SupplierHomePage.open('supplier/profile');
    expect(await SupplierProfilePage.logo).toExist();
    expect(await SupplierProfilePage.companyName).toHaveTextContaining(displayName);
    expect(await SupplierProfilePage.companyHeadline).toHaveTextContaining(headline);
    expect(await SupplierProfilePage.companyDescriptionProfile).toHaveTextContaining(companyDescription);
  });

  it('should successfully manage additional information', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    await SupplierProfilePage.manageAdditionalInformation.waitForExist();
    await SupplierProfilePage.manageAdditionalInformation.click();
    await SupplierProfilePage.companyWebsite.waitForExist();
    await SupplierProfilePage.companyWebsite.click();
    await SupplierProfilePage.companyWebsite.setValue(companyWebsite);
    await SupplierProfilePage.companyEmail.waitForExist();
    await SupplierProfilePage.companyEmail.click();
    await SupplierProfilePage.companyEmail.setValue(`${Random.randomString()}@saltees.com`);
    await SupplierProfilePage.phoneNumberInput.waitForExist();
    await SupplierProfilePage.phoneNumberInput.click();
    await SupplierProfilePage.phoneNumberInput.setValue(phone);
    await SupplierProfilePage.saveChanges.waitForExist();
    await SupplierProfilePage.saveChanges.click();
    expect(await SupplierProfilePage.updateSuccessProfile).toExist();
  });

  it('should successfully add testimonials', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    const element = await SupplierProfilePage.addTestimonials;
    await element.scrollIntoView();
    await SupplierProfilePage.addTestimonials.waitForExist();
    await SupplierProfilePage.addTestimonials.click();
    await SupplierProfilePage.addTestimonialsAuthor.click();
    await SupplierProfilePage.addTestimonialsAuthor.setValue(`${Random.randomString()}`);
    await SupplierProfilePage.addTestimonialsPosition.click();
    await SupplierProfilePage.addTestimonialsPosition.setValue(`${Random.randomString()}`);
    await SupplierProfilePage.addTestimonialsCompany.click();
    await SupplierProfilePage.addTestimonialsCompany.setValue(`${Random.randomString()}`);
    await SupplierProfilePage.addTestimonialsMessage.click();
    await SupplierProfilePage.addTestimonialsMessage.setValue(`${Random.randomString()}`);
    await SupplierProfilePage.saveChangesButtonTestimonial().waitForExist();
    await SupplierProfilePage.saveChangesButtonTestimonial().click();
    expect(await SupplierProfilePage.updateSuccessProfileMessage).toExist();
  });

  it('should successfully delete testimonials', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    const element = await SupplierProfilePage.addTestimonials;
    await element.scrollIntoView();
    await SupplierProfilePage.removeTestimonials.waitForExist();
    await SupplierProfilePage.removeTestimonials.click();
    await SupplierProfilePage.removeTestimonialsItem.waitForExist();
    await SupplierProfilePage.removeTestimonialsItem.click();
    await SupplierProfilePage.confirmDialog.waitForExist();
    await SupplierProfilePage.confirmDialog.click();
    expect(await SupplierProfilePage.updateSuccessProfileDeletingTestimonials).toExist();
  });

  it('should successfully add logo', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    const element = await SupplierProfilePage.logoFieldUpload;
    await element.scrollIntoView();
    await SupplierProfilePage.logoFieldUpload.waitForExist();
    await SupplierProfilePage.logoFieldUpload.click();
    await browser.execute(() => {
      const inputEl = document.querySelector('[data-test="document-field-input"]');
      inputEl.removeAttribute('class');
    });
    const filePath = path.join(__dirname, '../../data/chrome.png');
    await SupplierProfilePage.logoFieldInput.waitForDisplayed();
    await SupplierProfilePage.logoFieldInput.setValue(filePath);
    await SupplierProfilePage.adminSettingsContent.click();
    expect(await SupplierProfilePage.updateProfileToastMessage).toExist();
  });

  it('should successfully add banner', async () => {
    await SupplierHomePage.open('supplier/admin-settings/profile');
    const element = await SupplierProfilePage.bannerFieldUpload;
    await element.scrollIntoView();
    await SupplierProfilePage.bannerFieldUpload.waitForExist();
    await SupplierProfilePage.bannerFieldUpload.click();
    await browser.execute(() => {
      const inputEl = document.querySelector('[data-test="banner-field-input"]');
      inputEl.removeAttribute('class');
    });
    const filePath = path.join(__dirname, '../../data/utmost.png');
    await SupplierProfilePage.bannerFieldInput.waitForDisplayed();
    await SupplierProfilePage.bannerFieldInput.setValue(filePath);
    await SupplierProfilePage.adminSettingsContent.click();
    expect(await SupplierProfilePage.updateProfileToastMessage).toExist();
  });
});
