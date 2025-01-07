import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';


export default class AccountRecordViewForm extends LightningElement {

    objectName = ACCOUNT_OBJECT;
    recordId = '001Qy00000SDENOIA5';

    fields = {
        name: NAME_FIELD,
        industry: INDUSTRY_FIELD,
        annualRevenue: REVENUE_FIELD,
        type: TYPE_FIELD,
        website: WEBSITE_FIELD,
        phone: PHONE_FIELD
    };
}