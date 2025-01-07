import { LightningElement } from 'lwc';

export default class ResponsivenessLWC_2 extends LightningElement {

    selectedValue;

    categoryOpts = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'x-large' }
    ];

    onChangeHandler(event) {
        this.selectedValue = event.target.value;
    }


    mapMarkers = [
        {
            location: {
                Street: '1 Market St',
                City: 'San Francisco',
                Country: 'USA',
            },
            title: 'The Landmark Building',
            description:
                'Historic <b>11-story</b> building completed in <i>1916</i>',
        },
    ];
}