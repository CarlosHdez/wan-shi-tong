'use strict'

const router = require('express').Router()
const initBooksRoutes = require('./api/books/books.routes')
const initAuthorsRoutes = require('./api/authors/authors.routes')

initBooksRoutes(router)
initAuthorsRoutes(router)

module.exports = router
