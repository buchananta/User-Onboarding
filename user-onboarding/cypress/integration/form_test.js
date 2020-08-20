describe('Form Tests', () => {
  it('can navigate to localhost:3000', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', 'localhost')
  })
  describe('Type into input fields', () => {
    it('enter text into username field', () => {
      cy.get('input[name="username"]')
        .type('foobar')
        .should('have.value', 'foobar')
    })
    it('enter text into e-mail field', () => {
      cy.get('input[name="email"]')
        .type('foo@bar.baz')
        .should('have.value', 'foo@bar.baz')
    })
    it('enter text into password field', () => {
      cy.get('input[name="password"]')
        .type('password')
        .should('have.value', 'password')
    })
  })

})