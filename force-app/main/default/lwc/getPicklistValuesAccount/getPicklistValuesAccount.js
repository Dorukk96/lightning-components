import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetPicklistValuesAccount extends LightningElement {

    industryOptions;
    typeOptions;
    ratingOptions;

    selectedIndustry;
    selectedType;
    selectedRating;
    
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObjectInfo;

    @wire(getPicklistValuesByRecordType, { objectApiName:ACCOUNT_OBJECT, recordTypeId: '$accountObjectInfo.data.defaultRecordTypeId' })
    picklistValues({ data, error }) {
        if (data) {
            console.log('============ all picklists retrieved ============');
            this.industryOptions = data.picklistFieldValues.Industry.values;
            this.typeOptions = data.picklistFieldValues.Type.values;
            this.ratingOptions = data.picklistFieldValues.Rating.values;
        }
        if (error) {
            console.error('ERROR => ', error);
        }
    }

    handleChange(event) {
        // console.log(event.target); // => this is component's details
        // console.log(event.detail); // => this is event's detail

        if (event.target.name === "Industry") {
            this.selectedIndustry = event.detail.value;
        } else if (event.target.name === "Type") {
            this.selectedType = event.detail.value;
        } else if (event.target.name === "Rating") {
            this.selectedRating = event.detail.value;
        }
    }
}