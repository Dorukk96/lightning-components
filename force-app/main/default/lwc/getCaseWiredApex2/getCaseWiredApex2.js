import { LightningElement, wire } from 'lwc';
import getCasesByStage from '@salesforce/apex/CaseController.getCasesByStage';

export default class GetCaseWiredApex2 extends LightningElement {

    myCases;
    status = 'Closed';
    error;

    caseColumns = [
        { label: 'Case Number', fieldName: 'CaseNumber' },
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Email Number', fieldName: 'ContactEmail', type: 'email' },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Account', fieldName: 'AccountName__c' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    @wire(getCasesByStage, { status: '$status' })
    caseStageHandler({ data, error }) {
        if (data) {
            this.myCases = data;
            console.log('Case Records => ', this.myCases);
        } else if (error) {
            this.error = error;
            console.error(this.error);
        }
    }

}