import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const buttonsLabel = {
  view: 'view',
  hide: 'hide',
  like: 'like',
}

const blog = {
  id: 'id',
  title: 'title',
  author: 'author',
  url: '/url',
  likes: 3,
  user: []
}

test('renders content with details hidden', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(buttonsLabel.view)
  expect(div).not.toHaveTextContent(buttonsLabel.hide)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.author)
})

test('renders content detail when view button is clicked', async () => {
  render(<Blog blog={blog} />)
  const button = screen.getByText(buttonsLabel.view)
  await fireEvent.click(button)

  expect(screen.getByText(blog.title)).toBeInTheDocument()
  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(blog.author)).toBeInTheDocument()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: buttonsLabel.hide })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: buttonsLabel.like })).toBeInTheDocument()
})
