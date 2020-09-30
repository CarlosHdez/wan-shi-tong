const admin = require('../../setup_firebase')

const db = admin.firestore()

const translateBook = async (book) => {
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
}

const booksController = {
  listBooks: async (req, res) => {
    try {
      const collection = db.collection('books')
      const snapshot = await collection.get()
      const bookList = snapshot.docs.map(translateBook)
      const books = await Promise.all(bookList)
      return res.status(200).json({data: books})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  },

  // TODO: Support partial updates
  updateBook: async (req, res) => {
    const {id} = req.params
    const collection = db.collection('books')
    console.log(`updating book with id ${id}`)
    try {
      const bookRef = collection.doc(id)
      const {author, ...body} = req.body
      const authorRef = db.collection('authors').doc(author)
      const book = {
        ...body,
        author: authorRef
      }
      await bookRef.set(book)
      console.log('successful update')
      const newRef = await collection.doc(id).get()
      const newBook = await translateBook(newRef)
      console.log(newBook)
      return res.status(200).json({
        id,
        ...newBook
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({message: err})
    }
  },

  createBook: async (req, res) => {
    const collection = db.collection('books')
    console.log('Creating a book')
    try {
      const {author, ...body} = req.body
      const authorRef = db.collection('authors').doc(author)
      const book = {
        ...body,
        author: authorRef
      }
      const result = await collection.add(book)
      console.log(`Successful creation with id ${result.id}`)
      const newBook = await result.get()
      const translatedBook = await translateBook(newBook)
      console.log(translatedBook)
      return res.status(200).json({
        id: result.id,
        ...translatedBook
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({message: err})
    }
  }
}

module.exports = booksController
