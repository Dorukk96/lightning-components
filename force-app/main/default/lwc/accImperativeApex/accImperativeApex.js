import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import getAccountsByIndustry from '@salesforce/apex/AccountController.getAccountsByIndustry';

export default class AccImperativeApex extends LightningElement {

    // write code to get industry picklist options
    industryOptions;
    accounts;
    error;
    showDatatable = false;

    accColumn = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
        { label: 'Type', fieldName: 'Type' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Website', fieldName: 'Website', type: 'url' }
    ];

    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    accountInfo;

    @wire(getPicklistValues, { fieldApiName: INDUSTRY_FIELD, recordTypeId: '$accountInfo.data.defaultRecordTypeId' })
    industryInfo({ data, error }) {
        if (data) {
            this.industryOptions = data.values;
        } else if (error) {
            console.error(error);
        }
    }

    handleIndustryChange(event) {
        this.accounts = undefined;
        // get account record on industry change
        const selectedIndustry = event.target.value;
        
        getAccountsByIndustry({ industry: selectedIndustry })
        .then(result => {
            this.accounts = result;
            // if accounts has more than 0 data then show datatable 
            if (this.accounts.length > 0) {
                this.showDatatable = true;
            } else {
                this.showDatatable = false;
            }
        })
        .catch(error => {
            this.error = error; // assign error to the `error` property if any error occurs
        });
    }
}