describe('Gestion des Sites', () => {
 beforeEach(() => {
    cy.login('admin', 'admin123');
    cy.visit('/sites');
  });

  it('should display the sites page', () => {
    cy.contains('Gestion des Sites');
    cy.contains('+ Nouveau site');
  });

  it('should open dialog when clicking nouveau site', () => {
    cy.contains('+ Nouveau site').click();
    cy.contains('Nouveau Site');
  });

  it('should close dialog when clicking annuler', () => {
    cy.contains('+ Nouveau site').click();
    cy.contains('Annuler').click();
    cy.contains('Nouveau Site').should('not.exist');
  });
});