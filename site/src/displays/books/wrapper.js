import React from 'react'

import BooksShelf from 'displays/books/shelf'

const BookWrapper = () => {
  return (
    <div className='books-wrapper'>
      <h2>Books</h2>
      {/* TODO: Add form to create new shelfs */}
      <BooksShelf />
    </div>
  )
}

export default BookWrapper
