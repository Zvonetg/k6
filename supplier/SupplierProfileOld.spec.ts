import { supplierProfile } from '../../pages/supplier/SupplierProfileOld.page';
import SupplierHomePage from '../../pages/SupplierHome.page';

describe('GWG - Supplier Profile', () => {

    before('Supplier login', async () => {
        await SupplierHomePage.loginAsSupplier();
    });

    it('should successfully navigate through General tab', async () => {
        await supplierProfile
        .openGeneral()
        .clickSummaryName()
        .clickWebsiteName()
        .clickDescription()
        .clickEmail()
        .clickPhone();
    });

    it('should successfully navigate through Legal tab', async () => {
        await supplierProfile
        .openLegal()
        .clickBusinessLicence()
        .clickDbaNumber()
        .clickInsuranceNumber()
        .clickEinNumber()
        .clickOtherTaxId()
        .clickIncorpotationType();
    });
});
