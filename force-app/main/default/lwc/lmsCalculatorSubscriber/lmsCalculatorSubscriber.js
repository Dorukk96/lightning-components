import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import SMP_MC_2 from '@salesforce/messageChannel/SampleMessageChannel__c';


export default class LmsCalculatorSubscriber extends LightningElement {

    publishedResult;
    sliderResult;
    imgPath;

    @wire(MessageContext)
    context;

    connectedCallback() {
        subscribe(
            this.context,
            SMP_MC_2,
            (message) => { this.msgHandler(message) },
            { scope: APPLICATION_SCOPE }
        );
    }

    connectedCallback() {
        subscribe(
            this.context,
            SMP_MC_2,
            (receivedMsg) => { this.receivedMsgHandler(receivedMsg); },
            { scope: APPLICATION_SCOPE }
        );
    }

    connectedCallback () {
        subscribe(
            this.context,
            SMP_MC_2,
            (receivedImg) => { this.receivedImgHandler(receivedImg); },
            { scope: APPLICATION_SCOPE }
        );
    }

    msgHandler(msg) {
        if (msg) {
            this.publishedResult = msg.addRes.value;
        }
    }

    receivedMsgHandler(msg) {
        if (msg) {
            this.sliderResult = msg.sliderValue.value;
        }
    }

    receivedImgHandler(img) {
        if (img) {
            this.imgPath = img.imgUploader.value;
        }
    }
}