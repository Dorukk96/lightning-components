import { api, LightningElement, wire } from 'lwc';
import MY_CHANNEL from '@salesforce/messageChannel/MyChannel__c';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import Name from '@salesforce/schema/Car__c.Name';
import PICTURE_FIELD from '@salesforce/schema/Car__c.Picture__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Maker__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';
import DESC_FIELD from '@salesforce/schema/Car__c.Description__c';
import FULE_TYPE_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c';
import PRICE_FIELD from '@salesforce/schema/Car__c.Price__c';
import SEATING_FIELD from '@salesforce/schema/Car__c.Seating_Capacity__c';
import { MessageContext, subscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class CarCard extends LightningElement {
    @api recordId; // = "a062w00000OekOQAAZ";
    objectName = CAR_OBJECT;
    pictureUrl;
    name;

    @wire(MessageContext)
    context;

    fields = {
        carName: Name,
        maker: MAKE_FIELD,
        category: CATEGORY_FIELD,
        price: PRICE_FIELD,
        control: CONTROL_FIELD,
        fuelType: FULE_TYPE_FIELD,
        seating: SEATING_FIELD,
        desc: DESC_FIELD,
        picUrl: PICTURE_FIELD
    }

    

    handleRecordLoaded(event) {
        const recordDetail = event.detail.records;
        console.log('EVENT.DETAIL.RECORDS => ', recordDetail);
        this.pictureUrl = recordDetail[this.recordId].fields.Picture__c.value;
        this.name = recordDetail[this.recordId].fields.Name.value;
    }

    connectedCallback() {
        this.subscribeHandler();
    }

    subscribeHandler() {
        subscribe(
            this.context,
            MY_CHANNEL,
            (message) => { this.handleMessage(message) },
            { scope: APPLICATION_SCOPE }
        );
    }

    handleMessage(message) {
        console.log("Message has been received");
        console.log(JSON.stringify(message));
        this.recordId = message.carId;
    }
}