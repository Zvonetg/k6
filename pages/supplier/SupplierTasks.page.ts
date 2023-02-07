import { GwgTaskModel } from 'gwg';
import { CREATE_SUPPLIER_TASK } from '../../api/CREATE_SUPPLIER_TASK';
import Page from '../Page';

class SupplierTasksPage extends Page {
  static get tasksPageButton() {
    return $('.desktop button[data-test="task-icon"]');
  }

  static get task() {
    return $('div[data-test="task"]');
  }

  static get taskOpenSmartFormButton() {
    return $('button[data-test="open-smart-form-button"]');
  }

  static get taskSuccessToast() {
    return $('div[data-test="task-submitted-successfully"]');
  }

  async createSupplierTask() {
    return this.graphql<{ dev_createSupplierTask: GwgTaskModel }>({
      query: CREATE_SUPPLIER_TASK.loc.source.body
    });
  }
}

export default SupplierTasksPage;
