import {
  EducationDegreeModel,
  EducationCertificationModel,
  EducationTrainingModel,
  RelationshipTypeModel
} from 'gwg';
import { ElementArray } from 'webdriverio';
import Random from 'src/tests/common/Random';
import Page from '../Page';
import { toSync } from '../../../utils/utils/toSync';
import { formatDate } from '../../common/DateHelpers';
import { RELATIONSHIP_TYPE_OPTION_LABELS } from '../../../utils/utils/testUtils';

export enum WorkerEducationTypes {
  DEGREE = 'Degree',
  LICENCE_OR_CERTIFICATE = 'Licence or Certificate',
  TRAINING = 'Training'
}

export enum WorkerCategoryTypes {
  PHONE = 'Phone',
  ADDRESS = 'Address'
}

export class WorkerMyAccountPage extends Page {
  open = async () => {
    await Page.open('worker/my-account');
    return this;
  };

  static get personalDetailsSmartForm() {
    return $(`[data-test="personal_details_smart_form_dialog"]`);
  }

  static get phoneNumber() {
    return $('input[data-test="phone-number-phone-number"]');
  }

  static get personalDetailsLabel() {
    return $(`[data-test="personal-details"]`);
  }

  static get professionalSummaryLabel() {
    return $(`[data-test="professional-summary"]`);
  }

  static get termsAndConditionsLabel() {
    return $(`[data-test="terms-and-conditions"]`);
  }

  static get contactLabel() {
    return $(`[data-test="contact"]`);
  }

  static get emergencyContactLabel() {
    return $(`[data-test="emergency-contact"]`);
  }

  static get educationHistoryLabel() {
    return $(`[data-test="education-history"]`);
  }

  static get resumesAndDocuments() {
    return $(`[data-test="resume-documents"]`);
  }

  static get educationHistoryTitle() {
    return $(`[data-test="education-history-title"]`);
  }

  static get educationDegreesList() {
    return $(`[data-test="detail-list__education-degrees"]`);
  }

  static get educationCertificationList() {
    return $(`[data-test="detail-list__education-certifications"]`);
  }

  static get educationTrainingList() {
    return $(`[data-test="detail-list__education-trainings"]`);
  }

  static get educationDegreeRow() {
    return $(`[data-test="detail-list-item__degree"]`);
  }

  static get phoneListRow() {
    return $(`[data-test="detail-list-item__phone-number"]`);
  }

  get phoneListRow() {
    return $(`[data-test="detail-list-item__phone-number"]`);
  }

  get emergencyListRow() {
    return $(`[data-test="detail-list-item__emergency-contact"]`);
  }

  static get educationcertificationRow() {
    return $(`[data-test="detail-list-item__certification"]`);
  }

  static get educationtrainingRow() {
    return $(`[data-test="detail-list-item__training"]`);
  }

  static get educationDegreeNameRow() {
    return $(`[data-test="detail-list-item__degree"]`).$(`.detailed-list-item__value`);
  }

  static get optionsMenu() {
    return $(`[data-test="options-menu"]`);
  }

  static get editOptionButton() {
    return $(`[data-test="edit-button"]`);
  }

  static get deleteOptionButton() {
    return $(`[data-test="delete-button"]`);
  }

  static get menuOption() {
    return $(`[data-test="menu-options"]`);
  }

  static get deleteDialog() {
    return $(`[data-test="delete-dialog"]`);
  }

  static get editDialog() {
    return $(`[data-test="edit-button"]`);
  }

  static get confirmDeleteOptionButton() {
    return $(`[data-test="confirm-delete-button"]`);
  }

  static get educationCertificationsList() {
    return $(`[data-test="detail-list__education-certifications"]`);
  }

  static get educationTrainingsList() {
    return $(`[data-test="detail-list__education-trainings"]`);
  }

  static get addContactInformation() {
    return $(`[data-test="button"]`);
  }

