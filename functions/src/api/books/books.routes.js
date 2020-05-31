const booksController = require('./books.controller')

const initBooksRoutes = (router) => {
  router.get('/books', booksController.listBooks)
}

module.exports = initBooksRoutes
