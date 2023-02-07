import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import Auth from '../../common/Auth';
import WorkerHomePage from '../../pages/WorkerHome.page';
import {workerExpenses} from '../../pages/worker/WorkerExpenses.page';


describe('Worker Expenses edit and correct', () => {
  const workerExpensesInstance = new WorkerHomePage();
  let expenses: any = [];

  before('Login as worker', async () => {
    await Auth.loginAsWorker();
    const response = await workerExpensesInstance.createWorkerExpenses();
    expenses = response?.data?.dev_createRandomExpensesForWorker?.items ?? [];
    await workerExpensesInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.gwgExpenses);
  });

  beforeEach('Open home page', async () => {
    await WorkerHomePage.open();
  });

  it('should be able to open correct an expense form', async () => {
    await workerExpenses
        .clickExpensesNavigationLink()
        .clickAddHistoryExpenses()
        .clickGetOpenExpensesApproved(expenses)
        .clickAddOptionMenu()
        .clickAddCorrectButton()
        .clickCorrectApprovedExpense();
  });

  it('should be able to edit expenses and submit', async () => {
    await workerExpenses
        .clickExpensesNavigationLink()
        .clickAddHistoryExpenses()
        .clickGetOpenExpensesRejected(expenses)
        .clickAddOptionMenu()
        .clickAddEditButton()
        .clickAndAddDescription()
        .clickExpenseSubmit();
  });
});
