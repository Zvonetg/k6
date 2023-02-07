import { EducationDegreeModel, EducationCertificationModel, EducationTrainingModel } from 'gwg';
import AuthPage from '../../pages/Auth.page';
import { WorkerEducationTypes, workerMyAccountPage, WorkerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';
import Random from '../../common/Random';

describe('Worker User Profile Education History', () => {
  let educationDegree: EducationDegreeModel;
  let educationCertification: EducationCertificationModel;
  let educationTraining: EducationTrainingModel;

  before('Login in supplier app', async () => {
    await AuthPage.loginAsWorker();

    educationDegree = {
      uid: Random.randomString(12),
      degree: 'My first Degree',
      fieldOfStudy: 'field of study',
      institution: "McDonald's",
      completionYear: new Date(2022, 9, 15),
      startYear: new Date(2017, 9, 15)
    };

    educationCertification = {
      uid: Random.randomString(12),
      name: Random.randomString(),
      issuingOrganization: Random.randomString(),
      expirationDate: new Date(2027, 9, 15),
      credentialUrl: Random.randomString(),
      credentialId: Random.randomString()
    };

    educationTraining = {
      uid: Random.randomString(12),
      name: Random.randomString(),
      issuingOrganization: Random.randomString(),
      expirationDate: new Date(2027, 9, 15)
    };
  });

  beforeEach(async () => {
    await workerMyAccountPage.open().navigateToEducationHistory();
  });

  it('should display empty Education History', async () => {
    const educationDegreesList = await WorkerMyAccountPage.educationDegreesList;
    const educationCertificationsList = await WorkerMyAccountPage.educationCertificationsList;
    const educationTrainingsList = await WorkerMyAccountPage.educationTrainingsList;

    await expect(educationDegreesList).not.toExist();
    await expect(educationCertificationsList).not.toExist();
    await expect(educationTrainingsList).not.toExist();
  });

  it('should create Education Degree', async () => {
    await workerMyAccountPage.clickAddEducation();
    await browser.pause(1000);

    await workerMyAccountPage.selectEducationType(WorkerEducationTypes.DEGREE);
    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await addEducationSmartForm.waitForExist();

    await workerMyAccountPage.updateDegree(educationDegree);
    await workerMyAccountPage.submitEducationHistory();

    await (await WorkerMyAccountPage.educationHistoryAddedToast).waitForDisplayed();
    expect(await WorkerMyAccountPage.educationHistoryAddedToast).toExist();
  });

  it('should update Education Degree', async () => {
    const degreeRow = await WorkerMyAccountPage.educationDegreeRow;
    await degreeRow.waitForExist();
    await degreeRow.click();

    const educationDegreePageTitle = await WorkerMyAccountPage.educationDegreePageTitle;
    await expect(educationDegreePageTitle).toExist();

    await workerMyAccountPage.editEducationHistory();

    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await addEducationSmartForm.waitForExist();

    const updatedDegree: EducationDegreeModel = {
      ...educationDegree,
      degree: 'Updated degree'
    };
    await workerMyAccountPage.updateDegree(updatedDegree);
    await workerMyAccountPage.submitEducationHistory();
    await (await WorkerMyAccountPage.educationHistoryUpdatedToast).waitForDisplayed();

    const educationDegreeNameRow = await WorkerMyAccountPage.educationDegreeNameRow;
    await educationDegreeNameRow.waitForExist();
    await expect(educationDegreeNameRow).toHaveText(updatedDegree?.degree);
  });

  it('should delete Education Degree', async () => {
    const degreeRow = await WorkerMyAccountPage.educationDegreeRow;
    await degreeRow.waitForExist();
    await degreeRow.click();

    const educationDegreePageTitle = await WorkerMyAccountPage.educationDegreePageTitle;
    await expect(educationDegreePageTitle).toExist();

    await workerMyAccountPage.deleteEducationHistory();
    await (await WorkerMyAccountPage.educationHistoryDeletedToast).waitForDisplayed();

    await (await WorkerMyAccountPage.educationHistoryTitle).waitForDisplayed();
    const educationDegreesList = await WorkerMyAccountPage.educationDegreesList;
    await expect(educationDegreesList).not.toExist();
  });

  it('should create Licences or Certificate', async () => {
    await workerMyAccountPage.clickAddEducation();
    await browser.pause(1000);

    await workerMyAccountPage.selectEducationType(WorkerEducationTypes.LICENCE_OR_CERTIFICATE);
    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await addEducationSmartForm.waitForExist();

    await workerMyAccountPage.updateCertificate(educationCertification);
    await workerMyAccountPage.submitEducationHistory();

    await (await WorkerMyAccountPage.educationHistoryAddedToast).waitForDisplayed();
    expect(await WorkerMyAccountPage.educationHistoryAddedToast).toExist();
  });

  it('should update Licence or certification', async () => {
    const certicifationRow = await WorkerMyAccountPage.educationcertificationRow;
    await certicifationRow.waitForExist();
    await certicifationRow.click();

    const educationCertificationPageTitle = await WorkerMyAccountPage.educationCertificationPageTitle;
    await expect(educationCertificationPageTitle).toExist();

    await workerMyAccountPage.editEducationCertification();

    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await addEducationSmartForm.waitForExist();

    const updatedCertification: EducationCertificationModel = {
      ...educationCertification,
      name: Random.randomString()
    };
    await (await workerMyAccountPage).updateCertificate(updatedCertification);
    await workerMyAccountPage.submitEducationHistory();
    await (await WorkerMyAccountPage.educationHistoryUpdatedToast).waitForDisplayed();
  });

  it('should delete Licences or Certificate', async () => {
    const certificationRow = await WorkerMyAccountPage.educationcertificationRow;
    await certificationRow.waitForExist();
    await certificationRow.click();

    const educationCertificationPageTitle = await WorkerMyAccountPage.educationCertificationPageTitle;
    await expect(educationCertificationPageTitle).toExist();

    await (await workerMyAccountPage).deleteCertificate();
    await (await WorkerMyAccountPage.educationHistoryDeletedToast).waitForDisplayed();

    await (await WorkerMyAccountPage.educationHistoryTitle).waitForDisplayed();
    const educationCertificationList = await WorkerMyAccountPage.educationCertificationList;
    await expect(educationCertificationList).not.toExist();
  });

  it('should create Training', async () => {
    await workerMyAccountPage.clickAddEducation();
    await browser.pause(1000);

    await workerMyAccountPage.selectEducationType(WorkerEducationTypes.TRAINING);
    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await await addEducationSmartForm.waitForExist();

    await (await workerMyAccountPage).updateTraining(educationTraining);
    await workerMyAccountPage.submitEducationHistory();

    await (await WorkerMyAccountPage.educationHistoryAddedToast).waitForDisplayed();
    expect(await WorkerMyAccountPage.educationHistoryAddedToast).toExist();
  });

  it('should update Training', async () => {
    const trainingRow = await WorkerMyAccountPage.educationtrainingRow;
    await trainingRow.waitForExist();
    await trainingRow.click();

    const educationTrainingPageTitle = await WorkerMyAccountPage.educationTrainingPageTitle;
    await expect(educationTrainingPageTitle).toExist();

    await workerMyAccountPage.editEducationTraining();

    const addEducationSmartForm = await WorkerMyAccountPage.educationHistorySmartForm;
    await addEducationSmartForm.waitForExist();

    const updatedTraining: EducationTrainingModel = {
      ...educationTraining,
      name: Random.randomString()
    };
    await (await workerMyAccountPage).updateTraining(updatedTraining);
    await workerMyAccountPage.submitEducationHistory();
    await (await WorkerMyAccountPage.educationHistoryUpdatedToast).waitForDisplayed();
  });

  it('should delete Training', async () => {
    const trainingRow = await WorkerMyAccountPage.educationtrainingRow;
    await trainingRow.waitForExist();
    await trainingRow.click();

    const educationTrainingPageTitle = await WorkerMyAccountPage.educationTrainingPageTitle;
    await expect(educationTrainingPageTitle).toExist();

    await workerMyAccountPage.deleteEducationTraining();
    await (await WorkerMyAccountPage.educationHistoryDeletedToast).waitForDisplayed();

    await (await WorkerMyAccountPage.educationHistoryTitle).waitForDisplayed();
    const educationTrainingList = await WorkerMyAccountPage.educationTrainingList;
    await expect(educationTrainingList).not.toExist();
  });
});
