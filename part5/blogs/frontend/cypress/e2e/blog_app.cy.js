import { BACKEND_URL } from "../support/constants"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${BACKEND_URL}/api/testing/reset`)
    const user = {
      name: 'Juan Perez',
      username: 'juanperez',
      password: 'juanperezpassword'
    }
    cy.request('POST', `${BACKEND_URL}/api/users/`, user) 
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
      cy.get('#username').type('juanperez')
      cy.get('#password').type('juanperezpassword')
      cy.get('#login-button').click()

      cy.contains('Juan Perez logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('juanperez')
      cy.get('#password').type('juanperezwrongpass')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
      const RED_COLOR = 'rgb(255, 99, 71)'
      cy.get('.error').should('have.css', 'color', RED_COLOR)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'juanperez',
        password: 'juanperezpassword'
      })
    })

    it('a blog can be created', function() {
      cy.contains('new note').click()

      const newBlog = {
        title: 'Some cool blog',
        author: 'Pablo Lopez',
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
          author: 'María Lopez',
          url: '/maria-lopez/another-cool-blog.html'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })
    })
  })
})