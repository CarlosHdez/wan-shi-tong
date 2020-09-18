const admin = require('../../setup_firebase')

const db = admin.firestore()

const authorsController = {
  listAuthors: async (req, res) => {
    try {
      const collection = db.collection('authors')
      const snapshot = await collection.get()
      const authors = snapshot.docs.map((author) => {
        return {
          id: author.id,
          ...author.data(),
        }
      })
      return res.status(200).json({data: authors})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  }
}

module.exports = authorsController
