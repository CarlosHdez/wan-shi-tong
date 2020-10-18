'use strict'

const router = require('express').Router()
const initBooksRoutes = require('./api/books/books.routes')
const initAuthorsRoutes = require('./api/authors/authors.routes')
const initVGRoutes = require('./api/videogames/videogames.routes')

initBooksRoutes(router)
initAuthorsRoutes(router)
initVGRoutes(router)

module.exports = router
