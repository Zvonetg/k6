import EngagementsPage from '../supplier/SupplierEngagements.page';
import Page from '../Page';

class PastEngagementsPage extends EngagementsPage {
  static async getPastEngagements() {
    await $('[data-test="past-engagement-item"]').waitForExist();
    return $$('[data-test="past-engagement-item"]');
  }

  public static async open() {
    await Page.open('worker/engagements/past');
  }
}

export default PastEngagementsPage;
