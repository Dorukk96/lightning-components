import { LightningElement, wire } from 'lwc';
import getTopAccount from '@salesforce/apex/AccountController.getTopAccount';
// import anyName from '@salesforce/apex/ClassName.methodName';

export default class WiredApex1 extends LightningElement {

    accounts;

    @wire(getTopAccount) 
    getAccounts({ data, error }) {
        if (data) {
            console.log("** getting accounts..")
            this.accounts = data;
            console.log(this.accounts);
        } else if (error) {
            console.error('err => ', error);
        }
    }
}