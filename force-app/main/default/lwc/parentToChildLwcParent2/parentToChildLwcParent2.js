import { LightningElement, track } from 'lwc';
import iphoneImage from '@salesforce/resourceUrl/iphone_15_image';

export default class ParentToChildLwcParent2 extends LightningElement {

    @track product = {
        name: 'vision pro',
        description: 'apple new headset',
        url: iphoneImage
    };

    onChangeHandler(event) {
        let name = event.target.name;
        let value = event.detail.value;
        
        this.product[name] = value;
    }
}