import { LightningElement, wire } from 'lwc';
import getProperties from '@salesforce/apex/PropertyController.getProperties';
import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import REAL_ESTATE_MC from '@salesforce/messageChannel/RealTimeMessageChannel__c';

export default class PropertyTileList extends LightningElement {


    fetchedProperties;
    dbProperties;
    searchKey;
    price;
    bedrooms;
    bathrooms;

    error;

    @wire(MessageContext)
    context;

    connectedCallback() {
        subscribe(
            this.context,
            REAL_ESTATE_MC,
            (msg) => { this.messageHandler(msg) },
            { scope: APPLICATION_SCOPE }
        )
    }

    messageHandler(message) {
        if (message) {
            this.fetchedProperties = message.realEstateLMS.value;
            this.searchKey = message.realEstateLMS.value.enteredTerm;
            this.price = message.realEstateLMS.value.price;
            this.bedrooms = message.realEstateLMS.value.bedroom;
            this.bathrooms = message.realEstateLMS.value.bathroom;

            getProperties(this.searchKey, this.price, this.bedrooms, this.bathrooms)
                .then((res) => {
                    this.dbProperties = res;
                })
                .catch((err) => { console.error('Err => ', err); })
        }
    }
}