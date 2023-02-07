import { LegalEntityModel } from 'gwg';
import { AddClientDialog } from 'src/tests/pages/SupplierWorkersHub/AddClientDialog';
import { GET_LEGAL_ENTITY_ADMINISTRATED } from '../../api/GET_LEGAL_ENTITY_ADMINISTRATED';
import { CREATE_ENTERPRISE } from '../../api/CREATE_ENTERPRISE';
import { toSync } from '../../../utils/utils/toSync';
import { REMOVE_ENTERPRISE } from '../../api/REMOVE_ENTERPRISE';
import Page from '../Page';
import {logger} from "../../../utils/utils/logger";

class SupplierWorkersHub extends Page {
  addClientDialog = new AddClientDialog();

  get addWorkerButton() {
    return browser.byTest$('add-worker-button');
  }

  get addClientWorkerButton() {
    return browser.byTest$('client-worker-type-button');
  }

  get addGeneralWorkerButton() {
    return browser.byTest$('general-worker-type-button');
  }

  public async open() {
    await Page.open('supplier/workers');
    return this;
  }

  async openClientWorkerDialog() {
    await this.addWorkerButton.waitForExist();
    await this.addWorkerButton.click();
    await this.addClientWorkerButton.waitForExist();
    await this.addClientWorkerButton.click();
    await this.addClientDialog.waitForExist();
    return this;
  }

  async openGeneralWorkerDialog() {
    await this.addWorkerButton.waitForExist();
    await this.addWorkerButton.click();
    await this.addGeneralWorkerButton.waitForExist();
    await this.addGeneralWorkerButton.click();
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

  fetchClients() {
    return this.graphql<{ getLegalEntityAdministrated: LegalEntityModel }>({
      query: GET_LEGAL_ENTITY_ADMINISTRATED.loc.source.body
    });
  }

  async getCreatedEnterprise() {
    const { data, errors } = await this.createEnterprise();
    if (errors) {
      logger.error(errors);
    }

    return data?.createEnterpriseClient;
  }

  async removeCreatedEnterprise(enterpriseUid: string) {
    const { data, errors } = await this.removeEnterprise(enterpriseUid);
    if (errors) {
      logger.error(errors);
    }
    return data?.dev_removeEnterpriseClient;
  }

  async removeAllClients() {
    const clients = await this.fetchClients();
    for (const client of clients.data.getLegalEntityAdministrated.enterpriseClients.legalEntities.filter(
      (e) => e.name !== 'Utmost'
    )) {
      await this.removeCreatedEnterprise(client.uid);
    }
  }
}

export const supplierWorkersHub = toSync(new SupplierWorkersHub());
