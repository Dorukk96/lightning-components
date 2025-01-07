import { MessageContext, publish } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import REAL_TIME_MC from '@salesforce/messageChannel/RealTimeMessageChannel__c';

export default class SendRealTimeDataLMS extends LightningElement {

    enteredText;
    sliderVal;

    @wire(MessageContext)
    ctx;

    textChangeHandler(event) {
        this.enteredText = event.target.value;
    }

    sliderChangeHandler(event) {
        this.sliderVal = event.target.value;
    }


    publishHandler() {
        let msg = {
            realDataPayload: {
                val: this.enteredText
            }
        };

        let sliderMsg = {
            sliderDataPayload: {
                value: this.sliderVal
            }
        };

        publish(
            this.ctx,
            REAL_TIME_MC,
            msg
        );

        
        publish(
            this.ctx,
            REAL_TIME_MC,
            sliderMsg
        );

        

        
    }
}