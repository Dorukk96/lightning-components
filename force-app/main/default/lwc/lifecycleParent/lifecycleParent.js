import { LightningElement } from 'lwc';

export default class LifecycleParent extends LightningElement {

    constructor() {
        super();
        console.log('parent constructor has been called.');
    }

    connectedCallback() {
        console.log('parent connectedcallback has been called.');
    }

    renderedCallback() {
        console.log('Parent renderedcallback has been called.');
    }

    disconnectedCallback() {
        console.log('parent disconnectedcallback has been called.');
    }

    errorCallback(error, stack) {
        console.log('parent errorCallback has been called => ', error.message);
        console.log('stack => ', stack);
    }

    input;
    showChild = true;

    changeHandler(event) {
        this.input = event.target.value;
    }

    childHandler() {
        this.showChild = false;
    }

}