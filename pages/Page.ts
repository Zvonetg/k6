import { LegalEntityModel } from 'gwg';
import { MockFilterOptions, MockOverwrite } from 'webdriverio/build/utils/interception/types';
import { LaunchDarklyFeatureFlagKeys, launchDarklyMockClient } from 'src/integrations/LaunchDarklyMockClient';
import { CREATE_ENTERPRISE } from '../api/CREATE_ENTERPRISE';
import Auth from '../common/Auth';
import { graphql } from '../api/graphql';
import { logger } from '../../utils/utils/logger';

export default class Page extends Auth {
  static async open(path: string = '') {
    let baseUrl = process.env.WEBAPP_URL;
    let basePath = path;
    if (basePath.indexOf('supplier/') !== -1) {
      baseUrl = process.env.SUPPLIER_WEBAPP_URL;
      basePath = basePath.replace('supplier/', '');
    } else if (basePath.indexOf('worker/') !== -1) {
      baseUrl = process.env.WORKER_WEBAPP_URL;
      basePath = basePath.replace('worker/', '');
    }
    const url = `${baseUrl}/${basePath}`;
    await browser.url(url);
    logger.log(`Now test at: ${await browser.getUrl()}`);
  }

  async open(path: string = '') {
    await Page.open(path);
    return this;
  }

  graphql = graphql;

  static get utmostLogo() {
    return $('[alt="utmost logo"]');
  }

  static get mobileUtmostLogo() {
    return $('div[class="logo"]');
  }

  static get title() {
    return browser.getTitle();
  }

  static async waitForPageToLoad() {
    await browser.waitUntil(async () => browser.execute(() => document.readyState === 'complete'), {
      timeout: 5000,
      timeoutMsg: 'Page not loaded after 5s'
    });
  }

  expectUrlContaining(url: string) {
    expect(browser).toHaveUrlContaining(url);
  }

  async mockGqlRequest(postData: MockFilterOptions['postData'], respond: MockOverwrite) {
    return this.mockRequest(
      '**/gwp/graphql',
      {
        headers: { 'content-type': 'application/json' },
        postData
      },
      respond
    );
  }

  async mockRequest(url: string | RegExp, options: MockFilterOptions, respond: MockOverwrite) {
    const mock = await browser.mock(url, options);
    mock.respond(respond);
    return mock;
  }

  static get notificationBell() {
    return $('.desktop [data-test="notification-bell"]');
  }

  static async getNotificationItems() {
    await (await $('[data-test="notification-list"] [data-test="menu-list-item"]')).waitForExist();
    return $$('[data-test="notification-list"] [data-test="menu-list-item"]');
  }

  async createEnterprise() {
    return this.graphql<{ createEnterpriseClient: LegalEntityModel }>({
      query: CREATE_ENTERPRISE.loc.source.body
    });
  }

  // use it before page open
  async initLaunchDarkly(...flags: LaunchDarklyFeatureFlagKeys[]) {
    await launchDarklyMockClient.init(flags);
  }
}
