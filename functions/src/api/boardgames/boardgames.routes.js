const boardgamesController = require('./boardgames.controller')

const initBGRoutes = (router) => {
  router.get('/boardgames', boardgamesController.listBoardgames)
  router.put('/boardgames/:id', boardgamesController.updateGame)
  router.post('/boardgames', boardgamesController.createGame)
  router.delete('/boardgames/:id', boardgamesController.deleteGame)
  router.get('/mechanics', boardgamesController.loadMechanics)
}

module.exports = initBGRoutes
