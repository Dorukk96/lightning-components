import { LightningElement, wire } from 'lwc';
import SAMPLE_MC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class LmsWebComponentA extends LightningElement {
    messageValue;

    @wire(MessageContext)
    context;

    changeHandler(event) {
        this.messageValue = event.target.value;
    }

    publishHandler() {
        let message = {
            lmsData: {
                value: this.messageValue
            }
        }
        console.log('We are about to publish a message');
        console.log('The message : ', message);
        publish(this.context, SAMPLE_MC, message);
    }
}