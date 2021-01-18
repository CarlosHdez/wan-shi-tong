const admin = require('../../setup_firebase')

const db = admin.firestore()

const boardgamesController = {
  listBoardgames: async (req, res) => {
    try {
      console.log('Request received to list boardgames')
      const collection = db.collection('boardgames')
      const snapshot = await collection.get()
      const boardgameList = snapshot.docs.map((game) => {
        const data = game.data()
        return {
          id: game.id,
          ...data
        }
      })
      const boardgames = await Promise.all(boardgameList)
      console.log('List generated')
      return res.status(200).json({data: boardgames})
    } catch (err) {
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
      const {body} = req
      await boardgameRef.set(body)
      console.log('Successful Update')
      const newRef = await collection.doc(id).get()
      const data = {
        id,
        ...newRef.data()
      }
      console.log(data)
      return res.status(200).json(data)
    } catch (err) {
      console.log('Error updating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  },

  createGame: async (req, res) => {
    const collection = db.collection('boardgames')
    console.log('Creating a boardgame')
    try {
      const {body} = req
      const result = await collection.add(body)
      console.log(`Successful creation with id ${result.id}`)
      const newGame = await result.get()
      console.log(newGame)
      return res.status(200).json({
        id: result.id,
        ...newGame.data()
      })
    } catch (err) {
      console.log('Error creating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  }
}

module.exports = boardgamesController
