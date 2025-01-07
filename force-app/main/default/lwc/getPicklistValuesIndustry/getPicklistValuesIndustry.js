import { LightningElement, wire } from 'lwc';

import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class GetPicklistValuesIndustry extends LightningElement {

    accRecordTypeId;
    industryOptions;
    selectedIndustry;

    // first get the default record type ID using getObjectInfo
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountRecordHandler({ data, error }) {
        if (data) {
            this.accRecordTypeId = data.defaultRecordTypeId;
        } else if (error) {
            console.error(error);
        }
    }


    // After getting the required recordTypeId from the `getObjectInfo`, then we can get the picklist.
    @wire(getPicklistValues, { recordTypeId: '$accRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    picklistValueHandler({ data, error }) {
        if (data) {
            console.log('========= picklist values retrieved =========');
            console.log(`PICKLIST => `, data);
            // array of object is in data.values
            this.industryOptions = data.values; // we can directly pass this options because this `data.values` is array of object, and that object has value and label fields.
        }
        if (error) {
            console.error(error);
        }
    }

    onIndustryChangeHandler(event) {
        this.selectedIndustry = event.detail.value;
    }
}