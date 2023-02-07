import Page from '../Page';

class ResumeAndDocuments extends Page {
  static get addDocument() {
    return $(`[data-test="button"]`);
  }

  static get addDocumentResume() {
    return $(`[data-test="mediaType-field-control"]`);
  }

  static get confirmCandidateButton() {
    return $('[data-test="confirm-button"]');
  }

  static get addResume() {
    return $(`[data-test="Resume"]`);
  }

  static get addDocumentName() {
    return $(`[data-test="label-field-control"] input`);
  }

  static get addDocumentUpload() {
    return $(`[data-test="document-field-upload"]`);
  }

  static get addDocumentInput() {
    return $(`[data-test="document-field-input"]`);
  }

  static get documentForm() {
    return $(`[data-test="documents_smart_form_dialog"]`);
  }

  static get addSubmitDocument() {
    return $(`[data-test="document_submit-button"]`);
  }
}

export default ResumeAndDocuments;
