import AuthPage from '../../pages/Auth.page';
import { workerMyAccountPage, WorkerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';

describe('Worker User Profile Professional Summary', () => {
  before('Login as worker', async () => {
    await AuthPage.loginAsWorker();
  });

  beforeEach(async () => {
    await (await workerMyAccountPage.open()).navigateToProfessionalSummary();
  });

  it('should display empty Professional Summary', async () => {
    const professionalSummaryRow = await WorkerMyAccountPage.professionalSummaryRow;
    await professionalSummaryRow.waitForExist();
    await WorkerMyAccountPage.professionalSummaryEditButton.click()
    await WorkerMyAccountPage.professionalSummaryInputTextArea.clearValue();
    await expect(professionalSummaryRow).toHaveText('-');
  });

  it('should edit Professional Summary', async () => {
    const professionalSummary = 'My first professional summary.';
    await workerMyAccountPage.updateProfessionalSummary(professionalSummary);
    const characterCounter = await WorkerMyAccountPage.professionalSummaryCharacterCounter;
    await characterCounter.waitForExist();
    await expect(characterCounter).toHaveText(`${professionalSummary?.length}/500`);
    await workerMyAccountPage.submitProfessionalSummary();
    await (await WorkerMyAccountPage.professionalSummaryUpdatedToast).waitForDisplayed();
    const professionalSummaryRow = await WorkerMyAccountPage.professionalSummaryRow;
    await professionalSummaryRow.waitForExist();
    await expect(professionalSummaryRow).toHaveText(professionalSummary);
  });
});
