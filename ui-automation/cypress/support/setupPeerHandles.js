before(function () {
  cy.request('POST', 'http://localhost:3141/fn/litter/newHandle', 'agent3141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:4141/fn/litter/newHandle', 'agent4141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:5141/fn/litter/newHandle', 'agent5141')
  cy.wait(200)
})
