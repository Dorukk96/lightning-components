import { LightningElement, wire } from 'lwc';
import orginfos from '@salesforce/apex/CompanyInformationController.companyDetails';

export default class OrganizationInformationLwc extends LightningElement {

    orgDetails;
    error;

    @wire(orginfos)
    orgInfoHandler({ data, error }) {
        if (data) {
            console.log('company information => ', data);
            this.orgDetails = data;
        } else if (error) {
            this.error = error;
        }
    }
}