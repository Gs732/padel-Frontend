/// <reference types="cypress" />

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.request('POST', 'http://localhost:8080/api/auth/login', {
    username,
    password,
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