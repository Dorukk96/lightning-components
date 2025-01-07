import { MessageContext, publish } from 'lightning/messageService';
import FORM_MESSAGE_CHANNEL from '@salesforce/messageChannel/FormMessageChannel__c';
import { LightningElement, wire } from 'lwc';

export default class LmsSampleDataTransferPublisher extends LightningElement {

    selectedOption;
    progressOptions = [
        { label: 'In Progress', value: 'inProgress' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
    ];
    preparedData = {};

    @wire(MessageContext)
    ctx;


    changeHandler(event) {
        let targetName = event.target.name;
        let targetValue = event.target.value;
        if (targetName === 'first-name') {
            this.preparedData.fname = targetValue;
        } else if (targetName === 'last-name') {
            this.preparedData.lname = targetValue;
        } else if (targetName === 'email-name') {
            this.preparedData.email = targetValue;
        } else if (targetName === 'progress') {
            this.preparedData.progress = targetValue;
        }
    }

    publishDataHandler() {    
        // prepare data
        let prepMsg = {
            formData: {
                value: this.preparedData
            }
        };

        publish(
            this.ctx,
            FORM_MESSAGE_CHANNEL,
            prepMsg
        );
    }
}