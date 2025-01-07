import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecordAll extends LightningElement {

    recId;

    handleChange(event) {
        this.recId = event.detail.value;
    }

    handleDeleteClick() { 
        const recordId = this.recId;
        deleteRecord(recordId)
        .then(result => {
            // show success toast message
            this.showToast(
                'Deleted Record', 
                'success', 
                'Record id deleted and moved to recycle bin.'
            );
        })
        .catch(error => {
            this.showToast(
                error.statusText, 
                'error', 
                error.body.message
            );
        });
    }

    // prepare toast message
    showToast(title, variant, message) {
        const toast = new ShowToastEvent({
            title: title,
            variant: variant,
            message: message
        });
        this.dispatchEvent(toast);
    }
}