import { api, LightningElement, wire } from 'lwc';
import getProperties from '@salesforce/apex/PropertyController.getProperties';


export default class PropertyTile extends LightningElement {

    @api cityName;
    @api bedAmount;
    @api bathAmount;
    @api price;
    @api imgUrl;
}