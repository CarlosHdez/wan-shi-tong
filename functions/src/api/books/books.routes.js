const booksController = require('./books.controller')

const initBooksRoutes = (router) => {
  router.get('/books', booksController.listBooks)
  router.put('/books/:id', booksController.updateBook)
  router.post('/books', booksController.createBook)
  router.delete('/books/:id', booksController.deleteBook)

  router.get('/bookTags', booksController.listTags)
}

module.exports = initBooksRoutes
