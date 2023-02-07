import { EngagementStatusModel, GwgEngagementModel } from 'gwg';
import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import Auth from '../../common/Auth';
import EngagementsPage from '../../pages/Engagements.page';
import { logger } from '../../../utils/utils/logger';
import RandomNumber from '../../common/RandomNumber';
import WorkerHomePage, { WorkerCategoryExpensesTypes } from '../../pages/WorkerHome.page';
import {workerExpenses} from '../../pages/worker/WorkerExpenses.page';

const COST_CENTER = 'Fake Cost Center';

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

describe('Worker Expenses submit and save', () => {
  let engagementStatus: EngagementStatusModel;
  let amount;
  let date;
  let generatedEngagement;
  const jobProfile = 'Random Job Profile';

  before('Login as worker', async () => {
    await Auth.loginAsWorker();
    amount = RandomNumber.randomNumber(4);
    date = new Date().toLocaleDateString('Eu-ES',
        { day: '2-digit', month: '2-digit', year: 'numeric' });
    await workerHomePageInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.gwgExpenses);
  });

  beforeEach('Open home page', async () => {
    await WorkerHomePage.open();
  });

  it('should be able to create expenses', async () => {
    
    const workerUid = await getCurrentWorkerUid();
    engagementStatus = 'PRE_HIRE';
    generatedEngagement = await generateEngagement(workerUid, `${jobProfile}`, engagementStatus);
    const clientLabelElement = await WorkerHomePage.getClient(
      `${generatedEngagement?.jobProfile} (${generatedEngagement?.legalEntity?.name})`
    );
    await workerExpenses
    .clickExpensesNavigationLink()
    .clickAddExpenses()
    .clickAddEngagement()
    .clickLabelElement(clientLabelElement)
    .clickAddCostCenter()
    .clickAndGetCostCenter(COST_CENTER)
    .clickAddCategory()
    .selectCategoryExpensesType(WorkerCategoryExpensesTypes.TRAVEL)
    .addExpensesAmountAndDetails(amount)
    .clickAndAddDescription()
    .clickAndAddMerchant()
    .clickAndAddDate(date)
    .clickExpenseSubmit();
  });

  it('should be able to save as draft expenses', async () => {
    const workerUid = await getCurrentWorkerUid();
    engagementStatus = 'PRE_HIRE';
    generatedEngagement = await generateEngagement(workerUid, `${jobProfile}`, engagementStatus);
    const clientLabelElement = await WorkerHomePage.getClient(
      `${generatedEngagement?.jobProfile} (${generatedEngagement?.legalEntity?.name})`
    );
    await workerExpenses
    .clickExpensesNavigationLink()
    .clickAddExpenses()
    .clickAddEngagement()
    .clickLabelElement(clientLabelElement)
    .clickAddCostCenter()
    .clickAndGetCostCenter(COST_CENTER)
    .clickAddCategory()
    .selectCategoryExpensesType(WorkerCategoryExpensesTypes.TRAVEL)
    .addExpensesAmountAndDetails(amount)
    .clickAndAddDescription()
    .clickAndAddMerchant()
    .clickAndAddDate(date)
    .clickExpenseSave()
  });
});
