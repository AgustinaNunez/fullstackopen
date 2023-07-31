import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const buttonsLabel = {
  view: 'view',
  hide: 'hide',
  like: 'like',
}

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      id: 'id',
      title: 'title',
      author: 'author',
      url: '/url',
      likes: 3,
      user: []
    }

    render(<Blog blog={blog} />)
  })

  test('renders content with details hidden', () => {
    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: buttonsLabel.view })).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: buttonsLabel.hide })).not.toBeInTheDocument()
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(blog.author)).not.toBeInTheDocument()
  })

  test('renders content detail when view button is clicked', async () => {
    const button = screen.getByText(buttonsLabel.view)
    await fireEvent.click(button)

    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(blog.author)).toBeInTheDocument()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: buttonsLabel.hide })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: buttonsLabel.like })).toBeInTheDocument()
  })
})
