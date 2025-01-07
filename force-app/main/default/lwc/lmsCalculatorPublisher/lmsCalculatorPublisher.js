import { LightningElement, wire } from 'lwc';
import SMP_MC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class LmsCalculatorPublisher extends LightningElement {

    firstEnteredNum;
    secondEnteredNum;
    sliderValue;
    imgPath;

    @wire(MessageContext)
    ctx;

    changeNumberHandler(event) {
        let inputTarget = event.target;
        if (inputTarget.name === "first-number") {
            this.firstEnteredNum = Number(inputTarget.value);
            console.log('first Num: ', this.firstEnteredNum);
        } else if (inputTarget.name === "second-number") {
            this.secondEnteredNum = Number(inputTarget.value);
            console.log('second Num: ', this.secondEnteredNum);
        }
    }

    changeSliderHandler(event) {
        this.sliderValue = Number(event.target.value);
        console.log('slider value ==> ', this.sliderValue);
        console.log('slider value type => ', typeof this.sliderValue);
    }

    imageSelectHandler(evt) {
        this.imagePath = evt.target.value;
        console.log('image path >> ', this.imagePath);
    }
    
    
    
    addHandler() {
        let addResult = this.firstEnteredNum + this.secondEnteredNum;
        console.log('Addition Result => ', addResult);

        let msg = {
            addRes: {
                value: addResult
            }
        }

        publish(
            this.ctx,
            SMP_MC,
            msg
        )
    }

    sendValueHandler() {

        let sliderMsg = {
            sliderValue: {
                value: this.sliderValue
            }
        };

        publish(
            this.ctx,
            SMP_MC,
            sliderMsg
        );
    }

    sendImageHandler() {
        let imageMsg = {
            imgUploader: {
                value: this.imgPath
            }
        }

        publish(
            this.ctx,
            SMP_MC,
            imageMsg
        );
    }
}