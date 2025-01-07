import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import REAL_TIME_MC from '@salesforce/messageChannel/RealTimeMessageChannel__c';


export default class RetrieveRealTimeDataLMS extends LightningElement {

    realTimeData;
    realTimeSliderData;


    @wire(MessageContext)
    context;

    connectedCallback() {
        subscribe(
            this.context,
            REAL_TIME_MC,
            (msg) => { this.messageHandler(msg); },
            { scope: APPLICATION_SCOPE }
        );

        subscribe(
            this.context,
            REAL_TIME_MC,
            (sliderMsg) => { this.messageSliderHandler(sliderMsg); },
            { scope: APPLICATION_SCOPE }
        );
    }

    messageHandler(message) {
        if (message) {
            this.realTimeData = message.realDataPayload.val;
        }
    }

    messageSliderHandler(msg) {
        if (msg) {
            this.realTimeSliderData = msg.sliderDataPayload.value;
        }
    }

}