import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import FORM_MESSAGE_CHANNEL from '@salesforce/messageChannel/FormMessageChannel__c';

export default class LmsSampleDataTransferSubscriber extends LightningElement {

    receivedData;
    first_name;
    last_name;
    email_address;
    progress_level;

    @wire(MessageContext)
    ctx;

    connectedCallback() {
        subscribe(
            this.ctx,
            FORM_MESSAGE_CHANNEL,
            (msg) => { this.messageHandler(msg); },
            { scope: APPLICATION_SCOPE }
        );
    }

    messageHandler(message) {
        if (message) {
            this.receivedData = message.formData.value;

            this.first_name = this.receivedData.fname;
            this.last_name = this.receivedData.lname;
            this.email_address = this.receivedData.email;
            this.progress_level = this.receivedData.progress;
        }
    }

}