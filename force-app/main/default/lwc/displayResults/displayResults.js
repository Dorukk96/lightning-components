import { api, LightningElement } from 'lwc';

export default class DisplayResults extends LightningElement {

    @api records; // make it public so parent can pass details.
    @api columns;
    @api errors;
}