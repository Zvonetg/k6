import { EngagementStatusModel, GwgEngagementModel } from 'gwg';
import EngagementsPage from '../../pages/Engagements.page';
import WorkerHomePage from '../../pages/WorkerHome.page';
import Auth from '../../common/Auth';
import { logger } from '../../../utils/utils/logger';

const workerHomePageInstance = new WorkerHomePage();
const engagementsPageInstance = new EngagementsPage();

const getCurrentWorkerUid = async () => {
  const { data, errors } = await workerHomePageInstance.getWorkerProfileInfo();
  logger.error(errors);
  return data?.getProfileSelf?.uid;
};

const generateEngagement = async (workerUid: string, jobProfile: string, engagementStatus: EngagementStatusModel) => {
  const engagementToCreate: Partial<GwgEngagementModel> = { jobProfile, status: engagementStatus };
  const { data, errors } = await engagementsPageInstance.createEngagement(workerUid, engagementToCreate);
  logger.error(errors);
  return data?.createEngagement;
};

describe('Worker Engagements Viewing', () => {
  let engagementStatus: EngagementStatusModel;
  const jobProfile = 'Random Job Profile';
  before('Login as Worker and generate active and past engagements', async () => {
    await Auth.loginAsWorker();
  });

  it('Should create and display active engagements at the active engagements view', async () => {
    await EngagementsPage.openEngagements();
    const workerUid = await getCurrentWorkerUid();
    const activeEngagementPromises = [];
    engagementStatus = 'PRE_HIRE';
    activeEngagementPromises.push(generateEngagement(workerUid, `${jobProfile}`, engagementStatus));
    await browser.pause(1000);
    expect(await await EngagementsPage.statusActiveEngagement()).toExist();
  });

  it('Should create and display past engagements at the past engagements view', async () => {
    await EngagementsPage.openPastEngagements();
    const workerUid = await getCurrentWorkerUid();
    const pastEngagementPromises = [];
    engagementStatus = 'OFFBOARDED';
    pastEngagementPromises.push(generateEngagement(workerUid, `${jobProfile}`, engagementStatus));
    await browser.pause(1000);
    expect(await await EngagementsPage.statusPastEngagement()).toExist();
  });
});
