import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MY_CHANNEL from '@salesforce/messageChannel/MyChannel__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class CarFilter extends LightningElement {

    categoryOptions;
    selectedCategory = "All";

    @wire(MessageContext)
    context;

    @wire(getObjectInfo, {objectApiName: CAR_OBJECT})
    carInfo;

    @wire(getPicklistValues, {fieldApiName: CATEGORY_FIELD, recordTypeId: '$carInfo.data.defaultRecordTypeId'})
    picklistHandler({data, error}) {
        if(data) {
            this.categoryOptions = this.picklistGenerator(data);
            this.categoryOptions.push({label: "All", value: "All"});
        }
        if(error) {
            console.error(error);
        }
    }

    picklistGenerator(data) {
        return data.values.map(item => ({
            label: item.label,
            value: item.value
        }));
    }

    changeHandler(event) {
        this.selectedCategory = event.target.value;
        const message = {
            lmsData: this.selectedCategory
        };
        console.log("About to publish the message");
        console.log(message);
        publish(this.context, MY_CHANNEL, message);
    }
}