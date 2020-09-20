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
  },

  saveAuthor: async (req, res) => {
    const {name, surname} = req.body
    const newAuthor = await db.collection('authors').add({name, surname})
    console.log(`Added author ${name} ${surname}, with id ${newAuthor.id}`)
    const result = await newAuthor.get()
    return res.status(200).json({
      id: newAuthor.id,
      ...result.data()
    })
  }
}

module.exports = authorsController
