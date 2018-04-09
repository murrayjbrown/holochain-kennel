import '../support/setupPeerHandles'


describe('This section describes how to post woofs', function () {
  it('Let\'s go to the main screen and post a couple of woofs', function () {
    cy.visit('/')
    cy.get('#woof').type('Your first woof!!')
    cy.get('#postWoof').click()
    cy.get('#woof').type('Your second woof!!')
    cy.get('#postWoof').click()
    cy.wait(100)
    
    // cy.get('.message:first').contains('Your second woof!!')
  })
  it('When you click the title of the woof you will be taken directly to that woof.', function () {
    cy.visit('/')
    cy.get('#woof').type('The woof to click on!!')
    cy.get('#postWoof').click()
    cy.wait(100)
    // cy.get('.stamp:first').click()
    // cy.get('.message:first').contains('The woof to click on!!')
  })
})