  static get addEducationButton() {
    return $(`[data-test="add-education-history__button"]`);
  }

  static get addContact() {
    return $(`[data-test="contactInfo.category-field-control"]`);
  }

  get addName() {
    return $(`[data-test="emergencyContactModel.name.fullName-field-control"]`);
  }

  get addRelationship() {
    return $(`[data-test="emergencyContactModel.relationshipType-field-control"]`);
  }

  get addNameInput() {
    return $(`[data-test="emergencyContactModel.name.fullName-field-control"] input`);
  }

  async clickAndAddNameInput() {
    await this.addNameInput.waitForExist()
    await this.addNameInput.click()
    await this.addNameInput.setValue(`${Random.randomString()}`);
    return this;
  }

  get addEmail() {
    return $(`[data-test="emergencyContactModel.email-field-control"] input`);
  }

  get addEmergencyContact() {
    return $(`[data-test="add-emergency-contact__button"]`);
  }

  get addPhone() {
    return $(`[data-test="phone-number-phone-number"] input`);
  }

  static get addPhone() {
    return $(`[data-test="phone-number-phone-number"] input`);
  }

  async addPhoneNumber(phone: number) {
    await this.addPhone.waitForExist();
    await this.addPhone.click();
    await this.addPhone.setValue(phone)
    return this;
  }

  get addPhoneEmergency() {
    return $(`[data-test="emergency-contact-phone-number-phone-number"] input`);
  }

  get addLabel() {
    return $(`[data-test="contactInfo.phone.label-field-control"] input`);
  }

  static get addLabel() {
    return $(`[data-test="contactInfo.phone.label-field-control"] input`);
  }

  async addLabelOption(label: string) {
    await this.addLabel.waitForExist();
    await this.addLabel.click();
    await this.addLabel.setValue(label)
    return this;
  }

  get addSave() {
    return $(`[data-test="contact-info__submit-button"]`);
  }

  async clickAddSave() {
    await this.addSave.waitForExist();
    await this.addSave.click();
    expect(await this.contactAddedToast).toExist()
    return this;
  }

  static get degreeTypeMenuItem() {
    return $(`[data-test="Degree"]`);
  }

  static getRelationshipOption(option: RelationshipTypeModel) {
    return $(`[data-test="${RELATIONSHIP_TYPE_OPTION_LABELS[option]}"]`);
  }

  async selectRelationshipOption(option: RelationshipTypeModel) {
    const relationshipOption = await WorkerMyAccountPage.getRelationshipOption(option);
    await (await relationshipOption).waitForExist();
    await (await relationshipOption).click();
    return this;
  }

  static get certificationTypeMenuItem() {
    return $(`[data-test="Licence or Certificate"]`);
  }

  static get trainingTypeMenuItem() {
    return $(`[data-test="Training"]`);
  }

  static get contactCategoryPhone() {
    return $(`[data-test="Phone"]`);
  }

  static get contactCategoryAddress() {
    return $(`[data-test="Address"]`);
  }

  static get educationDegreePageTitle() {
    return $(`[data-test="education-degree-title"]`);
  }

  static get educationCertificationPageTitle() {
    return $(`[data-test="education-certification-title"]`);
  }

  static get educationTrainingPageTitle() {
    return $(`[data-test="education-training-title"]`);
  }

  static get educationHistorySmartForm() {
    return $(`[data-test="education-history-smart-form"]`);
  }

  static get degreeSmartFormInstitutionField() {
    return $(`[data-test="education-degree-institution__input"]`);
  }

  static get degreeSmartFormDegreeNameField() {
    return $(`[data-test="education-degree-name__input"]`);
  }

  static get degreeSmartFormFieldOfStudyField() {
    return $(`[data-test="education-degree-field-of-study__input"]`);
  }

  static get degreeSmartFormStartYearField() {
    return $(`[data-test="education-degree-start-year__input"]`);
  }

