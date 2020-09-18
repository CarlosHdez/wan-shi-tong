const authorsController = require('./authors.controller')

const initAuthorsRoutes = (router) => {
  router.get('/authors', authorsController.listAuthors)
}

module.exports = initAuthorsRoutes
