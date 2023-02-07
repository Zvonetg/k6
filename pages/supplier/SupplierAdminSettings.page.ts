import Page from '../Page';

class SupplierAdminSettingsPage extends Page {
  static get UsersNavigationTab() {
    return $('a[data-test="admin-user-settings"]');
  }
}

export default SupplierAdminSettingsPage;
