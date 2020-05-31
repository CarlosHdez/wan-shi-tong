const admin = require('../../setup_firebase')

const db = admin.firestore()

const booksController = {
  listBooks: async (req, res) => {
    try {
      const collection = db.collection('books')
      const snapshot = await collection.get()
      const books= snapshot.docs.map((book) => {
        // TODO: Add authors as reference.
        // const data = book.data()
        // const author = await data.author.get()
        // console.log(author)
        return {
          id: book.id,
          // author: author.data(),
          ...book.data()
        }
      })
      // const books = await Promise.all(bookList)
      return res.status(200).json({data: books})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  }
}

module.exports = booksController
