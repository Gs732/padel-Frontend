describe('Gestion des Resservations', () => {
  beforeEach(() => {
    cy.visit('/resservations');
  });

  it('should display the sites page', () => {
    cy.contains('Gestion des Resservations');
    cy.contains('+ Nouvelle resservation');
  });

  it('should open dialog when clicking nouvelle resservation', () => {
    cy.contains('+ Nouvelle resservation').click();
    cy.contains('Nouvelle Resservation');
  });

  it('should close dialog when clicking annuler', () => {
    cy.contains('+ Nouvelle resservation').click();
    cy.contains('Annuler').click();
    cy.contains('Nouvelle Resservation').should('not.exist');
  });
});
