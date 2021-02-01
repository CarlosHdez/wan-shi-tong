const admin = require('../../setup_firebase')

const db = admin.firestore()

const translateGame = async (game) => {
  const {designer, ...data} = game.data()
  const desRef = await designer.get()
  return {
    id: game.id,
    ...data,
    designer: {
      id: designer.id,
      ...desRef.data()
    }
  }
}

const boardgamesController = {
  listBoardgames: async (req, res) => {
    try {
      console.log('Request received to list boardgames')
      const collection = db.collection('boardgames')
      const snapshot = await collection.get()
      const boardgameList = snapshot.docs.map(translateGame)
      const boardgames = await Promise.all(boardgameList)
      console.log('Boardgames generated')
      return res.status(200).json({data: boardgames})
    } catch (err) {
      console.log(err)
      return res.status(500).json({message: err})
    }
  },

  // TODO: Support partial updates
  updateGame: async (req, res) => {
    const {id} = req.params
    const collection = db.collection('boardgames')
    console.log(`Updating boardgame with id ${id}`)
    try {
      const boardgameRef = collection.doc(id)
      const {designer, ...body} = req.body
      console.log(designer)
      const desRef = db.collection('designers').doc(designer)
      const game = {
        ...body,
        designer: desRef
      }
      await boardgameRef.set(game)
      console.log('Successful Update')
      const newRef = await collection.doc(id).get()
      const newGame = await translateGame(newRef)
      console.log(newGame)
      return res.status(200).json(newGame)
    } catch (err) {
      console.log('Error updating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  },

  createGame: async (req, res) => {
    const collection = db.collection('boardgames')
    console.log('Creating a boardgame')
    try {
      const {designer, ...body} = req.body
      const desRef = db.collection('designers').doc(designer)
      const game = {
        ...body,
        designer: desRef
      }
      const result = await collection.add(game)
      console.log(`Successful creation with id ${result.id}`)
      const newGame = await result.get()
      const translatedGame = await translateGame(newGame)
      console.log(translateGame)
      return res.status(200).json({
        id: result.id,
        ...translatedGame
      })
    } catch (err) {
      console.log('Error creating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  }
}

module.exports = boardgamesController
