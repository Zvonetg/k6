import AuthPage from '../../pages/Auth.page';
import WorkerHomePage from '../../pages/WorkerHome.page';

const path = require('path');

describe('Worker User Profile', () => {
  before('Login in worker app', async () => {
    await AuthPage.loginAsWorker();
  });

  it('should upload avatar on worker application', async () => {
    await WorkerHomePage.openPath('my-account');
    await WorkerHomePage.clickOnAvatar.waitForExist();
    await WorkerHomePage.clickOnAvatar.click();
    await WorkerHomePage.avatarFiledUpload.waitForExist();
    await WorkerHomePage.avatarFiledUpload.click();
    await browser.execute(() => {
      const inputEl = document.querySelector('[data-test="profile-picture-input"]');
      inputEl.removeAttribute('class');
    });
    const filePath = path.join(__dirname, '../../data/chrome.png');
    await WorkerHomePage.avatarFieldInput.waitForDisplayed();
    await WorkerHomePage.avatarFieldInput.setValue(filePath);
  });
});
