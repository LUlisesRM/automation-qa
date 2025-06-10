/// <reference types="cypress" />

require('cypress-xpath');

describe('Reto Asserts', () => {
  it('Asserts', () => {
    let tiempo = 1000;
    cy.visit('https://lulisesrm.github.io/automation-qa/')
    cy.title().should('eq', 'Automation QA');
    cy.wait(tiempo);

    //Eliminando ventana
    
  })
})