  static get degreeSmartFormCompletionYearField() {
    return $(`[data-test="education-degree-completion-year__input"]`);
  }

  static get certificateSmartFormName() {
    return $(`[data-test="education-licence-name__input"]`);
  }

  static get certificateSmartFormOrganization() {
    return $(`[data-test="education-licence-organization__input"]`);
  }

  static get certificateSmartFormExpirationDate() {
    return $(`[data-test="education-licence-expiration-date__input"]`);
  }

  static get certificateSmartFormCredentialId() {
    return $(`[data-test="education-licence-credentialId__input"]`);
  }

  static get certificateSmartFormCredentialUrl() {
    return $(`[data-test="education-licence-credentialUrl__input"]`);
  }

  static get trainingSmartFormInstitutionExpirationDate() {
    return $(`[data-test="education-training-completion-year__input"]`);
  }

  static get trainingSmartFormIssuingOrganization() {
    return $(`[data-test="education-degree-issuingorganization__input"]`);
  }

  static get trainingSmartFormName() {
    return $(`[data-test="education-training-name__input"]`);
  }

  static async getSelect() {
    const smartForm = await WorkerMyAccountPage.personalDetailsSmartForm;
    return smartForm.$('button[data-test="button"]');
  }

  static async getCountrySelect() {
    const smartForm = await WorkerMyAccountPage.personalDetailsSmartForm;
    return smartForm.$(`[data-test="personalDetails.countryOfBirthCode-field"]`);
  }

  static async getLabels() {
    const smartForm = await (await $$('div[role="presentation"]'))[1];
    return smartForm.$$('[role="menuitem"]');
  }

  static async getSaveButton() {
    return await $('button[data-test="button-save-personal-details"]');
  }

  static async selectGenderOption(gender: string) {
    const smartForm = await WorkerMyAccountPage.personalDetailsSmartForm;
    return smartForm.$(`[data-test="option-${gender}"]`);
  }

  static get firstNameEditButton() {
    return $(`[data-test="first-name-button"]`);
  }

  static get middleNameEditButton() {
    return $(`[data-test="middle-name-button"]`);
  }

  static get lastNameEditButton() {
    return $(`[data-test="last-name-button"]`);
  }

  static get preferredNameEditButton() {
    return $(`[data-test="preferred-name-button"]`);
  }

  static get genderEditButton() {
    return $(`[data-test="gender-button"]`);
  }

  static get dobEditButton() {
    return $(`[data-test="dob-button"]`);
  }

  static get countryEditButton() {
    return $(`[data-test="country-button"]`);
  }

  static get professionalSummaryEditButton() {
    return $(`[data-test="update-professional-summary__button"]`);
  }

  static get professionalSummaryRow() {
    return $(`[data-test="professional-summary-row"]`);
  }

  static get professionalSummaryInputTextArea() {
    return $(`[data-test="professional-summary__input"]`);
  }

  static get professionalSummaryCharacterCounter() {
    return $(`[data-test="professional-summary__character-counter"]`);
  }

  static get professionalSummarySubmitButton() {
    return $(`[data-test="professional-summary__submit-button"]`);
  }

  static get professionalSummaryUpdatedToast() {
    return $(`[data-test="professional-summary-updated"]`);
  }

  static get educationHistorySubmitButton() {
    return $(`[data-test="education-history__submit-button"]`);
  }

  static get educationHistoryAddedToast() {
    return $(`[data-test="education-history-added"]`);
  }

  get contactAddedToast() {
    return $(`[data-test="add-worker-contact-info"]`);
  }

  get contactDeletedToast() {
    return $(`[data-test="delete-worker-contact-info"]`);
  }


  get emergencyAddedToast() {
    return $(`[data-test="create-emergency-contact"]`);
  }

  static get emergencyUpdateToast() {
    return $(`[data-test="update-emergency-contact"]`);
  }

