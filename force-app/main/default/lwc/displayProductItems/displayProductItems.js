import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import PROD_DETAIL_CHNNEL from '@salesforce/messageChannel/ProductDetailChannel__c';
import fetchProductItems from '@salesforce/apex/ProductItemController.fetchProductItems';


export default class DisplayProductItems extends LightningElement {


    category = '';
    fetchedProduct;

    @wire(MessageContext)
    context;

    @wire(fetchProductItems, { category: '$category' })
    productHandler({ data, error }) {
        if (data) {
            this.fetchedProduct = data;
        }
    }

    connectedCallback() {
        subscribe(
            this.context,
            PROD_DETAIL_CHNNEL,
            (msg) => { this.msgHandler(msg); },
            { scope: APPLICATION_SCOPE }
        );

        fetchProductItems({ category: '$category' })
            .then(res => {
                console.log('RESULTS => ', res);
            })
            .catch(err => {})
    }

    msgHandler(message) {
        if (message) {
            let catMsg = message.productPayload.value;
            this.category = catMsg;
        }
    }

    



}