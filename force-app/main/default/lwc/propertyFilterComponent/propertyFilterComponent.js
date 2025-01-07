import { MessageContext, publish } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import REAL_ESTATE_MC from '@salesforce/messageChannel/RealTimeMessageChannel__c';

export default class PropertyFilterComponent extends LightningElement {

    data = {};

    @wire(MessageContext)
    context;

    resetHandler() { }

    onchangeHandler(event) { 
        let name = event.target.name;
        let value = event.target.value;
        if (name === 'search-box') {
            this.data.enteredTerm = value; 
        } else if (name === 'price-slider') {
            this.data.price = value;
        } else if (name === 'bedroom-slider') {
            this.data.bedroom = value;
        } else if (name === 'bathroom-slider') {
            this.data.bathroom = value;
        }
        console.log('DATA => ', JSON.stringify(this.data));

        // publish the data
        let msg = {
            realEstateLMS: {
                value: this.data
            }
        };
        publish(
            this.context,
            REAL_ESTATE_MC,
            msg
        )
    }


}