  get emergencySaveButton() {
    return $(`[data-test="emergency-contact-info__submit-button"]`);
  }

  get emergencyDeletedToast() {
    return $(`[data-test="delete-emergency-contact"]`);
  }

  async deleteToastMessage() {
    expect (await this.emergencyDeletedToast).toExist();
    return this;
  }

  static get educationHistoryUpdatedToast() {
    return $(`[data-test="education-history-updated"]`);
  }

  static get educationHistoryDeletedToast() {
    return $(`[data-test="education-history-deleted"]`);
  }

  static get detailsUpdatedToast() {
    return $(`[data-test="personal-details-updated"]`);
  }

  async waitForDetailsUpdatedToast() {
    await (await WorkerMyAccountPage.detailsUpdatedToast).waitForDisplayed();
    return this;
  }

  static get detailsFailedToast() {
    return $(`[data-test="personal-details-failed"]`);
  }

  static async getInputWithName(name: string) {
    return $(`[value="${name}"]`);
  }

  async clickGenderEditButton() {
    await (await WorkerMyAccountPage.genderEditButton).waitForExist();
    await (await WorkerMyAccountPage.genderEditButton).click();
    return this;
  }

  async clickMiddleNameEditButton() {
    await (await WorkerMyAccountPage.middleNameEditButton).waitForExist();
    await (await WorkerMyAccountPage.middleNameEditButton).click();
    return this;
  }

  async clickPersonalDetailsLabel() {
    await (await WorkerMyAccountPage.personalDetailsLabel).waitForExist();
    await (await WorkerMyAccountPage.personalDetailsLabel).click();
    return this;
  }

  async navigateToProfessionalSummary() {
    await (await WorkerMyAccountPage.professionalSummaryLabel).waitForExist();
    await (await WorkerMyAccountPage.professionalSummaryLabel).click();
    return this;
  }

  async navigateToContactInformation() {
    await (await WorkerMyAccountPage.contactLabel).waitForExist();
    await (await WorkerMyAccountPage.contactLabel).click();
    return this;
  }

  async navigateToEmergencyContact() {
    await (await WorkerMyAccountPage.emergencyContactLabel).waitForExist();
    await (await WorkerMyAccountPage.emergencyContactLabel).click();
    return this;
  }

  async navigateToEducationHistory() {
    await (await WorkerMyAccountPage.educationHistoryLabel).waitForExist();
    await (await WorkerMyAccountPage.educationHistoryLabel).click();
    return this;
  }

  async navigateToResumesAndDocuments() {
    await (await WorkerMyAccountPage.resumesAndDocuments).waitForExist();
    await (await WorkerMyAccountPage.resumesAndDocuments).click();
    return this;
  }

  async clickAddEducation() {
    await (await WorkerMyAccountPage.addEducationButton).waitForExist();
    await (await WorkerMyAccountPage.addEducationButton).click();
    return this;
  }

  async clickAddContact() {
    await (await WorkerMyAccountPage.addContactInformation).waitForExist();
    await (await WorkerMyAccountPage.addContactInformation).click();
    return this;
  }

  async clickAddEmergencyContact() {
    await this.addEmergencyContact.waitForExist();
    await this.addEmergencyContact.click();
    return this;
  }

  async clickFormContact() {
    await (await WorkerMyAccountPage.addContact).waitForExist();
    await (await WorkerMyAccountPage.addContact).click();
    return this;
  }

  async clickNameField() {
    await this.addName.waitForExist();
    await this.addName.click();
    return this;
  }

  async clickRelationship() {
    await this.addRelationship.waitForExist();
    await this.addRelationship.click();
    return this;
  }

  async clickAndAddEmail(email: string) {
    await this.addEmail.waitForExist();
    await this.addEmail.click();
    await this.addEmail.setValue(email);
    return this;
  }

