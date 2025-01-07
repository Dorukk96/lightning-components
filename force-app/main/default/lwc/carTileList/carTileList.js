import getCars from '@salesforce/apex/CarCtrl.getCars';
import { LightningElement, wire } from 'lwc';
import MY_CHANNEL from '@salesforce/messageChannel/MyChannel__c';
import { APPLICATION_SCOPE, MessageContext, publish, subscribe } from 'lightning/messageService';

export default class CarTileList extends LightningElement {

    carType = "All";
    cars;

    @wire(MessageContext)
    context;

    @wire(getCars, {type: '$carType'})
    fetchedCars ({ data, error }) {
        if (data) {
            this.cars = data;
            console.log('CARS ====> ', this.cars);
        } 
        if (error) {
            console.error('ERROR ===> ', error);
        }
    }

    connectedCallback() {
        this.subscribeHandler();
    }

    subscribeHandler() {
        subscribe(
            this.context,
            MY_CHANNEL,
            (message) => { this.handleMessage(message) },
            { scope: APPLICATION_SCOPE}
        );
    }

    handleMessage(message) {
        console.log("Message has been received");
        console.log(JSON.stringify(message));
        this.carType = message.lmsData;
    }

    handleCarSelect(event) {
        console.log("received selected car: ", event.detail);
        const message = {
            carId: event.detail
        };
        publish(this.context, MY_CHANNEL, message);
    }
}