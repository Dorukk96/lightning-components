import getProperties from '@salesforce/apex/PropertyController.getProperties';
import { LightningElement, wire } from 'lwc';

export default class ResponsivenessLWC_1 extends LightningElement {


    // City__c, Beds__c, Baths__c, Price__c
    columns = [
        { label: 'City', fieldName: 'City__c' },
        { label: '# of Beds', fieldName: 'Beds__c' },
        { label: '# of Baths', fieldName: 'Baths__c' },
        { label: 'Price', fieldName: 'Price__c' },
    ];

    properties;
    error;
    data = {};

    resetSearchHandler() {
        this.template.querySelector('.search-key').value = undefined;
        this.template.querySelector('.price-range').value = 0;
        this.template.querySelector('.bedrooms').value = 1;
        this.template.querySelector('.bathrooms').value = 1;

        this.properties = undefined;
    }

    onSearchHandler(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'search-key') {
            this.data.searchedKey = value;
        } else if (name === 'price-range') {
            this.data.price = value;
        } else if (name === 'bedrooms') {
            this.data.numOfBedroom = value;
        } else if (name === 'bathrooms') {
            this.data.numOfBathroom = value;
        }
    }

    recordSearchHandler() {
        const searchTerm = this.data.searchedKey;
        const price = this.data.price;
        const bedrooms = this.data.numOfBedroom;
        getProperties({
            searchedTerm: searchTerm, 
            price: price, 
            bedrooms: bedrooms
        })
        .then(res => {
            this.properties = res;
        })
        .catch(err => {
            this.error = err;
        })
    }

}