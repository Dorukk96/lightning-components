import { LightningElement } from 'lwc';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';

export default class ContactSearch extends LightningElement {

    searchTerm;
    contacts;
    error;

    column = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Department', fieldName: 'Department' },
        { label: 'Title', fieldName: 'Title' },
        { label: 'Phone', fieldName: 'Phone' , type: 'phone'},
    ];

    handleSearchChange(event) {
        this.search = event.detail.value;

        // imperative call to apex
        searchContacts({ searchText: this.search })
        .then(result => {
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.contacts = undefined;
            this.error = error;
        });
    }
} 