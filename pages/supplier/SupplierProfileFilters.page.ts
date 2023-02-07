import Page from '../Page';
import {toSync} from "../../../utils/utils/toSync";

class SupplierProfileFilters extends Page {
    get cancelGeo() {
        return $('[data-test="button-company-filters-cancel-changes-geo-location"]');
    }

    async clickCancelGeographiesServed() {
        await this.cancelGeo.waitForExist();
        await this.cancelGeo.click();
        return this;
    }

    get geographiesServed() {
        return $('[data-test="iconButton-company-filters-edit-geo-location"]');
    }

    async clickGeographiesServed() {
        await this.geographiesServed.waitForExist();
        await this.geographiesServed.click();
        return this;
    }

    get industriesServed() {
        return $('[data-test="company-filters-industries-served-edit-icon-button"]');
    }

    async clickIndustriesServed() {
        await this.industriesServed.waitForExist();
        await this.industriesServed.click();
        return this;
    }

    get cancelIndustries() {
        return $('[data-test="cancel-changes-filters-industries-served"]');
    }

    async clickCancelIndustries() {
        await this.cancelIndustries.waitForExist();
        await this.cancelIndustries.click();
        return this;
    }

    get jobCategories() {
        return $('[data-test="company-filters-job-categories-edit-icon-button"]');
    }

    async clickJobCategories() {
        await this.jobCategories.waitForExist();
        await this.jobCategories.click();
        return this;
    }

    get cancelJobCategories() {
        return $('[data-test="cancel-changes-filters-job-categories"]');
    }

    async clickCancelJobCategories() {
        await this.cancelJobCategories.waitForExist();
        await this.cancelJobCategories.click();
        return this;
    }

    get diversityCertificate() {
        return $('[data-test="company-filters-diversity-certificate-types-edit-icon-button"]');
    }

    async clickDiversityCertificate() {
        await this.diversityCertificate.waitForExist();
        await this.diversityCertificate.click();
        return this;
    }

    get programSupport() {
        return $('[data-test="company-filters-program-support-edit-icon-button"]');
    }

    async clickProgramSupport() {
        await this.programSupport.waitForExist();
        await this.programSupport.click();
        return this;
    }

    get cancelProgramSupport() {
        return $('[data-test="cancel-changes-filters-program-support"]');
    }

    async clickCancelProgramSupport() {
        await this.cancelProgramSupport.waitForExist();
        await this.cancelProgramSupport.click();
        return this;
    }

    get deiSupport() {
        return $('[data-test="company-filters-dei-support-categories-edit-icon-button"]');
    }

    static get deiSupport() {
        return $('[data-test="company-filters-dei-support-categories-edit-icon-button"]');
    }

    async clickDeiSupport() {
        const element = await SupplierProfileFilters.deiSupport;
        await element.scrollIntoView();
        await this.deiSupport.waitForExist();
        await this.deiSupport.click();
        return this;
    }

    get cancelDeiSupport() {
        return $('[data-test="cancel-changes-filters-dei-support-categories"]');
    }

    async clickCancelDeiSupport() {
        await this.cancelDeiSupport.waitForExist();
        await this.cancelDeiSupport.click();
        return this;
    }

    get filtersKeyword() {
        return $('[data-test="company-filters-keywords-edit-icon-button"]');
    }

    static get filtersKeyword() {
        return $('[data-test="company-filters-keywords-edit-icon-button"]');
    }

    async clickFiltersKeyword() {
        const element = await SupplierProfileFilters.filtersKeyword;
        await element.scrollIntoView();
        await this.filtersKeyword.waitForExist();
        await this.filtersKeyword.click();
        return this;
    }

    get cancelKeywords() {
        return $('[data-test="cancel-changes-filters-keywords"]');
    }

    async clickCancelKeywords() {
        await this.cancelKeywords.waitForExist();
        await this.cancelKeywords.click();
        return this;
    }

    get cancelDiversityCertificate() {
        return $('[data-test="cancel-changes-filters-diversity-certificate-types"]');
    }

    async clickCancelDiversityCertificate() {
        await this.cancelDiversityCertificate.waitForExist();
        await this.cancelDiversityCertificate.click();
        return this;
    }

    open = async () => {
        await Page.open('supplier/profile');
        return this;
    };

}

export const supplierFilters = toSync(new SupplierProfileFilters());
