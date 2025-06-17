/// <reference types="cypress" />

import 'cypress-file-upload';
require('@4tw/cypress-drag-drop');
require('cypress-xpath');

describe('Eventos Mouse', () => {

    it('Drag and Drop', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/')
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get("#column-a").drag("column-b", { force: true })
    });

    it('Mouse Over', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/')
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('.menu-bar > :nth-child(1) > :nth-child(1)').trigger("mouseover");
        cy.wait(tiempo);
    });

    it.only('Slider', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/site-resources/PDP/pdp.html')
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('.product-price').invoke('attr', 'style', 'color: red;');
    });
})
