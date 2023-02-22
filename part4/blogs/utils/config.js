const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'testing' 
  ? process.env.TESTING_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}