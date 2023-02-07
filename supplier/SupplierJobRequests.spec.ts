import { logger } from '../../../utils/utils/logger';
import Auth from '../../common/Auth';
import JobRequestsPage from '../../pages/JobRequests.page';

const jobRequestsInstance = new JobRequestsPage();

const getEnterpriseUid = async () => {
  const { data, errors } = await jobRequestsInstance.createEnterprise();
  logger.error(errors);
  return data?.createEnterpriseClient?.uid;
};

const getJobRequest = async (enterpriseUid) => {
  const { data, errors } = await jobRequestsInstance.createJobRequest(enterpriseUid);
  logger.error(errors);
  return data?.dev_createJobRequest;
};

describe('JobRequests', () => {
  const jrTotal = 10;
  let enterpriseUid;
  let jobRequests;

  before('create enterprise', async () => {
    await Auth.loginAsSupplier();
    enterpriseUid = await getEnterpriseUid();
    const jobRequestPromises = [];
    for (let index = 0; index < jrTotal; index += 1) {
      jobRequestPromises.push(getJobRequest(enterpriseUid));
    }
    jobRequests = await Promise.all(jobRequestPromises);
  });

  after('delete created enterprise', async () => {
    await jobRequestsInstance.removeEnterprise(enterpriseUid);
    await jobRequestsInstance.removeAllWorkPostings();
  });

  beforeEach('open JobRequestsPage', async () => {
    await JobRequestsPage.open();
    await browser.waitUntil(async () => (await (await JobRequestsPage.totalCount).getText()) !== 'Loading');
  });

  it('should show 10 more job requests', async () => {
    for (let index = 0; index < jrTotal; index += 1) {
      /* eslint-disable no-await-in-loop */
      const itNumber = await JobRequestsPage.getJobRequestItemNumberTest(jobRequests[index].enterprisePostingNumber);
      expect(itNumber).toBe(`${jobRequests[index].enterprisePostingNumber}`);
    }
    expect(await (await JobRequestsPage.totalCount).getText()).toMatch(/Viewing .* Job Postings/);
  });

  it('should open one job posting', async () => {
    await JobRequestsPage.getId().waitForExist();
    await JobRequestsPage.getId().click();
    expect(await JobRequestsPage.jobRequest).toExist();
    await JobRequestsPage.getAddCandidate().waitForExist();
    await JobRequestsPage.getAddCandidate().click();
    expect(await JobRequestsPage.addCandidate).toExist();
  });

  it('should successfully check search option', async () => {
    await JobRequestsPage.search(`${jobRequests[0].title}`);
    await JobRequestsPage.addSearch().waitForExist();
    await JobRequestsPage.addSearch().click();
    expect (await JobRequestsPage.tableRow).toExist();
  });

  it('should successfully open filter', async () => {
    await JobRequestsPage.addFilter().waitForExist();
    await JobRequestsPage.addFilter().click();
    expect(await JobRequestsPage.addSearchInput).toExist();
  });
  
});
