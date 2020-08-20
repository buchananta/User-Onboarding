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
  describe('Check ToS checkbox', () => {
    it('check box', () => {
      cy.get('input[name="tos"]').click()
        .should('be.checked')
    })
  })
  describe('Submitting Form', () => {
    it('submit button clickable', () => {
      cy.get('button').should('be.enabled')
    })
    it('form submits', () => {
      //check the actual network request response
      cy.server()
      cy.route('POST', 'api/users').as('postUser')
      cy.get('button').click()
      cy.wait('@postUser').its('status').should('eq', 201)
    })
    it('response displayed in webpage', () => {
      cy.contains('{"username":"foobar","email":"foo@bar.baz","password":"password","tos":true')
    })
  })
  describe('Form Validation', () => {
    it('disabled when empty', () => {
      cy.get('button').should('be.disabled')
    })
    it('enabled with all fields', () => {
      //.each working!
      cy.get('input').each(i => cy.wrap(i).type('valid@for.all'))
      //cy.get('input[name="tos"]').click()
      cy.get('button').should('be.enabled')
    })
    it('disabled if missing username', () => {
      cy.get('input[name="username"]').clear()
      cy.get('button').should('be.disabled')
    })
    it('disabled if missing email', () => {
      cy.get('input[name="username"]').type('username')
      cy.get('input[name="email"]').clear()
      cy.get('button').should('be.disabled')
    })
    it('disabled if missing password', () => {
      cy.get('input[name="email"]').type('foo@bar.baz')
      cy.get('input[name="password"]').clear()
      cy.get('button').should('be.disabled')
    })
  })
})
