import Page from '../Page';

class SupplierAdminPage extends Page {
  public static async open() {
    await Page.open('supplier/admin-settings/users');
  }

  static get addUserButton() {
    return $('button[data-test="upload-dialog"]');
  }

  static get clientsInputUser() {
    return $('div[data-test="userModel.clientsUids-field-wrapper"] input');
  }

  static selectMenuItem(value: string) {
    return $('[data-test="select-menu-item"]');
  }

  static get createUserSubmitButton() {
    return $('button[data-test="create-user-button"]');
  }

  static get successfulUserCreationToaster() {
    return $(`div[data-test="successfully-created-suppler-user"]`);
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

  static get userConfirmDeleteButton() {
    return $('button[data-test="delete-user-confirm-button"]');
  }

  static get usersUpdateSuccessToasterMessage() {
    return $('div[data-test="updated-users-status"]');
  }

  static get firstnameTextInput() {
    return $('[data-test="userModel.firstName-field-wrapper"] input');
  }

  static get lastnameTextInput() {
    return $('[data-test="userModel.lastName-field-wrapper"] input');
  }

  static get emailTextInput() {
    return $('[data-test="userModel.email-field-wrapper"] input');
  }

  static get clientsInput() {
    return $('[data-test="userModel.clientsUids-field-wrapper"] input');
  }

  static get userUpdateButton() {
    return $('button[data-test="update-user-button"]');
  }

  static get successfulUserUpdateToaster() {
    return $(`div[data-test="successfully-updated-suppler-user"]`);
  }
}

export default SupplierAdminPage;
