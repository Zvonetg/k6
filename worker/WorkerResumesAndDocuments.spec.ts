import AuthPage from '../../pages/Auth.page';
import { workerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';
import Random from '../../common/Random';
import ResumeAndDocuments from '../../pages/worker/WorkerResumeAndDocuments.page';

const path = require('path');

describe('Worker User Profile Resumes and Documents', () => {
  before('Login as worker', async () => {
    await AuthPage.loginAsWorker();
  });

  beforeEach(async () => {
    await (await workerMyAccountPage.open()).navigateToResumesAndDocuments();
  });

  it('should add a document', async () => {
    await ResumeAndDocuments.addDocument.waitForExist();
    await ResumeAndDocuments.addDocument.click();
    await ResumeAndDocuments.addDocumentResume.waitForExist();
    await ResumeAndDocuments.addDocumentResume.click();
    await ResumeAndDocuments.addResume.waitForExist();
    await ResumeAndDocuments.addResume.click();
    await ResumeAndDocuments.addDocumentName.click();
    await ResumeAndDocuments.addDocumentName.setValue(`${Random.randomString()}@saltees.com`);
    await ResumeAndDocuments.addDocumentUpload.waitForExist();
    await ResumeAndDocuments.addDocumentUpload.click();
    await browser.execute(() => {
      const inputEl = document.querySelector('[data-test="document-field-input"]');
      inputEl.removeAttribute('class');
    });
    const filePath = path.join(__dirname, '../../data/chrome.png');
    await ResumeAndDocuments.addDocumentInput.waitForDisplayed();
    await ResumeAndDocuments.addDocumentInput.setValue(filePath);
    await ResumeAndDocuments.documentForm.click();
    await ResumeAndDocuments.addSubmitDocument.click();
  });
});
