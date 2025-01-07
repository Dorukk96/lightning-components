import { api, LightningElement } from 'lwc';

export default class CarTile extends LightningElement {
    @api car = {};

    clickHandler() {
        console.log("sending car id: ", this.car.Id);
        const carEvent = new CustomEvent('carselect', {detail: this.car.Id});
        this.dispatchEvent(carEvent);
    }
}