import { CreateNewUserModel, LegalEntityModel, SupplierUserProfileModel } from 'gwg';
import { CREATE_ENTERPRISE } from 'src/tests/api/CREATE_ENTERPRISE';
import { CREATE_USER_FOR_SUPPLIER } from 'src/tests/api/CREATE_USER_FOR_SUPPLIER';
import { DataTable } from 'src/modules/DataTable/DataTable';
import { DataTableBulkActions } from 'src/modules/DataTable/DataTableBulkActions';
import { GET_SUPPLIER_USER_PROFILE_SELF } from '../api/GET_SUPPLIER_USER_PROFILE_SELF';
import { logger } from '../../utils/utils/logger';
import Page from './Page';

enum ColumnNames {
  USERNAME = 'Username',
  CLIENT = 'Client'
}

enum BulkAction {
  EDIT = 'Edit',
  ACTIVATE = 'Activate',
  DEACTIVATE = 'Deactivate',
  DELETE = 'Delete'
}

enum RowAction {
  EDIT = 'Edit',
  ACTIVATE = 'Activate',
  DEACTIVATE = 'Deactivate',
  DELETE = 'Delete'
}

class SupplierUsersPage extends Page {
  dataTable = new DataTable({
    columnNames: ColumnNames,
    findRowByColumn: 'USERNAME',
    bulkActions: BulkAction,
    actions: RowAction
  });

  bulkActions = new DataTableBulkActions();

  static get UsersButton() {
    return $('div.content > a');
  }

  static get AddUserButton() {
    return $('button[data-test="upload-dialog"]');
  }

  static get clientsInputUser() {
    return $('div[data-test="userModel.clientsUids-field"] input');
  }

  static get createUserSubmitButton() {
    return $('button[data-test="create-user-button"]');
  }

  static get checkAllCheckbox() {
    return $(`div[data-test="check-all-checkbox"] label`);
  }

  static clientDropdownValue(value: string) {
    return $(`[data-test-value="${value}"]`);
  }

  static selectMenuItem(value: string) {
    return $('[data-test="select-menu-item"]');
  }

  static selectBody(value: string) {
    return $('div[data-test="data-table-body"]');
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

  static get usersUpdateSuccessToasterMessage() {
    return $('div[data-test="updated-users-status"]');
  }

  static userOptionsButton(email: string) {
    return $(`button[data-test="view-options-btn-${email}-button"]`);
  }

  static get contextOptionsButton() {
    return $('button[data-test="users-options-button"]');
  }

  static get userDeleteInlineButton() {
    return $('button[data-test="data-table-row-actions-button"]');
  }

  static get userDeleteMenuButton() {
    return $('div[data-test="menu-item__delete-users"]');
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
    return $(`td\\*=${username}`);
  }

  static get firstNameErrorMessage() {
    return $('[data-test="userModel.firstName-field-helper"]');
  }

  static get lastNameErrorMessage() {
    return $('[data-test="userModel.lastName-field-helper"]');
  }

  static get emailErrorMessage() {
    return $('[data-test="userModel.email-field-helper"]');
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

  createEnterprise() {
    return this.graphql<{ createEnterpriseClient: LegalEntityModel }>({
      query: CREATE_ENTERPRISE.loc.source.body
    });
  }

  createUserForSupplier(model: Omit<CreateNewUserModel, 'supplierUid' | 'role'>) {
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

  async editUser(username: string): Promise<this> {
    const actions = await this.dataTable.getRowActions(username);
    await actions.EDIT();
    return this;
  }

  async deactivateUser(username: string): Promise<this> {
    const actions = await this.dataTable.getRowActions(username);
    await actions.DEACTIVATE();
    return this;
  }

  async activateUser(username: string): Promise<this> {
    const actions = await this.dataTable.getRowActions(username);
    await actions.ACTIVATE();
    return this;
  }

  async deleteUser(username: string): Promise<this> {
    const actions = await this.dataTable.getRowActions(username);
    await actions.DELETE();
    return this;
  }

  async editUserViaBulkActions(usernames: string[]): Promise<this> {
    await (await this.dataTable.getBulkActions(usernames)).EDIT();
    return this;
  }

  async deleteUserViaBulkActions(usernames: string[]): Promise<this> {
    await (await this.dataTable.getBulkActions(usernames)).DELETE();
    return this;
  }

  async activateUserViaBulkActions(usernames: string[]): Promise<this> {
    await (await this.dataTable.getBulkActions(usernames)).ACTIVATE();
    return this;
  }

  async deactivateUserViaBulkActions(usernames: string[]): Promise<this> {
    await (await this.dataTable.getBulkActions(usernames)).DEACTIVATE();
    return this;
  }

  async getRowDetails(username: string) {
    return this.dataTable.getRowDetails(username);
  }

  async getErrorForMultipleEdit() {
    let error;
    await this.dataTable.getRowCount();
    await this.bulkActions.toggleAllCheckboxes();
    await (await this.dataTable.getBulkActions([])).EDIT().catch((e) => {
      error = e;
    });
    return error?.message;
  }

  async deleteMultipleUsers() {
    await this.dataTable.getRowCount();
    await this.bulkActions.toggleAllCheckboxes();
    await (await this.dataTable.getBulkActions([])).DELETE();
  }

  async deactivateMultipleUsers(usernames: string[] = []) {
    await (await this.dataTable.getBulkActions(usernames)).DEACTIVATE();
  }

  async activateMultipleUsers(usernames: string[] = []) {
    await (await this.dataTable.getBulkActions(usernames)).ACTIVATE();
  }

  async getUser(model: Omit<CreateNewUserModel, 'supplierUid' | 'role'>) {
    const { data, errors } = await this.createUserForSupplier(model);
    logger.error(errors);
    return data?.createUserForSupplier;
  }

}

export default SupplierUsersPage;
