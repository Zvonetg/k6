import { SupplierUserProfileModel, WorkerProfileModel } from 'gwg';
import {
  CREATE_SUPPLIER_PROFILE,
  GET_SUPPLIER_USER_PROFILE_SELF,
  GET_WORKER_PROFILE_SELF
} from 'src/tests/api/CREATE_PROFILE';
import Page from './Page';

class ChooseAccountPage extends Page {
  static async chooseAccount(uid: string) {
    await (await this.getAccountCard(uid)).click();
  }

  static async getAccountCard(uid: string) {
    return $(`div[data-test="account-card-${uid}"]`);
  }

  static get goBackButton() {
    return $('button[data-test="go-back"]');
  }

  static get chooseAccountsSection() {
    return $('div[data-test="choose-accounts-section"]');
  }

  static get backToLoginScreen() {
    return $('[data-test="go-back"]');
  }

  static get signInButton() {
    return $('[data-test="auth0-login-button"]');
  }

  createSupplierProfile(email: string) {
    return this.graphql<{ profile: SupplierUserProfileModel }>({
      query: CREATE_SUPPLIER_PROFILE.loc.source.body,
      variables: {
        email
      }
    });
  }

  getSupplierUserProfile() {
    return this.graphql<{ getSupplierUserProfileSelf: SupplierUserProfileModel }>({
      query: GET_SUPPLIER_USER_PROFILE_SELF.loc.source.body
    });
  }

  getWorkerProfile() {
    return this.graphql<{ dev_getWorkerProfileSelf: WorkerProfileModel }>({
      query: GET_WORKER_PROFILE_SELF.loc.source.body
    });
  }
}

export default ChooseAccountPage;
