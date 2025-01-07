import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'; // import account sObject to show dependencies
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountRecordForm extends LightningElement {

    objectName = ACCOUNT_OBJECT;
    recordId = '001Qy00000SDENOIA5';
    // if we keep recordId = '' like this as an empty string. This makes the form entirely empty.
    // It is just like a 'create new record' form.
    
    fields = [NAME_FIELD, INDUSTRY_FIELD, ANNUAL_REVENUE_FIELD, TYPE_FIELD, WEBSITE_FIELD, PHONE_FIELD];

    // display toast message when we update the form successfully
    handleOnSuccess() {
        const toastMessage = new ShowToastEvent({
            variant: 'success',
            title: 'Successsss',
            message: 'Successfully updated account record'
        });
        this.dispatchEvent(toastMessage);
    }
}