import AuthPage from '../../pages/Auth.page';
import { workerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';

describe('Worker User Profile Emergency Contact', () => {
  let email;
  let phone;

  before('Login as worker', async () => {
    await AuthPage.loginAsWorker();
    email = 'test@utmost.co';
    phone = '4455667788';
  });

  beforeEach(async () => {
    await workerMyAccountPage.open().navigateToEmergencyContact();
  });

  it('should add a emergency contact', async () => {
    await workerMyAccountPage.
    clickAddEmergencyContact()
    .clickNameField()
    .clickAndAddNameInput()
    .clickRelationship()
    .selectRelationshipOption('SPOUSE')
    .clickAndAddEmail(email)
    .clickFormPhoneEmergency(phone)
    .clickEmergencySaveButton();

  });

  it('should edit a emergency contact', async () => {
    await workerMyAccountPage
      .clickEmergencyAdressRow()
      .clickEditAddressEmergency()
      .clickRelationship()
      .selectRelationshipOption('PARTNER')
      .clickEmergencySaveButton();
  });

  it('should delete a emergency contact', async () => {
    await workerMyAccountPage
    .clickEmergencyAdressRow()
    .deleteAddressEmergency()
    .deleteToastMessage();
  });
});
