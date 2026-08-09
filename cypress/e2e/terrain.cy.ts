describe('Gestion des Terrains', () => {
  beforeEach(() => {
    cy.login('admin', 'admin123');
    cy.visit('/terrains');
  });

  it('should display the terrains page', () => {
    cy.contains('Gestion des Terrains');
    cy.contains('+ Nouveau terrain');
  });

  it('should open dialog when clicking nouveau terrain', () => {
    cy.contains('+ Nouveau terrain').click();
    cy.contains('Nouveau Terrain');
  });

  it('should close dialog when clicking annuler', () => {
    cy.contains('+ Nouveau terrain').click();
    cy.contains('Annuler').click();
    cy.contains('Nouveau Terrain').should('not.exist');
  });
});