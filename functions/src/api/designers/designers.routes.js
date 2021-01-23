const designersController = require('./designers.controller')

const initDesignersRoutes = (router) => {
  router.get('/designers', designersController.listDesigners)
  router.post('/designers', designersController.saveDesigner)
}

module.exports = initDesignersRoutes
