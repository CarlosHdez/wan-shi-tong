const admin = require('../../setup_firebase')

const db = admin.firestore()

const booksController = {
  listBooks: async (req, res) => {
    try {
      const collection = db.collection('books')
      const snapshot = await collection.get()
      const bookList = snapshot.docs.map(async (book) => {
        const {author, ...data} = book.data()
        const authorRef = await author.get()
        return {
          id: book.id,
          ...data,
          author: {
            id: author.id,
            ...authorRef.data()
          }
        }
      })
      const books = await Promise.all(bookList)
      return res.status(200).json({data: books})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  }
}

module.exports = booksController
