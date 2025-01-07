import { LightningElement } from 'lwc';

export default class ParentAccountLwc extends LightningElement {

    accName;
    handleAccNameChange(event) {
        this.accName = event.detail.value;
    }

    handleSaveChange() {
        alert('account name ==> ' + this.accName);

        // call fetchDetails method of `childContactLwc`
        const con = this.template.querySelector('c-child-contact-lwc').fetchDetails();
        alert('contact lastname: ' + con.lastName + ', contact email: ' + con.email);
    }

    handleResetChange() {
        this.acc = undefined;
        this.template.querySelector('c-child-contact-lwc').resetDetails();
    }

}