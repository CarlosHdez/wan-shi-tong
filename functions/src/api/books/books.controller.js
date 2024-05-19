const admin = require('../../setup_firebase')

const db = admin.firestore()

// Convert from firebase reference to JSON
const jsonParseTags = (tags ) => {
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
  const tagsList = db.collection('bookTags')
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

const translateBook = async (book) => {
  const {author, tags, ...data} = book.data()
  const authorRef = await author.get()
  const parsedTags = await Promise.all(jsonParseTags(tags))
  return {
    id: book.id,
    ...data,
    tags: parsedTags,
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
      console.log(err)
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
      const {author, tags = [], ...body} = req.body
      const tagRefs = await objToRefTags(tags);
      const authorRef = db.collection('authors').doc(author)
      const book = {
        ...body,
        author: authorRef,
        tags: tagRefs
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
      const {author, tags = [], ...body} = req.body
      const authorRef = db.collection('authors').doc(author)
      const tagRefs = await objToRefTags(tags);
      const book = {
        ...body,
        author: authorRef,
        tags: tagRefs
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
  },

  deleteBook: async (req, res) => {
    const {id} = req.params
    const collection = db.collection('books')
    console.log(`Deleteing book with id ${id}`)
    try {
      const bookRef = collection.doc(id)
      await bookRef.delete()
      console.log('Successful delete')

      // Reload the list of books and return the new one
      const snapshot = await collection.get()
      const bookList = snapshot.docs.map(translateBook)
      const books = await Promise.all(bookList)
      return res.status(200).json({data: books})
    } catch (err) {
      console.log(`Error while deleting: ${err}`)
      return res.status(500).json({message: err})
    }
  },

  listTags: async (req, res) => {
    try {
      console.log('Request received to list tags')
      const collection = db.collection('bookTags')
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
  }
}

module.exports = booksController
