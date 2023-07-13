import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const buttonsLabel = {
  view: 'view',
  hide: 'hide',
}

const blog = {
  id: 'id',
  title: 'title',
  author: 'author',
  url: '/url',
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
