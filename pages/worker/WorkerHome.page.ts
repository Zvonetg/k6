import Page from '../Page';

class WorkerHomePage extends Page {
  public static async open() {
    await Page.open('worker/');
  }

  public static async openPath(path: string) {
    await Page.open(`worker/${path}`);
  }

  static get viewAllEngagementsLink() {
    return $(`a[data-test="engagements-link"]`);
  }

  static get timesheetsNavigationLink() {
    return $('span[title="Timesheets"]');
  }

  static get engagementsNavigationLink() {
    return $('span[title="Engagements"]');
  }

  static get myAccountLink() {
    return $('span[title="My Account"] a');
  }

  static get openMenuButton() {
    return $('[data-test="button"]');
  }

  static get viewTimesheetButton() {
    return $('button[data-test="view-timesheet-button"]');
  }

}

export default WorkerHomePage;
