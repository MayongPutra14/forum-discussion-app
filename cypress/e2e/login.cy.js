/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */
/* global describe, Cypress, beforeEach, it, cy, expect */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/i)
      .should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('wrong_user@example.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    cy.get('button')
      .contains(/^Login$/i)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('dukawni@gmail.com');
    cy.get('input[placeholder="Password"]').type('dukawni@gmail.com');
    cy.get('button')
      .contains(/^Login$/i)
      .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
