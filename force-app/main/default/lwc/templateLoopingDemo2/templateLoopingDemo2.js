import { LightningElement } from 'lwc';

export default class TemplateLoopingDemo2 extends LightningElement {

    // Indicates the account records
    accs = [
        {
            Id: '1', 
            Name: 'Burlington Guy', 
            AccountNumber: '1511',
            Phone: '+1336270000',
            Status: 'Inactive'
        },
        {
            Id: '2', 
            Name: 'Edge Communitation Guy', 
            AccountNumber: '98765',
            Phone: '+1336299999',
            Status: 'Active'
        },
        {
            Id: '3', 
            Name: 'Target Store Guy', 
            AccountNumber: 'TG550055',
            Phone: '+1555550000',
            Status: 'Active'
        },
        {
            Id: '4', 
            Name: 'Million Dolar', 
            AccountNumber: 'MD99887',
            Phone: '+1355550900',
            Status: 'Inactive'
        }
    ];
}