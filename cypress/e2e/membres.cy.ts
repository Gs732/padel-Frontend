describe('Gestion des Membres', () => {

  beforeEach(() => {
  cy.visit('/membres')
})

  it('should display the membres page', () => {
    cy.contains('Gestion des Membres')
    cy.contains('+ Nouveau membre')
  })

  it('should display the table headers', () => {
    cy.contains('Nom')
    cy.contains('Prénom')
    cy.contains('Email')
    cy.contains('Téléphone')
    cy.contains('Solde')
    cy.contains('Actif')
  })

  it('should open dialog when clicking nouveau membre', () => {
    cy.contains('+ Nouveau membre').click()
    cy.contains('Nouveau Membre')
    cy.get('input').should('have.length.greaterThan', 0)
  })

  it('should close dialog when clicking annuler', () => {
    cy.contains('+ Nouveau membre').click()
    cy.contains('Annuler').click()
    cy.contains('Nouveau Membre').should('not.exist')
  })

})