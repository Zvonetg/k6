import { GwgEngagementModel } from 'gwg';
import { CREATE_ENGAGEMENT } from 'src/tests/api/CREATE_ENGAGEMENT';
import Page from '../Page';
import {toSync} from "../../../utils/utils/toSync";
import Random from "../../common/Random";

class SupplierWorkforce extends Page {
    get firstNameInput() {
        return $('[data-test="firstname-input"]');
    }

    async clickFirstNameInput() {
        await this.firstNameInput.waitForExist();
        await this.firstNameInput.click();
        await this.firstNameInput.setValue(`${Random.randomString()}`);
        return this;
    }

    open = async () => {
        await Page.open('supplier/workers');
        return this;
    };

    get lastNameInput() {
        return $('[data-test="lastname-input"]');
    }

    async clickLastNameInput() {
        await this.lastNameInput.waitForExist();
        await this.lastNameInput.click();
        await this.lastNameInput.setValue(`${Random.randomString()}`);
        return this;
    }

    get emailInput() {
        return $('[data-test="email-input"]');
    }

    async clickEmailInput() {
        await this.emailInput.waitForExist();
        await this.emailInput.click();
        await this.emailInput.setValue((`${Random.randomString()}@saltees.com`));
        return this;
    }

    get addButton() {
        return $('[data-test="submit-button"]');
    }

    async clickAddButton() {
        await this.addButton.waitForExist();
        await this.addButton.click();
        return this;
    }

    get rowAction() {
        return $('[data-test="data-table-row-actions"]');
    }

    async clickRowAction() {
        await this.rowAction.waitForExist();
        await this.rowAction.click();
        return this;
    }

    get workerToastMessage() {
        return $('[data-test="worker-invited-successfully-toast"]');
    }

    async expectToastMessage() {
        expect (await this.workerToastMessage).toExist();
        return this;
    }

    get checkboxWorkforce() {
        return $('[data-test="header_selection"]');
    }

    async clickCheckboxWorkforce() {
        await this.checkboxWorkforce.waitForExist();
        await this.checkboxWorkforce.click();
        return this;
    }

    get bulkActionTerminateRelationship() {
        return $('[data-test="terminate-relationship"]');
    }


    async clickBulkActionTerminateRelationship() {
        await this.bulkActionTerminateRelationship.waitForExist();
        await this.bulkActionTerminateRelationship.click();
        return this;
    }

    get confirmButton() {
        return $('[data-test="confirm-button"]');
    }

    async clickConfirmButton() {
        await this.confirmButton.waitForExist();
        await this.confirmButton.click();
        return this;
    }

    static get selectJobPosting() {
        return $('[data-test="select-job-posting"]');
    }

    static get selectAddEngagmenet() {
        return $('[data-test="select-add-engagement"]');
    }

    get selectEditWorker() {
        return $('[data-test="select-edit-worker"]');
    }

    async clickSelectEditWorker() {
        await this.selectEditWorker.waitForExist();
        await this.selectEditWorker.click();
        return this;
    }

    static get selectEditEngagement() {
        return $('[data-test="select-edit-engagement"]');
    }

    static get selectOffboardWorker() {
        return $('[data-test="select-offboard-worker"]');
    }

    static get selectTerminateRelationship() {
        return $('[data-test="select-terminate-relationship"]');
    }

    static get bulkActionAddJobPosting() {
        return $('[data-test="add-job-posting"]');
    }

    static get bulkActionAddEngagement() {
        return $('[data-test="add-engagement"]');
    }

    static get importButton() {
        return $('[data-test="iconButton-import_workers"]');
    }

    get exportButton() {
        return $('[data-test="iconButton-export-button"]');
    }

    async clickExportButton() {
        await this.exportButton.waitForExist();
        await this.exportButton.click();
        return this;
    }


    static get expectForm() {
        return $('[data-test="modal__content"]');
    }

    get exportEngagement() {
        return $('[data-test="option-export_engagements"]');
    }

    async clickExportEngagement() {
        await this.exportEngagement.waitForExist();
        await this.exportEngagement.click();
        return this;
    }

    async clickSelectClientExport() {
        await this.selectClientExport.waitForExist();
        await this.selectClientExport.click();
        await this.selectExportClient.waitForExist();
        await this.selectExportClient.click();
        await this.selectExportType.waitForExist();
        await this.selectExportType.click();
        await this.selectFormatToExport.waitForExist();
        await this.selectFormatToExport.click();
        return this;
    }

    get selectClientExport() {
        return $('[data-test="select-enterprise-client-field"]');
    }

    get selectExportType() {
        return $('[data-test="select-export-file-format-field"]');
    }

    static get selectImportClient() {
        return $('[data-test="select-field"]');
    }

    get selectExportClient() {
        return $('div[data-test="select-enterprise-client-list-item"]');
    }

    get selectFormatToExport() {
        return $('[data-test="select-export-file-format-list-item"]');
    }

    get buttonExport() {
        return $('[data-test="button-export"]');
    }

    async clickButtonExport() {
        await this.buttonExport.waitForExist();
        await this.buttonExport.click();
        expect (await this.successfullyExportToastMessage).toExist();
        return this;
    }

    static getClient(clientName: string) {
        return $(`[data-test="${clientName}"]`);
    }

    get successfullyExportToastMessage() {
        return $('[data-test="successfully-exported-engagements"]');
    }

    get addWorkerButton() {
        return browser.byTest$('add-worker-button');
    }

    get addGeneralWorkerButton() {
        return browser.byTest$('general-worker-type-button');
    }

    async openGeneralWorkerDialog() {
        await this.addWorkerButton.waitForExist();
        await this.addWorkerButton.click();
        await this.addGeneralWorkerButton.waitForExist();
        await this.addGeneralWorkerButton.click();
        return this;
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

export const supplierWorkforce = toSync(new SupplierWorkforce());
