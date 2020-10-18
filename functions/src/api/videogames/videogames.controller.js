const admin = require('../../setup_firebase')

const db = admin.firestore()

const videogamesController = {
  listVideogames: async (req, res) => {
    try {
      console.log('Request received to list videogames')
      const collection = db.collection('videogames')
      const snapshot = await collection.get()
      const videogameList = snapshot.docs.map((game) => {
        const data = game.data()
        return {
          id: game.id,
          ...data
        }
      })
      const videogames = await Promise.all(videogameList)
      console.log('List generated')
      return res.status(200).json({data: videogames})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  },

  // TODO: Support partial updates
  updateGame: async (req, res) => {
    const {id} = req.params
    const collection = db.collection('videogames')
    console.log(`Updating videogame with id ${id}`)
    try {
      const videogameRef = collection.doc(id)
      const {body} = req
      const authorRef = db.collection('authors').doc(author)
      await videogameRef.set(body)
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
    const collection = db.collection('videogames')
    console.log('Creating a videogame')
    try {
      const {body} = req
      const result = await collection.add(body)
      console.log(`Successful creation with id ${result.id}`)
      const newGame = await result.get()
      console.log(newGame)
      return res.status(200).json({
        id: result.id,
        ...newGame
      })
    } catch (err) {
      console.log('Error creating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  }
}

module.exports = videogamesController