  async clickEmergencySaveButton() {
    await this.emergencySaveButton.waitForExist();
    await this.emergencySaveButton.click();
    expect (await this.emergencySaveButton.waitForExist());
    return this;
  }

  async clickEmergencyAdressRow() {
    const emergencyAddressRow = await workerMyAccountPage.emergencyListRow;
    await emergencyAddressRow.waitForExist();
    await emergencyAddressRow.click();
    return this;
  }

  async clickFormPhone() {
    await (await WorkerMyAccountPage.addPhone).waitForExist();
    await (await WorkerMyAccountPage.addPhone).click();
    return this;
  }

  async clickFormPhoneEmergency(phone: number) {
    await this.addPhoneEmergency.waitForExist();
    await this.addPhoneEmergency.click();
    await this.addPhoneEmergency.setValue(phone);
    return this;
  }

  async clickLabel() {
    await (await WorkerMyAccountPage.addLabel).waitForExist();
    await (await WorkerMyAccountPage.addLabel).click();
    return this;
  }

  async selectEducationType(educationType: WorkerEducationTypes) {
    let selectedTypeElement;
    switch (educationType) {
      case WorkerEducationTypes.DEGREE:
        selectedTypeElement = await WorkerMyAccountPage.degreeTypeMenuItem;
        break;
      case WorkerEducationTypes.LICENCE_OR_CERTIFICATE:
        selectedTypeElement = await WorkerMyAccountPage.certificationTypeMenuItem;
        break;
      case WorkerEducationTypes.TRAINING:
        selectedTypeElement = await WorkerMyAccountPage.trainingTypeMenuItem;
        break;
    }
    await selectedTypeElement.waitForExist();
    await selectedTypeElement.click();
    return this;
  }

  async selectCategoryType(categoryType: WorkerCategoryTypes) {
    let selectetCategoryElement;
    switch (categoryType) {
      case WorkerCategoryTypes.PHONE:
        selectetCategoryElement = await WorkerMyAccountPage.contactCategoryPhone;
        break;
      case WorkerCategoryTypes.ADDRESS:
        selectetCategoryElement = await WorkerMyAccountPage.contactCategoryAddress;
        break;
    }
    await selectetCategoryElement.waitForExist();
    await selectetCategoryElement.click();
    return this;
  }

  async updateDegree(degreeModel: EducationDegreeModel) {
    const { degree, institution, fieldOfStudy, startYear, completionYear } = degreeModel;
    const institutionField = await WorkerMyAccountPage.degreeSmartFormInstitutionField;
    const degreeNameField = await WorkerMyAccountPage.degreeSmartFormDegreeNameField;
    const fieldOfStudyField = await WorkerMyAccountPage.degreeSmartFormFieldOfStudyField;
    const startYearField = await WorkerMyAccountPage.degreeSmartFormStartYearField;
    const completionYearField = await WorkerMyAccountPage.degreeSmartFormCompletionYearField;

    await institutionField.waitForDisplayed();
    const institutionInputLength = (await institutionField.getValue()).length;
    await institutionField.setValue(new Array(institutionInputLength).fill('Backspace'));
    await institutionField.setValue(institution);

    await degreeNameField.waitForDisplayed();
    const degreeNameInputLength = (await degreeNameField.getValue()).length;
    await degreeNameField.setValue(new Array(degreeNameInputLength).fill('Backspace'));
    await degreeNameField.setValue(degree);

    await fieldOfStudyField.waitForDisplayed();
    const fieldOfStudyInputLength = (await fieldOfStudyField.getValue()).length;
    await fieldOfStudyField.setValue(new Array(fieldOfStudyInputLength).fill('Backspace'));
    await fieldOfStudyField.setValue(fieldOfStudy);

    await startYearField.waitForDisplayed();
    await startYearField.setValue(formatDate(startYear, 'backendCompatible'));

    await completionYearField.waitForDisplayed();
    await completionYearField.setValue(formatDate(completionYear, 'backendCompatible'));
  }

