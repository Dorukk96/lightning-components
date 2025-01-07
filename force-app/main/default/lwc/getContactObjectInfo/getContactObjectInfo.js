import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class GetContactObjectInfo extends LightningElement {

    contactObject = CONTACT_OBJECT;
    
    rtName1;
    rtId1;
    rtName2;
    rtId2;


    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    contactObjectInfo({ data, error }) {
        if (data) {
            console.log('data => ', data);
            const rtInfo = data.recordTypeInfos;
            console.log(rtInfo);   
            
            // for in loop for looping through an object
            for (const eachRT in rtInfo) {
                const element = rtInfo[eachRT];
                console.log(element);

                if (element.name != 'Master') {
                    // if rtId1 is undefined
                    if (!this.rtId1) {
                        this.rtId1 = element.recordTypeId;
                        this.rtName1 = element.name;
                    }
                    // if rtId2 is undefined
                    else if (!this.rtId2) {
                        this.rtId2 = element.recordTypeId;
                        this.rtName2 = element.name;
                    }
                }
            }
        }
        if(error) {
            console.log(error);
        }
    }
}