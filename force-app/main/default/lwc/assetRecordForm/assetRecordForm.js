import { LightningElement } from 'lwc';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AssetRecordForm extends LightningElement {

    objectName = ASSET_OBJECT;
    recordId = 'a00Qy00000IncbFIAR';
    
    handleOnSuccess() {
        // show toast message
        const toastMessage = new ShowToastEvent({
            variant: 'success',
            title: 'Successfully Updated',
            message: 'Asset record is updated successfully. Enjoy.'
        });
        this.dispatchEvent(toastMessage);
    }
}