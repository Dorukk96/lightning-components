import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { createRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordAccount extends LightningElement {


    myIndustryOptions;
    myTypeOptions;
    @track myFormData = {};

    // getObjectInfo is used to get detailed information of an object. (fields, default record type, recordTypeInfos, keyprefix, plurallabel)
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    myAccountInfo; // is this correct? Yes. the wire services returned value will be assigned to myAccountInfo

    // getPicklistValue --> to get picklist values for 1 field 
    // getPicklistValuesByRecordType --> to get all picklist of a record type (for more than 1 we use this)
    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '$myAccountInfo.data.defaultRecordTypeId' })
    myPicklistValues({ data, error }) {
        if (data) {
            this.myTypeOptions = data.picklistFieldValues.Type.values;
            this.myIndustryOptions = data.picklistFieldValues.Industry.values;
        } else if (error) {
            console.error(error);
        }
    }

    handleOnChange(event) {
        const name = event.target.name;
        const value = event.target.value; // event.detail.value;
        // console.log("Name ==> " + name + ", value ==> " + value);
       
        this.myFormData[name] = value;
        console.log(JSON.stringify(this.myFormData));
        // {
        //     "Name": "Bounteous",
        //     "Type": "Installation Partner",
        //     "Website": "https://www.bounteous.com/",
        //     "AnnualRevenue": "450000000",
        //     "Industry": "Chemicals"
        // }
    }

    handleSaveClick() {
        const recordInput = {
            "apiName": "Account",
            "fields": this.myFormData
        };
        console.log('LOG 1: Before calling create Record');

        // create the record with the supplied values from the `myFormData`
        // how to do imperative call (call backend async and return success/failure).
        createRecord(recordInput)
        .then(result => {
            // handle success
            console.log('LOG 2: then method called. returns success');
            console.log("DONE. CREATED RECORD.");
            console.log(result);
            this.showToast("Created record", "success", "Successfully created account record");
        })
        .catch(error => {
            // handle error
            console.log("ERROROROR.");
            console.error(error);
            this.showToast("Error", "error", "Failed to create record");
        });
        console.log('LOG 3: Done Deal.');

    }

    handleCancelClick() {
        this.template.querySelector("form.accountForm").reset();
        this.template.querySelector('[data-id="AccountType"]').value = '';
        this.template.querySelector('[data-id="AccountIndustry"]').value = '';
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