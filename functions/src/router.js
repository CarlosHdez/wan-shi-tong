'use strict'

const router = require('express').Router()
const initBooksRoutes = require('./api/books/books.routes')
const initAuthorsRoutes = require('./api/authors/authors.routes')
const initVGRoutes = require('./api/videogames/videogames.routes')
const initBGRoutes = require('./api/boardgames/boardgames.routes')
const initDesignerssRoutes = require('./api/designers/designers.routes')

initBooksRoutes(router)
initAuthorsRoutes(router)
initVGRoutes(router)
initBGRoutes(router)
initDesignerssRoutes(router)

module.exports = router
