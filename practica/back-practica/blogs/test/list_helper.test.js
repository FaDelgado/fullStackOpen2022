const listHelper = require('../utils/list_helper')

const listWithOutBlogs = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }]

const listWithMoreBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: 't34234b54a676234d1234',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  },
  {
    _id: 'ewqaa71b54a6762123f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Other Author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  }
]

test('dummy returns one', () => {

  const result = listHelper.dummy(listWithOutBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('without blogs', () => {
    const result = listHelper.totalLikes(listWithOutBlogs)
    expect(result).toBe(0)
  })

  test('one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    let total = 0;
    listWithOneBlog.forEach(b => {
      total += b.likes;
    });
    expect(result).toBe(total)
  })

  test('a lot of blogs', () => {
    const result = listHelper.totalLikes(listWithMoreBlogs)
    let total = 0;
    listWithMoreBlogs.forEach(b => {
      total += b.likes;
    });
    expect(result).toBe(total)
  })
})

describe ('favorite blog', () => {
  test('find the favorite blog', () => {
    const result = listHelper.favoriteBlog(listWithMoreBlogs)
    expect(result).toEqual(listWithMoreBlogs[1])
  })
})

describe ('author with more blogs', () => {
  test('find author with more blogs', () => {
    const result = listHelper.mostBlogs(listWithMoreBlogs)
    const expectOBJ = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }
    expect(result).toEqual(expectOBJ)
  })
})

describe ('author with more likes', () => {
  test('find author with more likes', () => {
    const result = listHelper.mostLikes(listWithMoreBlogs)
    const expectOBJ = {
      author: 'Edsger W. Dijkstra',
      likes: 7
    }
    expect(result).toEqual(expectOBJ)
  })
})