'use strict'

const router = require('express').Router()
const initBooksRoutes = require('./api/books/books.routes')

initBooksRoutes(router)

router.get('/test', (_req, res) => {
  return res.status(200).json({
    success: true,
    data: 'test'
  })
})

module.exports = router
