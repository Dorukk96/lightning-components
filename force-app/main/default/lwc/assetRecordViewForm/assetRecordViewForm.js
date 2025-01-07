import { LightningElement } from 'lwc';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';

// field importation
import NAME_FIELD from '@salesforce/schema/Asset__c.Name';
import PRICE_FIELD from '@salesforce/schema/Asset__c.Price__c';
import AVAILABLE_FIELD from '@salesforce/schema/Asset__c.Available__c';
import ACCOUNT_FIELD from '@salesforce/schema/Asset__c.Account__c';

export default class AssetRecordViewForm extends LightningElement {

    objectName = ASSET_OBJECT;
    recordId = 'a00Qy00000IncbFIAR';

    fields = {
        name: NAME_FIELD,
        price: PRICE_FIELD,
        account: ACCOUNT_FIELD,
        available: AVAILABLE_FIELD
    };
}