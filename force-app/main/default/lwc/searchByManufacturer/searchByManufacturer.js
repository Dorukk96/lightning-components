import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import CATEGORY_FIELD from '@salesforce/schema/Product_Item__c.Category__c';
import PRODUCT_ITEM from '@salesforce/schema/Product_Item__c';
import { MessageContext, publish } from 'lightning/messageService';

import PROD_DETAIL_CHNNEL from '@salesforce/messageChannel/ProductDetailChannel__c';

export default class SearchByManufacturer extends LightningElement {

    defaultRecTypeID;
    categoryOptions;
    catOption;


    @wire(MessageContext)
    context;


    @wire(getObjectInfo, { objectApiName: PRODUCT_ITEM})
    productItemHandler({ data, error }) {
        if (data) {
            this.defaultRecTypeID = data.defaultRecordTypeId;
        }
    }

    @wire(getPicklistValues, { fieldApiName: CATEGORY_FIELD, recordTypeId: '$defaultRecTypeID' })
    categoryValues({ data, error }) {
        if (data) {
            let mappedCategory =  data.values.map(productItem => {
                return {
                    label: productItem.label,
                    value: productItem.value,
                };
            });

            this.categoryOptions = mappedCategory;

        }
    }

    chooseCategoryHandler(event) {
        this.catOption = event.target.value;

        // message preparation
        let msg = {
            productPayload: {
                value: this.catOption
            }
        }

        publish(
            this.context,
            PROD_DETAIL_CHNNEL,
            msg
        );
    }
}