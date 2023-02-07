import { LaunchDarklyFeatureFlagKeys } from 'src/integrations/LaunchDarklyMockClient';
import { supplierFilters } from 'src/tests/pages/supplier/SupplierProfileFilters.page';
import SupplierHomePage from '../../pages/SupplierHome.page';


describe('GWG - Supplier Profile Filter', () => {
    before('Supplier login', async () => {
        await SupplierHomePage.loginAsSupplier();
        const supplierHomeInstance = new SupplierHomePage();
        await supplierHomeInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.supplierProfileSettings);
        await supplierHomeInstance.initLaunchDarkly(LaunchDarklyFeatureFlagKeys.supplierProfilePage);
    });

    beforeEach(async () => {
        await supplierFilters.open();
    });

    it('should successfully open and cancel geo location filter', async () => {
        await supplierFilters
            .clickGeographiesServed()
            .clickCancelGeographiesServed();
    });

    it('should successfully open and cancel industries filter', async () => {
        await supplierFilters
            .clickIndustriesServed()
            .clickCancelIndustries();
    });

    it('should successfully open and cancel job category filter', async () => {
        await supplierFilters
            .clickJobCategories()
            .clickCancelJobCategories();
    });

    it('should successfully open and cancel diversity certificate filter', async () => {
        await supplierFilters
            .clickDiversityCertificate()
            .clickCancelDiversityCertificate();
    });

    it('should successfully open and cancel program support filter', async () => {
        await supplierFilters
            .clickProgramSupport()
            .clickCancelProgramSupport();
    });

    it('should successfully open and cancel Dei support filter', async () => {
        await supplierFilters
            .clickDeiSupport()
            .clickCancelDeiSupport();
    });

    it('should successfully open and cancel keywords filter', async () => {

        await supplierFilters
            .clickFiltersKeyword()
            .clickCancelKeywords();
    });
});
