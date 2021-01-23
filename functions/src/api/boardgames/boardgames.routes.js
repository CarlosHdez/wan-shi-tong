const boardgamesController = require('./boardgames.controller')

const initBGRoutes = (router) => {
  router.get('/boardgames', boardgamesController.listBoardgames)
  router.put('/boardgames/:id', boardgamesController.updateGame)
  router.post('/boardgames', boardgamesController.createGame)
}

module.exports = initBGRoutes
