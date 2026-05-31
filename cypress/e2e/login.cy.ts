describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').should('be.visible');
  });

  it('should display the login page', () => {
    cy.contains('Login');
    cy.get('input[placeholder="Username"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
  });

  it('should show error with wrong credentials', () => {
    cy.get('input[placeholder="Username"]')
      .should('not.be.disabled')
      .type('wronguser');
    cy.get('input[placeholder="Password"]')
      .should('not.be.disabled')
      .type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Identifiants incorrects');
  });

  it('should login successfully with correct credentials', () => {
    cy.get('input[placeholder="Username"]')
      .should('not.be.disabled')
      .type('admin');
    cy.get('input[placeholder="Password"]')
      .should('not.be.disabled')
      .type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/membres');
  });

  it('should redirect to login when not authenticated', () => {
    cy.visit('/membres');
    cy.url().should('include', '/login');
  });
});
