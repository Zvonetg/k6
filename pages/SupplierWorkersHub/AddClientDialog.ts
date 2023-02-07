import { Select } from '../../common/SmartFormElements/Select';

export class AddClientDialog {
  private clientSelectComponent = new Select('enterpriseExternalSmartFormParams.clientUid-field');

  private workerFormComponent = new Select('enterpriseExternalSmartFormParams.actionUid-field');

  private get smartFormDialog() {
    return browser.byTest$('smart-form-dialog');
  }

  get submitButton() {
    return browser.byTest$('add-client-worker-submission-element-button');
  }

  private get dialogContent() {
    return browser.byTest$('add-client-worker-dialog');
  }

  async waitForExist() {
    await this.dialogContent.waitForExist();
    return this;
  }

  async selectClient(client: string) {
    await this.clientSelectComponent.selectMenuItem(client);
    return this;
  }

  async selectWorkerForm(workerForm: string) {
    await this.workerFormComponent.selectMenuItem(workerForm);
    return this;
  }

  async expectWorkerForms(workerForms: string[], closeAfter = true) {
    await this.workerFormComponent.expectMenuItems(workerForms, closeAfter);
    return this;
  }

  async expectWorkerFormSelected(workerForms: string[]) {
    if (workerForms.length === 0) {
      throw new Error('No worker forms were passed');
    }
    await this.workerFormComponent.expectMenuItemSelected(workerForms as [string]);
    return this;
  }

  async expectWorkerFormToBeDisabled() {
    await this.workerFormComponent.expectToBeDisabled();
    return this;
  }

  async expectSubmitButtonToBeDisabled() {
    await browser.waitUntil(async () => (await this.submitButton.isEnabled()) === false);
    return this;
  }

  async expectSubmitButtonToBeEnabled() {
    await browser.waitUntil(async () => (await this.submitButton.isEnabled()) === true);
    return this;
  }

  async submit() {
    await this.expectSubmitButtonToBeEnabled();
    await this.submitButton.click();
    return this;
  }
}
