import { EngagementStatusModel, GwgEngagementModel } from 'gwg';
import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import SupplierHomePage from '../../pages/SupplierHome.page';
import EngagementsPage from '../../pages/Engagements.page';
import { logger } from '../../../utils/utils/logger';
import Auth from '../../common/Auth';
import RandomNumber from '../../common/RandomNumber';
import Random from '../../common/Random';
import SupplierHome from '../../pages/supplier/SupplierHome.page';
import {supplierExpenses} from "../../pages/supplier/SupplierExpenses.page";

const engagementsPageInstance = new EngagementsPage();

const getEnterpriseUid = async () => {
  const { data, errors } = await engagementsPageInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient?.uid;
};

const generateEngagement = async (workerUid: string, jobProfile: string, engagementStatus: EngagementStatusModel) => {
  const engagementToCreate: Partial<GwgEngagementModel> = { jobProfile, status: engagementStatus };
  const { data, errors } = await engagementsPageInstance.createEngagement(workerUid, engagementToCreate);
  logger.error(errors);
  return data?.createEngagement;
};

describe('GWG - Supplier Expenses', () => {
  let engagementStatus: EngagementStatusModel;
  let amount;
  let date;
  let text;
  const jobProfile = 'Random Job Profile';

  before('Login as supplier', async () => {
    await Auth.loginAsSupplier();
    amount = RandomNumber.randomNumber(4);
    date = new Date().toLocaleDateString('Eu-ES',
        { day: '2-digit', month: '2-digit', year: 'numeric' });
    text = Random.randomString(5);
    const supplierHomeInstance = new SupplierHome();
    await supplierHomeInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.gwgExpenses);
  });

  it('should create expenses', async () => {
    await SupplierHomePage.open();
    const enterpriseUid = await getEnterpriseUid();
    const activeEngagementPromises = [];
    engagementStatus = 'PRE_HIRE';
    activeEngagementPromises.push(generateEngagement(enterpriseUid, `${jobProfile}`, engagementStatus));
    await supplierExpenses
        .openExpenses()
        .clickAddGeneral()
        .clickAddEnterprise()
        .clickAddFirstCostCenter()
        .clickAddFirstCategory()
        .clickAddFirstAmount()
        .clickAddExpensesAmountDetails(amount)
        .clickAddDescription(text)
        .clickAddMerchant(text)
        .clickAddDate(date)
        .clickAddToExpensesSubmitButton();
  });

  it('should be able to save as draft expenses', async () => {
    await supplierExpenses
        .openExpenses()
        .clickAddGeneral()
        .clickAddEnterprise()
        .clickAddFirstCostCenter()
        .clickAddFirstCategory()
        .clickAddFirstAmount()
        .clickAddExpensesAmountDetails(amount)
        .clickAddDescription(text)
        .clickAddMerchant(text)
        .clickAddDate(date)
        .clickAddToExpensesSaveButton();
  });

  it('should be able to export expenses', async () => {
    await supplierExpenses
        .clickNavigateToExpenses()
        .clickExportButton()
        .clickExportToCsv();
  });
});
