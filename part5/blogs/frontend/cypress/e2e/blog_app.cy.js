describe('Blog app', function() {
  const users = [
    {
      name: 'Juan Perez',
      username: 'juanperez',
      password: 'juanperezpassword'
    },
    {
      name: 'María Lopez',
      username: 'marialopez',
      password: 'marialopezpassword'
    }
  ]
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, users[0])
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, users[1]) 
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(users[0].username)
      cy.get('#password').type(users[0].password)
      cy.get('#login-button').click()

      cy.contains('Juan Perez logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(users[0].username)
      cy.get('#password').type('juanperezwrongpass')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
      const RED_COLOR = 'rgb(255, 99, 71)'
      cy.get('.error').should('have.css', 'color', RED_COLOR)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({...users[0]})
    })

    it('a blog can be created', function() {
      cy.contains('new note').click()

      const newBlog = {
        title: 'Some cool blog',
        author: 'Anonymus',
        url: '/pablo-lopez/some-cool-blog.html'
      }
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-button').click()
      
      cy.contains(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
      cy.contains(newBlog.title)
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another cool blog',
          url: '/anonymus/another-cool-blog.html'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('it can be removed', function () {
        cy.contains('view').click()
        cy.get('#remove-button').click()
        cy.on('window:confirm', () => true)
      })

      describe('when other user is logged in', function() {
        beforeEach(function() {
          cy.contains('logout').click()
          
          cy.get('#username').type(users[1].username)
          cy.get('#password').type(users[1].password)
          cy.get('#login-button').click()
          cy.contains('María Lopez logged in')
    
          cy.login({...users[1]})
        })

        it('only the creator can see the delete button of a blog', function() {
          cy.get('.blog')
            .contains('view').click()
            .not(users[1].name)
            .not('remove')
        })
      })
    })
  })
})