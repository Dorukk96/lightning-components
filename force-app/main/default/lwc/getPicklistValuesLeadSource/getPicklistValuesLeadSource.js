import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import SOURCE_FIELD from '@salesforce/schema/Lead.LeadSource';
import LEAD_OBJECT from '@salesforce/schema/Lead';

export default class GetPicklistValuesLeadSource extends LightningElement {

    selectedLeadSource;
    leadSourceOptions;

    // get lead's default record type dinamically.
    // which method we have to use?
        // getObjectInfo

    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    leadObjectInfo;
    
    // handleLeadObjInfo({ data, error }) {
    //     if(data) {
    //         this.leadDefaultRtId = data.defaultRecordTypeId;
    //     }
    //     if(error) {
    //         console.error('err >> ', error);
    //     }
    // }

    @wire(getPicklistValues, { fieldApiName: SOURCE_FIELD, recordTypeId: '$leadObjectInfo.data.defaultRecordTypeId' })
    handleLeadSourceValues({ data, error }) {
        if (data) {
            this.leadSourceOptions = data.values;
        }
        if (error) {
            console.error('error occured => ', error);
        }
    }

    // change event
    handleLeadSourceChange(event) {
        this.selectedLeadSource = event.detail.value;
    }
}