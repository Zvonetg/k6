import AuthPage from '../../pages/Auth.page';
import { WorkerCategoryTypes, workerMyAccountPage } from '../../pages/worker/WorkerMyAccount.page';
import Random from '../../common/Random';

describe('Worker User Profile Contact Information', () => {
    let number;
    let label;

    before('Login as worker', async () => {
        await AuthPage.loginAsWorker();
        number = '4455667788';
        label = Random.randomString();
    });

    beforeEach(async () => {
        await workerMyAccountPage.open().navigateToContactInformation();
    });

    it('should add a phone number', async () => {
        await workerMyAccountPage
            .clickAddContact()
            .clickFormContact()
            .selectCategoryType(WorkerCategoryTypes.PHONE)
            .clickFormPhone()
            .addPhoneNumber(number)
            .addLabelOption(label)
            .clickAddSave()
            .editPhone()
            .clickAddSave();
    });

    it('should edit Phone Number', async () => {
        await workerMyAccountPage
            .phoneRow()
            .editPhone()
            .clickLabel()
            .clickAddSave();
    });

    it('should delete Phone Number', async () => {
        await workerMyAccountPage
            .phoneRow()
            .deletePhone();
    });
});
