/* eslint-disable */
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('checkPrices', (oldPrice, currentPrice, priceExclTax) => {
    cy.get('.ProductPrice-HighPrice').should('contain.text', oldPrice);
    cy.get('.ProductPrice-Price').should('contain.text', currentPrice);
    cy.get('.ProductPrice-SubPrice').should('contain.text', priceExclTax);
});

Cypress.Commands.add('deselectDropdownOptions', () => {
    cy.get('#bundle-options-dropdown').select('Choose Option', {force: true});
});

Cypress.Commands.add('selectDropdownOption', (optionText) => {
    cy.get('.ProductActions .Field_type_select').click().within(() => {
        cy.contains('li', optionText).click();
    });
});
