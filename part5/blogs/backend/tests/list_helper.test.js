const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns 1 for an empty array of blogs', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const list = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(list)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {
  const list = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "Photon",
      author: "Einstein",
      likes: 12
    },
    {
      title: 'Relativity',
      author: 'Einstein',
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]

  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(list)
    expect(result).toBe('Edsger W. Dijkstra')
  })
})

describe('most blogs', () => {
  const list = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "Photon",
      author: "Einstein",
      likes: 312
    },
    {
      title: 'Relativity',
      author: 'Einstein',
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]

  test('returns the author with most blogs', () => {
    const result = listHelper.mostLikes(list)
    expect(result).toBe('Einstein')
  })
})