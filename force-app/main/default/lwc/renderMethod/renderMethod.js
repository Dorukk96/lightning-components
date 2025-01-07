import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import renderTemplate from './renderMethod.html';

export default class RenderMethod extends LightningElement {

    selectedButton;

    render() {
        return this.selectedButton === 'Signin' ? signinTemplate : this.selectedButton === "Signup" ? signupTemplate : renderTemplate; 
    }

    clickHandler(event) {
        this.selectedButton = event.target.label;
    }

    signinHandler() { 
        // add some business logic for signing in
        console.log('signing in...');
    }

    signupHandler() {
        // add some business logic for signing up
        console.log('signing up...');
    }
}