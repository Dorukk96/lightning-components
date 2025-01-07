import { LightningElement, track } from 'lwc';

export default class TrackProperty extends LightningElement {

    // Object is the complex property, it is not the primitive data type.
    // But primitive data types are automatically trackable by default.
    @track address = {
        street: 'area 51',
        city: 'NYC',
        country: 'US'
    };

    handleStreetChange(event) {
        this.address.street = event.detail.value;
    }

}