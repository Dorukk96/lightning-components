import { createElement } from 'lwc';
import ResponsivenessLWC_1 from 'c/responsivenessLWC_1';

describe('c-responsiveness-l-w-c-1', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-responsiveness-l-w-c-1', {
            is: ResponsivenessLWC_1
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});