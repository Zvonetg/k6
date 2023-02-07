import { GwgEngagementModel } from 'gwg';
import { CREATE_ENGAGEMENT } from 'src/tests/api/CREATE_ENGAGEMENT';
import Page from '../Page';

class SupplierHomePage extends Page {
  static get tasksPageButton() {
    return $('.desktop button[data-test="task-icon"]');
  }

  static get jobPostingsButton() {
    return $('a[title="Job Postings"]');
  }

  static get AdminSettingsNavigationLink() {
    return $('a[title="Admin Settings"]');
  }

  static get ExpensesNavigationLink() {
    return $('a[title="Expenses"]');
  }

  static get TimeAndExpensesButton() {
    return $('a[title="Time & Expenses"]');
  }

  static get remindMeLaterTaskButon() {
    return $('button[data-test="dismiss-button"]');
  }

  static get smartFormPrompt() {
    return $('div[data-test="prompt-SMARTFORM"]');
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

export default SupplierHomePage;
