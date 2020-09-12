import React from 'react'

import BooksShelf from 'displays/books/shelf'
import BookEditor from 'displays/books/editor'

const BookWrapper = () => {
  return (
    <div className='books-wrapper'>
      <h2>Books</h2>
      <BooksShelf />
      <BookEditor />
    </div>
  )
}

export default BookWrapper
