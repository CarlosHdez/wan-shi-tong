const videogamesController = require('./videogames.controller')

const initVGRoutes = (router) => {
  router.get('/videogames', videogamesController.listVideogames)
  router.put('/videogames/:id', videogamesController.updateGame)
  router.post('/videogames', videogamesController.createGame)
  router.delete('/videogames/:id', videogamesController.deleteGame)
}

module.exports = initVGRoutes
