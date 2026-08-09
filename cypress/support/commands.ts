/// <reference types="cypress" />

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: { username, password },
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}

export {};