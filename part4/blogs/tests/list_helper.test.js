const {dummy} = require('../utils/list_helper')

test('dummy returns 1 for an empty array of blogs', () => {
  const result = dummy([])
  expect(result).toBe(1)
})