  async updateCertificate(certificateModel: EducationCertificationModel) {
    const { name, issuingOrganization, expirationDate, credentialId, credentialUrl } = certificateModel;
    const nameField = await WorkerMyAccountPage.certificateSmartFormName;
    const issuingOrganizationField = await WorkerMyAccountPage.certificateSmartFormOrganization;
    const expirationDateField = await WorkerMyAccountPage.certificateSmartFormExpirationDate;
    const credentialIdField = await WorkerMyAccountPage.certificateSmartFormCredentialId;
    const credentialUrlField = await WorkerMyAccountPage.certificateSmartFormCredentialUrl;

    await nameField.waitForDisplayed();
    const nameInputLength = (await nameField.getValue()).length;
    await nameField.setValue(new Array(nameInputLength).fill('Backspace'));
    await nameField.setValue(name);

    await issuingOrganizationField.waitForDisplayed();
    const issuingOrganizationInputLength = (await issuingOrganizationField.getValue()).length;
    await issuingOrganizationField.setValue(new Array(issuingOrganizationInputLength).fill('Backspace'));
    await issuingOrganizationField.setValue(issuingOrganization);

    await expirationDateField.waitForDisplayed();
    await expirationDateField.setValue(formatDate(expirationDate, 'backendCompatible'));

    await credentialIdField.waitForDisplayed();
    const credentialIdInputLength = (await credentialIdField.getValue()).length;
    await credentialIdField.setValue(new Array(credentialIdInputLength).fill('Backspace'));
    await credentialIdField.setValue(credentialId);

    await credentialUrlField.waitForDisplayed();
    const credentialUrlInputLength = (await credentialUrlField.getValue()).length;
    await credentialUrlField.setValue(new Array(credentialUrlInputLength).fill('Backspace'));
    await credentialUrlField.setValue(credentialUrl);
  }

  async updateTraining(trainingModel: EducationTrainingModel) {
    const { expirationDate, issuingOrganization, name } = trainingModel;
    const expirationDateField = await WorkerMyAccountPage.trainingSmartFormInstitutionExpirationDate;
    const issuingOrganizationField = await WorkerMyAccountPage.trainingSmartFormIssuingOrganization;
    const nameField = await WorkerMyAccountPage.trainingSmartFormName;

    await nameField.waitForDisplayed();
    const nameInputLength = (await nameField.getValue()).length;
    await nameField.setValue(new Array(nameInputLength).fill('Backspace'));
    await nameField.setValue(name);

    await issuingOrganizationField.waitForDisplayed();
    const issuingOrganizationInputLength = (await issuingOrganizationField.getValue()).length;
    await issuingOrganizationField.setValue(new Array(issuingOrganizationInputLength).fill('Backspace'));
    await issuingOrganizationField.setValue(issuingOrganization);

    await expirationDateField.waitForDisplayed();
    await expirationDateField.setValue(formatDate(expirationDate, 'backendCompatible'));
  }

  async editEducationHistory() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForDisplayed();
    await optionsMenu.click();

