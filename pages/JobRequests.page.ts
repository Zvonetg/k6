import { WorkPostingModel, LegalEntityModel, WorkerProfileModel } from 'gwg';
import { CREATE_ENTERPRISE } from 'src/tests/api/CREATE_ENTERPRISE';
import { CREATE_WORK_POSTING } from '../api/CREATE_WORK_POSTING';
import { INVITE_WORKER } from '../api/INVITE_WORKER';
import { REMOVE_ENTERPRISE } from '../api/REMOVE_ENTERPRISE';
import { REMOVE_ALL_WORK_POSTINGS } from '../api/REMOVE_ALL_WORK_POSTINGS';
import Page from './Page';

class JobRequestsPage extends Page {
  static get totalCount() {
    return $('[data-test="data-table-message"]');
  }

  static getJobRequestItemByNumber(number: string) {
    return $(`[data-test="${number}-enterprisePostingNumber"]`);
  }

  static async getJobRequestItemNumberTest(number: string) {
    const jr = await this.getJobRequestItemByNumber(number);
    return jr.getText();
  }

  static getJobRequestItemByUid(uid: string) {
    return $(`[data-test="job-request-item${uid}"]`);
  }

  static async getJobRequestItemNumber(uid) {
    const jr = await this.getJobRequestItemByUid(uid);
    const itemNumber = await jr.$('[data-test="job-request-item-number"]');
    return itemNumber.getText();
  }

  static async getJobRequestItemStatus(uid) {
    const jr = await this.getJobRequestItemByUid(uid);
    const itemNumber = await jr.$('[data-test="job-request-item-status"]');
    return itemNumber.getText();
  }

  static async getJobRequestItemLink(uid) {
    const jobRequest = await this.getJobRequestItemByUid(uid);
    return jobRequest.$('[role="link"]');
  }

  public static async open() {
    await Page.open('supplier/job-postings');
  }

  static getId() {
    return $('[data-test="overflow-typography"]');
  }

  static getAddCandidate() {
    return $('[data-test="button"]');
  }

  static get jobRequest() {
    return $('[data-test="job__request__content"]');
  }

  static get addCandidate() {
    return $('[data-test="modal__content"]');
  }

  static addSearch() {
    return $('[data-test="search-input-container"]');
  }

  static get addSearchInput() {
    return $('[data-test="search-input-container"] input');
  }

  static addFilter() {
    return $('[data-test="data-table-filter-icon"]');
  }

  static get closeFilter() {
    return $('[data-test="close-filter-drawer"]');
  }

  static get tableRow() {
    return $('[data-test="data-table-row"]');
  }

  static async search(search: string) {
    await (await JobRequestsPage.addSearchInput).waitForExist();
    await (await JobRequestsPage.addSearchInput).setValue(search);
    await browser.waitUntil(async () => (await (await JobRequestsPage.addSearchInput).getValue()) === search);
    return this;
  }

  createEnterprise() {
    return this.graphql<{ createEnterpriseClient: LegalEntityModel }>({
      query: CREATE_ENTERPRISE.loc.source.body
    });
  }

  removeEnterprise(enterpriseUid: string) {
    return this.graphql<{ dev_removeEnterpriseClient: LegalEntityModel }>({
      query: REMOVE_ENTERPRISE.loc.source.body,
      variables: {
        clientUid: enterpriseUid
      }
    });
  }

  removeAllWorkPostings() {
    return this.graphql<{ dev_removeAllWorkPostings: WorkPostingModel }>({
      query: REMOVE_ALL_WORK_POSTINGS.loc.source.body,
      variables: {
        clientUid: '12345'
      }
    });
  }

  createCandidate(model: WorkerProfileModel) {
    return this.graphql<{ inviteWorker: WorkerProfileModel }>({
      query: INVITE_WORKER.loc.source.body,
      variables: {
        profile: model
      }
    });
  }

  createJobRequest(enterpriseUid: string) {
    return this.graphql<{ dev_createJobRequest: WorkPostingModel }>({
      query: CREATE_WORK_POSTING.loc.source.body,
      variables: {
        enterpriseUid
      }
    });
  }
}

export default JobRequestsPage;
