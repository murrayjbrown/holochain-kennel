import '../support/setupPeerHandles'
import '../support/setupPeerWoofs'

describe('This section shows how to follow someone and see their woofs', function () {
  it('Try it, follow a friend and watch their woofs show up in your feed', function () {
    cy.visit('/')
    cy.get('#followButton').click()
    cy.get('.following-handle button:first').click()
    cy.visit('/')
  })
})
