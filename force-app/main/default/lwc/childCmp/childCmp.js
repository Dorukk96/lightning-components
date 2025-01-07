import { LightningElement } from 'lwc';

export default class ChildCmp extends LightningElement {

    handleClick() {
        console.log('child component: handle click: before dispatch');
        // const evt = new CustomEvent('bubbling'); // bubble: false, composed: false --> RECOMMENDED
        // const evt = new CustomEvent('bubbling', { bubbles: false, composed: false }); most restrictive. Goes only one layer up.
        const evt = new CustomEvent('bubbling', { bubbles: true, composed: false });
        this.dispatchEvent(evt);
        console.log('child component: handle click: AFTER dispatch');
    }
}