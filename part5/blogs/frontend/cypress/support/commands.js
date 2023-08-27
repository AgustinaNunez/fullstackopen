import { BACKEND_URL, FRONTEND_URL } from "./constants"

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${BACKEND_URL}/api/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit(FRONTEND_URL)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${BACKEND_URL}/api/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit(FRONTEND_URL)
})