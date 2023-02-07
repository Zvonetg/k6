import { GwgEngagementModel} from 'gwg';
import { CREATE_ENGAGEMENT } from '../api/CREATE_ENGAGEMENT';
import Page from './Page';

class EngagementsPage extends Page {
  static async getActiveEngagements() {
    return $('[data-test="active-engagement-item"]');
  }

  static async selectedActiveNavigationTab() {
    return $('[data-test="link-active-engagemets-tab"]');
  }

  static async statusActiveEngagement() {
    return $('[data-test="Pre-Hire-status-chip"]');
  }

  static async selectedPastNavigationTab() {
    return $('[data-test="link-past-engagemets-tab"]');
  }

  static async statusPastEngagement() {
    return $('[data-test="Offboarded-status-chip"]');
  }

  static get emptyResultsMessage() {
    return $('[data-test="empty-results"]');
  }

  static async getPastEngagementsTab() {
    return $('[data-test="link-past-engagemets-tab"]');
  }

  static async getActiveEngagementsTab() {
    return $('[data-test="link-active-engagemets-tab"]');
  }

  public static async openEngagements() {
    await Page.open('worker/engagements');
  }

  public static async openPastEngagements() {
    await Page.open('worker/engagements/past');
  }

  static async getPastEngagements() {
    return $('[data-test="past-engagement-item"]');
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
