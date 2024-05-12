const admin = require('../../setup_firebase')

const db = admin.firestore()

// Convert from firebase reference to JSON
const jsonParseTags = (tags, game) => {
  return tags.map(async (doc) => {
    const ref = await doc.get()
    return {
      id: doc.id,
      ...ref.data()
    }
  })
}

// Convert from JSON to firebase reference, create if not existing
const objToRefTags = async (tags) => {
  const tagsList = db.collection('videogameTags')
  const refs = tags.map(async (tag) => {
    if (typeof tag === 'string') { // New tag
      console.log('New tag', tag)
      return await tagsList.add({name: tag})
    } else {
      return tagsList.doc(tag.id)
    }
  })
  return Promise.all(refs)
}

const translateGame = async (game) => {
  const {tags, ...data} = game.data()
  const parsedTags = await Promise.all(jsonParseTags(tags, game))
  return {
    id: game.id,
    ...data,
    tags: parsedTags
  }
}

const videogamesController = {
  listVideogames: async (req, res) => {
    try {
      console.log('Request received to list videogames')
      const collection = db.collection('videogames')
      const snapshot = await collection.get()
      const videogameList = snapshot.docs.map(translateGame)
      const videogames = await Promise.all(videogameList)
      console.log('List generated')
      return res.status(200).json({data: videogames})
    } catch (err) {
      console.log('Error list', err)
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
      const {tags = [], ...body} = req.body
      const tagRefs = await objToRefTags(tags);
      await videogameRef.set({
        ...body,
        tags: tagRefs
      })
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
    const collection = db.collection('videogames')
    console.log('Creating a videogame')
    try {
      const {tags = [], ...body} = req.body
      const tagRefs = await objToRefTags(tags);
      const result = await collection.add(body)
      console.log(`Successful creation with id ${result.id}`)
      const newGame = await result.get()
      console.log(newGame)
      const game = await translateGame(newGame)
      return res.status(200).json({
        id: result.id,
        ...game
      })
    } catch (err) {
      console.log('Error creating', {error: err, body: req.body})
      return res.status(500).json({message: err})
    }
  },

  deleteGame: async (req, res) => {
    const {id} = req.params
    const collection = db.collection('videogames')
    console.log(`Deleteing videogame with id ${id}`)
    try {
      const gameRef = collection.doc(id)
      await gameRef.delete()
      console.log('Successful delete')

      // Reload the list of books and return the new one
      const snapshot = await collection.get()
      const videogameList = snapshot.docs.map((game) => {
        const data = game.data()
        return {
          id: game.id,
          ...data
        }
      })
      const videogames = await Promise.all(videogameList)
      return res.status(200).json({data: videogames})
    } catch (err) {
      console.log(`Error while deleting: ${err}`)
      return res.status(500).json({message: err})
    }
  },

  listTags: async (req, res) => {
    try {
      console.log('Request received to list videogame tags')
      const collection = db.collection('videogameTags')
      const snapshot = await collection.get()
      const tags = snapshot.docs.map((tag) => ({
        id: tag.id,
        ...tag.data()
      }));
      return res.status(200).json({data: tags})
    } catch (err) {
      console.log(err)
      return res.status(500).json({message: err})
    }
  },
}

module.exports = videogamesController
