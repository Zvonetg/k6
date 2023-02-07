import Random from '../../common/Random';
import AuthPage from '../../pages/Auth.page';
import WorkerHomePage from '../../pages/WorkerHome.page';
import { workerMyAccountPage, WorkerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';

const workerHomePageInstance = new WorkerHomePage();

describe('Worker User Profile', () => {
  let workerProfile;
  let firstName;
  let middleName;
  let lastName;
  let preferredName;

  before('Login as worker', async () => {
    await AuthPage.loginAsWorker();
    firstName = Random.randomString(8);
    middleName = Random.randomString(8);
    lastName = Random.randomString(8);
    preferredName = Random.randomString(8);
  });

  beforeEach(async () => {
    workerProfile = (await workerHomePageInstance.getWorkerProfileInfo()).data.getProfileSelf;
    await workerMyAccountPage.open().clickPersonalDetailsLabel();
  });

  it('should display worker email', async () => {
    await WorkerHomePage.openPath('my-account');
    await (await browser.$(`//*[contains(text(),'${workerProfile.email}')]`)).waitForExist();
    expect((await browser.$(`//*[contains(text(),'${workerProfile.email}')]`)).isDisplayed()).toBeTruthy();
  });

  it('should update first name', async () => {
    await workerMyAccountPage.updateFirstNameEditButton(workerProfile.name.first, firstName);
    await workerMyAccountPage.waitForDetailsUpdatedToast();
  });

  it('should update middle name', async () => {
    await workerMyAccountPage
      .clickMiddleNameEditButton()
      .updatelastNameEditButton(workerProfile.middleName, middleName);
    await (await WorkerMyAccountPage.detailsUpdatedToast).waitForDisplayed();
  });

  it('should update last name', async () => {
    await workerMyAccountPage.clicklastNameEditButton().updatelastNameEditButton(workerProfile.lastName, lastName);
    await (await WorkerMyAccountPage.detailsUpdatedToast).waitForDisplayed();
  });

  it('should update preferred name', async () => {
    await workerMyAccountPage
      .clickPreferredNameEditButton()
      .clearAndEnterPreferredNameInput(workerProfile.preferredName, preferredName);
    await (await WorkerMyAccountPage.detailsUpdatedToast).waitForDisplayed();
  });

  it('should update gender', async () => {
    /* eslint-disable no-await-in-loop */
    await workerMyAccountPage
      .clickGenderEditButton()
      .waitForTime(1)
      .clickSelect()
      .waitForTime(1)
      .clickGenderLabel()
      .waitForTime(1)
      .clickSaveButton();
  });

  it('should update date of birth', async () => {
    const dob = '1985/11/25';
    await (await WorkerMyAccountPage.dobEditButton).waitForExist();
    await (await WorkerMyAccountPage.dobEditButton).click();
    await (await browser.$('input')).waitForDisplayed();
    const dobInput = !workerProfile.dateOfBirth
      ? await browser.$('input')
      : await WorkerMyAccountPage.getInputWithName(workerProfile.dateOfBirth.replace(/-/g, '/'));
    const inputLength = (await dobInput.getValue()).length;
    await dobInput.setValue(new Array(inputLength).fill('Backspace'));
    await dobInput.setValue(dob);
    await browser.keys('\uE007');
    await (await WorkerMyAccountPage.detailsUpdatedToast).waitForDisplayed();
  });

  it('should not update invalid date of birth', async () => {
    const dob = '8456/99/75';
    await (await WorkerMyAccountPage.dobEditButton).waitForExist();
    await (await WorkerMyAccountPage.dobEditButton).click();
    await (await browser.$('input')).waitForDisplayed();
    const dobInput = !workerProfile.dateOfBirth
      ? await browser.$('input')
      : await WorkerMyAccountPage.getInputWithName(workerProfile.dateOfBirth.replace(/-/g, '/'));
    const inputLength = (await dobInput.getValue()).length;
    await dobInput.setValue(new Array(inputLength).fill('Backspace'));
    await dobInput.setValue(dob);
    await browser.keys('\uE007');
    await (await WorkerMyAccountPage.detailsFailedToast).waitForDisplayed();
  });

  it('should update country of birth', async () => {
    await workerMyAccountPage
      .clickcountryEditButton()
      .waitForTime(1)
      .clickCountryCodeSelect()
      .waitForTime(1)
      .clickcountryLabel()
      .waitForTime(1)
      .clickSaveButton();
  });
});
