import { CreateNewUserModel, SupplierUserProfileModel } from 'gwg';
import { GET_SUPPLIER_USER_PROFILE_SELF } from '../../api/GET_SUPPLIER_USER_PROFILE_SELF';
import Page from '../Page';
import { logger } from '../../../utils/utils/logger';
import { CREATE_USER_FOR_SUPPLIER } from '../../api/CREATE_USER_FOR_SUPPLIER';

class SupplierUsersPage extends Page {
  public static async open() {
    await Page.open('supplier/admin-settings/users');
  }

  static get usersButton() {
    return $('div.content > a');
  }

  static get clientsInput() {
    return $('[data-test="userModel.clientsUids-field-wrapper"] input');
  }

  static get checkAllCheckbox() {
    return $(`div[data-test="check-all-checkbox"] label`);
  }

  static get contextOptionsButton() {
    return $('button[data-test="users-options-button"]');
  }

  static get userDeleteInlineButton() {
    return $('div[data-test="delete-user-button"]');
  }

  static get userDeleteMenuButton() {
    return $('div[data-test="menu-item__delete-users"]');
  }

  static get userConfirmDeleteButton() {
    return $('button[data-test="delete-user-confirm-button"]');
  }

  static get userEditInlineButton() {
    return $('div[data-test="edit-user-button"]');
  }

  static get userEditMenuButton() {
    return $('div[data-test="menu-item__edit-user"]');
  }

  static get userUpdateButton() {
    return $('button[data-test="update-user-button"]');
  }

  static get supplierTableUsernameHeader() {
    return $('button[data-test-type="USERNAME"]');
  }

  static get successfulUserCreationToaster() {
    return $(`div[data-test="successfully-created-suppler-user"]`);
  }

  static get successfulUserUpdateToaster() {
    return $(`div[data-test="successfully-updated-suppler-user"]`);
  }

  static get unableToUpdateToaster() {
    return $('[data-test="unable-to-update-user"] span');
  }

  static createdSupplierTdElementByUsername(username: string) {
    return $(`td*=${username}`);
  }

  static get activateUserMenuButton() {
    return $('[data-test="menu-item__activate-users"]');
  }

  static get activateUserInlineButton() {
    return $('[data-test="activate-user-button"]');
  }

  static get deactivateUserMenuButton() {
    return $('[data-test="menu-item__deactivate-users"]');
  }

  static get deactivateUserInlineButton() {
    return $('[data-test="deactivate-user-button"]');
  }

  static get adminSettingsUsersTable() {
    return $('[data-test="admin-user-settings-table-container"]');
  }

  static get adminSettingsUsersUpdate() {
    return $('div[data-test="updated-users-status"]');
  }

  static selectMenuItem(value: string) {
    return $('[data-test="select-menu-item"]');
  }

  static userCheckbox(uid: string) {
    return $(`td[data-test="${uid}checkbox"] label`);
  }

  static userClients(uid: string) {
    return $(`td[data-test="${uid}clients"]`);
  }

  static userStatus(uid: string) {
    return $(`td[data-test="${uid}status"]`);
  }

  static userOptionsButton(email: string) {
    return $(`button[data-test="view-options-btn-${email}-button"]`);
  }

  createUserForSupplier(model: CreateNewUserModel) {
    return this.graphql<{ createUserForSupplier: SupplierUserProfileModel }>({
      query: CREATE_USER_FOR_SUPPLIER.loc.source.body,
      variables: {
        createNewUserModel: model
      }
    });
  }

  fetchCurrentUserData() {
    return this.graphql<{ getSupplierUserProfileSelf: SupplierUserProfileModel }>({
      query: GET_SUPPLIER_USER_PROFILE_SELF.loc.source.body
    });
  }

  async getUser(model: CreateNewUserModel) {
    const { data, errors } = await this.createUserForSupplier(model);
    logger.error(errors);
    return data?.createUserForSupplier;
  }

  async getCurrentUser() {
    const { data, errors } = await this.fetchCurrentUserData();
    logger.error(errors);
    return data?.getSupplierUserProfileSelf;
  }
}

export default SupplierUsersPage;
