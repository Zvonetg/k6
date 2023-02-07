import Page from './Page';

class JobRequestPage extends Page {
  static get addCandidateButton() {
    return $('[data-test="button"]');
  }

  static get confirmCandidateButton() {
    return $('[data-test="confirm-button"]');
  }

  static get confirmCandidateToast() {
    return $('[data-test="candidate-success-toast"]');
  }

  static get confirmCandidateDeletedToast() {
    return $('[data-test="candidate-successfully-deleted"]');
  }

  static get confirmCandidateUpdatedToast() {
    return $('[data-test="candidate-successfully-updated"]');
  }

  static get selectWorkerDropDown() {
    return $('[data-test="worker-typeahead"]');
  }

  static get candidateActionsButton() {
    return $('[data-test="candidate-actions"]');
  }

  static get candidateEditButton() {
    return $('[data-test="edit-candidate"]');
  }

  static get candidateBillRateInput() {
    return $('[placeholder="Enter Bill Rate..."]');
  }

  static get candidatePayRateInput() {
    return $('[placeholder="Enter Pay Rate..."]');
  }

  static get selectWorkerInput() {
    return $('[data-test="worker-typeahead"] input');
  }

  static get saveWorkerRatedButton() {
    return $('[data-test="inline-form-submit"]');
  }

  static get submitToJobRequestButton() {
    return $('[data-test="submit-to-req-button"]');
  }

  static get removeActionsButton() {
    return $('[data-test="icon-dropdown-button"]');
  }

  static get removeFromJobRequestButton() {
    return $('[data-test="menu-list-item"]');
  }

  static getCandidatesTableFirstRow() {
    return $('table tbody tr');
  }

  static get candidatesFirstRowCheckbox() {
    return $('table tbody tr td [class="checkmark"]');
  }

  static async openCandidatesLinkByUid(uid: string) {
    await this.open(`supplier/job-postings/${uid}/candidates`);
  }

  static getCandidateByUid(uid: string) {
    return $(`[data-test="undefined${uid}"]`);
  }

  static getCandidateLinkByName(name: string) {
    return $(`*=${name}`);
  }

  static async getCandidateLinkByUid(uid: string, candidateName: string) {
    const candidateRow = await this.getCandidateByUid(uid);
    return candidateRow.$(`=${candidateName}`);
  }
}

export default JobRequestPage;
