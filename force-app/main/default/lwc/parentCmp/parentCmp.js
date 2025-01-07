import { LightningElement } from 'lwc';

export default class ParentCmp extends LightningElement {

    handleBubbling(event) {
        console.log('====== handleBubble2 ======');
        console.log('Parent handleBubble method called.');
        console.log('parent CMP: handleBubble: node: ' + event.target.nodeName);
        console.log('parent CMP: handleBubble: currentTarget: ' + JSON.stringify(event.currentTarget)); // event listener
        console.log('parent CMP: handleBubble: target: ' + event.target.target); // the element that triggered the event.
    }

    handleBubble2(event) {
        console.log('Parent handleBubble2 method called.');
        console.log('parent CMP: handleBubble2: node: ' + event.target.nodeName);
        console.log('parent CMP: handleBubble2: currentTarget: ' + event.currentTarget); // event listener
        console.log('parent CMP: handleBubble2: target: ' + event.target); // the element that triggered the event.
    }
}