import { EngagementStatusModel, GwgEngagementModel } from 'gwg';
import SupplierHomePage from 'src/tests/pages/supplier/SupplierHome.page';
import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import { logger } from '../../../utils/utils/logger';
import AuthPage from '../../pages/Auth.page';
import {supplierWorkforce} from "../../pages/supplier/SupplierWorkforce.page";

const workforcePageInstance = new SupplierHomePage();

const getEnterpriseUid = async () => {
    const { data, errors } = await workforcePageInstance.createEnterprise();
    logger.error(errors);
    return data?.createEnterpriseClient?.uid;
};

const generateEngagement = async (workerUid: string, jobProfile: string, engagementStatus: EngagementStatusModel) => {
    const engagementToCreate: Partial<GwgEngagementModel> = { jobProfile, status: engagementStatus };
    const { data, errors } = await workforcePageInstance.createEngagement(workerUid, engagementToCreate);
    logger.error(errors);
    return data?.createEngagement;
};

describe('GWG - Check for add worker', () => {
    const jobProfile = 'Random Job Profile';
    let engagementStatus: EngagementStatusModel;
   

    before('Login as supplier', async () => {
        await AuthPage.loginAsSupplier();
        await workforcePageInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.supplierWorkerEngagementExport);
    });

    beforeEach(async () => {
        await supplierWorkforce.open();
    });

    it('should successfully create worker', async () => {
        await supplierWorkforce
            .openGeneralWorkerDialog()
            .clickFirstNameInput()
            .clickLastNameInput()
            .clickEmailInput()
            .clickAddButton()
            .expectToastMessage();
    });

    it('should successfully edit worker', async () => {
        await supplierWorkforce
            .clickCheckboxWorkforce()
            .clickRowAction()
            .clickSelectEditWorker()
            .clickFirstNameInput()
            .clickAddButton();
    });

    it('should successfully check export', async () => {
        const enterpriseUid = await getEnterpriseUid();
        const activeEngagementPromises = [];
        engagementStatus = 'PRE_HIRE';
        activeEngagementPromises.push(generateEngagement(enterpriseUid, `${jobProfile}`, engagementStatus));
        await supplierWorkforce
            .clickExportButton()
            .clickExportEngagement()
            .clickSelectClientExport()
            .clickButtonExport();
    });

    it('should successfully terminate relationship with bulk action', async () => {
        await supplierWorkforce
            .clickCheckboxWorkforce()
            .clickBulkActionTerminateRelationship()
            .clickConfirmButton();
    });
});
