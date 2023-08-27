Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit('')
})