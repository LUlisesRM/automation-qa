/// <reference types='cypress' />

import 'cypress-file-upload';

require('@4tw/cypress-drag-drop');
require('cypress-xpath');
require('cypress-plugin-tab');

describe('Elementos de una tabla', ()=>{

    it('CHILDREN', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('.btn-group').children('button').should('contain','Green').click({force: true});
    });

    
    it('Seleccionar por medio de EQ', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('[type="button"]').eq(2).should('contain','Red').click({force: true});
    });

    
    it('Seleccionar por medio de Filter', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('[type="button"]').filter('.btn-warning');
    });

    it('Seleccionar por medio de Find', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        cy.get('.btn-group').find('[type="button"]').should('have.length', 3);
    });

    it('Reto de las tablas con for y Assets', () => {
        let tiempo = 1000;
        cy.visit('https://lulisesrm.github.io/automation-qa/index.html');
        cy.title().should('eq', 'Automation QA');
        cy.wait(tiempo);

        for(let x = 0; x <= 4; x++){
            let nombreBoton = "";

            if (x == 1) {
                nombreBoton = "Green";  
                
            } else if (x == 2) {
                nombreBoton = "Red";  
                
            } else if (x == 3) {
                nombreBoton = "Blue";  
                
            } else if (x == 4) {
                nombreBoton = "All";   
            }

            cy.get('[type="button"]').eq(x).should('contain', nombreBoton).click({force: true});
            cy.wait(tiempo);
            cy.get('[type="checkbox"]').check({force: true});
        }
    });




});