    const editButton = await WorkerMyAccountPage.editOptionButton;
    await editButton.waitForDisplayed();
    await editButton.waitForClickable();
    await editButton.click();
  }

  async editEducationCertification() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForDisplayed();
    await optionsMenu.click();

    const editButton = await WorkerMyAccountPage.editOptionButton;
    await editButton.waitForDisplayed();
    await editButton.waitForClickable();
    await editButton.click();
  }

  async editEducationTraining() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForDisplayed();
    await optionsMenu.click();

    const editButton = await WorkerMyAccountPage.editOptionButton;
    await editButton.waitForDisplayed();
    await editButton.waitForClickable();
    await editButton.click();
  }

  async deleteEducationHistory() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForClickable();
    await optionsMenu.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
  }

  async deleteCertificate() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForClickable();
    await optionsMenu.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
  }

  async deleteEducationTraining() {
    const optionsMenu = await WorkerMyAccountPage.optionsMenu;
    await optionsMenu.waitForClickable();
    await optionsMenu.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
  }

  async deletePhone() {
    const deleteButtonContact = await WorkerMyAccountPage.menuOption;
    await deleteButtonContact.waitForClickable();
    await deleteButtonContact.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
    expect(await this.contactDeletedToast).toExist()
    return this;
  }

  async editPhone() {
    const deleteButtonContact = await WorkerMyAccountPage.menuOption;
    await deleteButtonContact.waitForClickable();
    await deleteButtonContact.click();

    const deleteDialog = await WorkerMyAccountPage.editDialog;
    await deleteDialog.waitForClickable();
    await deleteDialog.click();
    return this;
  }

  async phoneRow(){
    const phoneRow = await WorkerMyAccountPage.phoneListRow;
    await phoneRow.waitForExist();
    await phoneRow.click();
    return this;
  }

  async deleteAddressEmergency() {
    const deleteButtonContact = await WorkerMyAccountPage.menuOption;
    await deleteButtonContact.waitForClickable();
    await deleteButtonContact.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
    return this;
  }

  async deleteDocument() {
    const deleteButtonContact = await WorkerMyAccountPage.menuOption;
    await deleteButtonContact.waitForClickable();
    await deleteButtonContact.click();

    const deleteButton = await WorkerMyAccountPage.deleteOptionButton;
    await deleteButton.waitForClickable();
    await deleteButton.click();

    const deleteDialog = await WorkerMyAccountPage.deleteDialog;
    await deleteDialog.waitForClickable();

    const confirmButton = await WorkerMyAccountPage.confirmDeleteOptionButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
  }

  async clickEditAddressEmergency() {
    const editButtonContact = await WorkerMyAccountPage.menuOption;
    await editButtonContact.waitForClickable();
    await editButtonContact.click();

    const editButton = await WorkerMyAccountPage.editOptionButton;
    await editButton.waitForClickable();
    await editButton.click();
    return this;
  }

  async clicklastNameEditButton() {
    await (await WorkerMyAccountPage.lastNameEditButton).waitForExist();
    await (await WorkerMyAccountPage.lastNameEditButton).click();
    return this;
  }

  async clickcountryEditButton() {
    await (await WorkerMyAccountPage.countryEditButton).waitForExist();
    await (await WorkerMyAccountPage.countryEditButton).click();
    return this;
  }

  async clickcountryLabel() {
    const countriesLabels = await WorkerMyAccountPage.getLabels();
    const label = await countriesLabels[Math.floor(Math.random() * countriesLabels.length)];
    await label.click();
    return this;
  }

  async updateFirstNameEditButton(oldFirstName, newFirstName) {
    await (await WorkerMyAccountPage.firstNameEditButton).waitForExist();
    await (await WorkerMyAccountPage.firstNameEditButton).click();
    await (await WorkerMyAccountPage.getInputWithName(oldFirstName)).waitForDisplayed();
    const firstNameInput = await WorkerMyAccountPage.getInputWithName(oldFirstName);
    const inputLength = (await firstNameInput.getValue()).length;
    await firstNameInput.setValue(new Array(inputLength).fill('Backspace'));
    await firstNameInput.setValue(newFirstName);
    await browser.keys('\uE007');
    return this;
  }

  async updatelastNameEditButton(oldlastName, newlastName) {
    await (await browser.$('input')).waitForDisplayed();
    const lastNameInput = !oldlastName
      ? await browser.$('input')
      : await WorkerMyAccountPage.getInputWithName(oldlastName.lastName);
    const inputLength = (await lastNameInput.getValue()).length;
    await lastNameInput.setValue(new Array(inputLength).fill('Backspace'));
    await lastNameInput.setValue(newlastName);
    await browser.keys('\uE007');
    return this;
  }

  async updatemiddleNameButton(oldmiddleName, newmiddleName) {
    await (await browser.$('input')).waitForDisplayed();
    const middleNameInput = !oldmiddleName
      ? await browser.$('input')
      : await WorkerMyAccountPage.getInputWithName(oldmiddleName.middleName);
    const inputLength = (await middleNameInput.getValue()).length;
    await middleNameInput.setValue(new Array(inputLength).fill('Backspace'));
    await middleNameInput.setValue(newmiddleName);
    await browser.keys('\uE007');
    return this;
  }

  async updateProfessionalSummary(updatedSummary: string) {
    await (await WorkerMyAccountPage.professionalSummaryEditButton).waitForExist();
    await (await WorkerMyAccountPage.professionalSummaryEditButton).click();
    await (await WorkerMyAccountPage.professionalSummaryInputTextArea).waitForDisplayed();
    const professionalSummaryInput = await WorkerMyAccountPage.professionalSummaryInputTextArea;
    await professionalSummaryInput.waitForDisplayed();
    await professionalSummaryInput.setValue(updatedSummary);
  }

  async submitProfessionalSummary() {
    await (await WorkerMyAccountPage.professionalSummarySubmitButton).waitForExist();
    await (await WorkerMyAccountPage.professionalSummarySubmitButton).click();
  }

  async submitEducationHistory() {
    await (await WorkerMyAccountPage.educationHistorySubmitButton).waitForExist();
    await (await WorkerMyAccountPage.educationHistorySubmitButton).click();
  }

  async clickSelect() {
    await (await WorkerMyAccountPage.getSelect()).waitForExist();
    await (await WorkerMyAccountPage.getSelect()).click();
    return this;
  }

  async clickCountryCodeSelect() {
    await (await WorkerMyAccountPage.getCountrySelect()).waitForExist();
    await (await WorkerMyAccountPage.getCountrySelect()).click();
    return this;
  }

  async clickOnGenderLabel(gender) {
    const label = await WorkerMyAccountPage.getElementWithTextFromArray(await WorkerMyAccountPage.getLabels(), gender);
    await label.click();
    return this;
  }

  async clickGenderLabel() {
    const gendreLabels = await WorkerMyAccountPage.getLabels();
    const label = await gendreLabels[Math.floor(Math.random() * gendreLabels.length)];
    await label.click();
    return this;
  }

  async clickPreferredNameEditButton() {
    await (await WorkerMyAccountPage.preferredNameEditButton).waitForExist();
    await (await WorkerMyAccountPage.preferredNameEditButton).click();
    return this;
  }

  async clearAndEnterPreferredNameInput(newPreferredNameObject, preferredName) {
    await (await browser.$('input')).waitForDisplayed();
    const preferredNameInput = !newPreferredNameObject
      ? await browser.$('input')
      : await WorkerMyAccountPage.getInputWithName(newPreferredNameObject.fullName);
    const inputLength = (await preferredNameInput.getValue()).length;
    await preferredNameInput.setValue(new Array(inputLength).fill('Backspace'));
    await preferredNameInput.setValue(preferredName);
    await browser.keys('\uE007');
    return this;
  }

  async clickSaveButton() {
    const runInBrowser = function clickIt(argument) {
      argument.click();
    };
    const elementToClickOn = await WorkerMyAccountPage.getSaveButton();
    await browser.execute(runInBrowser, elementToClickOn);
    return this;
  }

  async waitForTime(seconds) {
    await browser.pause(seconds * 1000);
    return this;
  }

  static async getElementWithTextFromArray(elements: ElementArray, labelText: string) {
    const labels = await Promise.all(elements.map(async (elm) => await elm.getText()));
    const labelIndex = labels.findIndex((label) => label === labelText);
    return elements[labelIndex];
  }
}

export const workerMyAccountPage = toSync(new WorkerMyAccountPage());
