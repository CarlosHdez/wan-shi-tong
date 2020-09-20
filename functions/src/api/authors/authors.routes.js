const authorsController = require('./authors.controller')

const initAuthorsRoutes = (router) => {
  router.get('/authors', authorsController.listAuthors)
  router.post('/authors', authorsController.saveAuthor)
}

module.exports = initAuthorsRoutes
