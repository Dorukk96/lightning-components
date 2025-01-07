import { LightningElement, track, wire } from 'lwc';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class UpdateRecordProduct extends LightningElement {
    // how to get fieldApiName --> We import. ✅
    // how to get recordTypeId --> 
    myTypeOptions;
    myProductId = "a01Qy00000SzPuDIAV";
    myProd;

    @track formData = {};
    
    // getting object info to get defaultRecordTypeId
    @wire(getObjectInfo, { objectApiName: PRODUCT_OBJECT })
    productObjHandler;

    // get picklist info
    @wire(getPicklistValues, { fieldApiName: TYPE_FIELD, recordTypeId: '$productObjHandler.data.defaultRecordTypeId' })
    typePicklistHandler({ data, error }) {
        if (data) {
            this.myTypeOptions = data.values;
        } else if (error) {
            console.error(error);
        }
    }


    handleChange(event) {
        const name = event.target.name; // Brand__c
        const value = event.target.value; // event.detail.value;

        this.formData[name] = value;
        console.log(JSON.stringify(this.formData));
    }

    // how to get data for one of the existing product record?
    @wire(getRecord, { recordId: '$myProductId', layoutTypes: ["Full"], modes: ["View"] })
    productRecord({ data, error }) {
        if (data) {
            console.log(data);
            this.myProd = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleSaveClick() {
        const name = 'Id';
        const value = this.myProductId;
        this.formData[name] = value; // create one new field for Id and its value

        const recordInput = {
            "fields": this.formData
        };

        // can we do wire service call here?
            // why? wire is used to retrieve data only. No Create/Update/Delete
        updateRecord(recordInput)
        .then(result => {
            // show toast
            this.showToast('Updated Product', 'success', 'update product successfully.');

        })
        .catch(error => {
            // show toast
            this.showToast('ERROR', 'error', 'error error error');
        });
    }

    showToast(title, variant, message) {
        const toast = new ShowToastEvent({
            title: title,
            variant: variant,
            message: message
        });
        this.dispatchEvent(toast);
    }
    
}