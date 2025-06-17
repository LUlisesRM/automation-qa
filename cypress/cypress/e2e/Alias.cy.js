/// <reference types="cypress" />

import 'cypress-file-upload';

require('@4tw/cypress-drag-drop');
require('cypress-xpath');

describe('Alias', () => {
    it('Alias con GET', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('.btn-group')



















        
        cy.get('@botones').should('have.length', 3);
        cy.get('@botones').first().click({ force: true });
    });
});