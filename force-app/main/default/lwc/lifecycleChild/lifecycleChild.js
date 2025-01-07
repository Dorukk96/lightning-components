import { LightningElement } from 'lwc';

export default class LifecycleChild extends LightningElement {

    constructor() {
        super();
        console.log('child constructor has been called.');
    }

    connectedCallback() {
        console.log('child connectedcallback has been called.');
        throw new Error("Error occured while getting the things done.");
        
    }

    renderedCallback() {
        console.log('child renderedcallback has been called.');
    }

    disconnectedCallback() {
        console.log('child disconnectedcallback has been called.');
    }
}