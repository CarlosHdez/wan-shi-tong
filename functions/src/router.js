'use strict'

const router = require('express').Router()
const initBooksRoutes = require('./api/books/books.routes')

initBooksRoutes(router)

module.exports = router
