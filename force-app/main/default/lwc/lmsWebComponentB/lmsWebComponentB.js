import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import SAMPLE_MC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LmsWebComponentB extends LightningElement {
    receivedMessage;

    @wire(MessageContext)
    context;

    connectedCallback() {
        this.subscribeHandler();
    }

    subscribeHandler() {
        subscribe(
            this.context, 
            SAMPLE_MC,
            (msg) => { this.messageHandler(msg); },
            { scope: APPLICATION_SCOPE }
        );
    }

    messageHandler(message) {
        console.log('msg => ', message);
        if (message) {
            this.receivedMessage = message.lmsData.value;
        }
    }


}