import { GwgEngagementModel } from 'gwg';
import { CREATE_ENGAGEMENT } from '../../api/CREATE_ENGAGEMENT';
import Page from '../Page';

class EngagementsPage extends Page {
  static async getActiveEngagements() {
    await $('[data-test="active-engagement-item"]').waitForExist();
    return $$('[data-test="active-engagement-item"]');
  }

  static get selectedNavigationTab() {
    return $('.selected-tab');
  }

  static get emptyResultsMessage() {
    return $('[data-test="empty-results"]');
  }

  static async getPastEngagementsTab() {
    return $('a*=Past');
  }

  static async getActiveEngagementsTab() {
    return $('a*=Active');
  }

  public static async open() {
    await Page.open('worker/engagements');
  }

  createEngagement(workerUid: string, engagementToCreate: Partial<GwgEngagementModel>) {
    return this.graphql<{ createEngagement: GwgEngagementModel }>({
      query: CREATE_ENGAGEMENT.loc.source.body,
      variables: {
        workerUid,
        engagement: engagementToCreate
      }
    });
  }
}

export default EngagementsPage;
