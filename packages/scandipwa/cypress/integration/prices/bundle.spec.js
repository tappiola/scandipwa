/* eslint-disable */

describe('Fixed bundle', () => {
    before(() => {
        cy.visit('/');
        cy.get('.CookiePopup-CTA').click();
    })

    it('Case 1', () => {
        cy.visit('/fixed-bundle-shoes.html');

        // Check base prices
        cy.deselectDropdownOptions();
        cy.checkPrices('$20.00', '$26.00', '$24.24');

        // Check prices after dropdown option selection
        cy.selectDropdownOption('1 x Boots-black-EU 36');
        cy.checkPrices('$31.70', '$37.70', '$35.15');

        // Check prices after text input fill in
        cy.get('.ProductCustomizableOptions-Wrapper .Field').type('option value');
        cy.checkPrices('$34.30', '$40.30', '$37.58');
    })
});
