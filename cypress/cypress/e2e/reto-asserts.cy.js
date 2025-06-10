/// <reference types="cypress" />

require('cypress-xpath');

describe('Reto Asserts', () => {
  it('Asserts', () => {
    let tiempo = 1000;
    cy.visit('https://lulisesrm.github.io/automation-qa/')
    cy.title().should('eq', 'Automation QA');
    cy.wait(tiempo);

    cy.get("#sum1").should("be.visible").and("have.class", "form-control").type(10)
    cy.get("#sum2").should("be.visible").and("have.class", "form-control").type(10)

    cy.contains("[type='button']", "Get Total").click()

    cy.get("#displayvalue").should("be.visible").then((e) => {
      let r = a + b;
      cy.log("el valor de r: " + r)
      cy.log(e.text())
      let res = e.text()

      if (r == res) {
        cy.log("Son valores iguales")
      } else {
        cy.log("El resultado es incorrecto")
      }

      if (res > 50) {
        a = a - 10
        b = b - 10
        cy.get("#sum1").invoke("attr", "placeholder").should("contain", "Enter value").then(() => {
          cy.get("#sum1").clear().type(a)
          cy.wait(tiempo)
          cy.get("#sum1").invoke("attr", "style", "color:blue")
        })
        cy.wait(tiempo)
        cy.get("#sum2").should("be.visible").and("have.class", "form-control").clear().type(b)
        cy.wait(tiempo)
        cy.get("#sum2").invoke("attr", "style", "color:blue")
        cy.wait(tiempo)
        cy.contains("[type='button']", "Get Total").click()

        cy.get("#displayvalue").should("be.visible").then((e) => {
          cy.get("#displayvalue").invoke("attr", "style", "color:red")
        })
      } else {
        a = a + 5
        b = b + 5
        cy.get("#sum1").should("be.visible").and("have.class", "form-control").clear().type(a)
        cy.wait(tiempo)
        cy.get("#sum2").should("be.visible").and("have.class", "form-control").clear().type(b)
        cy.wait(tiempo)
        cy.contains("[type='button']", "Get Total").click()
      }
    })

  })

})
