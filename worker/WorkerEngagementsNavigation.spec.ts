import Auth from '../../common/Auth';
import EngagementsPage from '../../pages/Engagements.page';
import WorkerHomePage from '../../pages/WorkerHome.page';

describe('Worker Engagements Navigation', () => {
  before('Login as worker', async () => {
    await Auth.loginAsWorker();
  });

  it('should navigate from Home screen to Engagements Hub through the Engagements NavBar link', async () => {
    await WorkerHomePage.open();
    const engagementsNavigationLink = await WorkerHomePage.engagementsNavigationLink;
    engagementsNavigationLink.waitForExist();
    await (await engagementsNavigationLink).click();
    expect(await browser.getUrl()).toContain('/engagements');
  });

  it('should navigate to Active engagements screen', async () => {
    await EngagementsPage.openEngagements();
    await (await EngagementsPage.getActiveEngagementsTab()).click();
    expect(await EngagementsPage.selectedActiveNavigationTab()).toHaveAttribute('aria-selected', 'true');
    expect(await browser.getUrl()).toContain('/engagements');
  });

  it('should navigate to Past engagements screen', async () => {
    await EngagementsPage.openPastEngagements();
    await (await EngagementsPage.getPastEngagementsTab()).click();
    expect(await EngagementsPage.selectedPastNavigationTab()).toHaveAttribute('aria-selected', 'true');
    expect(await browser.getUrl()).toContain('/engagements/past');
  });
});
