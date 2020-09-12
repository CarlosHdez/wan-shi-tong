import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import BooksShelf from 'displays/books/shelf'
import BookEditor from 'displays/books/editor'

import 'stylesheets/books/wrapper.scss'

const BookWrapper = () => {
  const {path} = useRouteMatch()
  return (
    <div className='books-wrapper'>
      <h2>Books</h2>
      <Switch>
        <Route path={`${path}/new`}>
          <BookEditor />
        </Route>
        <Route path={`${path}/:bookId`}>
          <BookEditor />
        </Route>
        <Route path='*'>
          <BooksShelf />
        </Route>
      </Switch>
    </div>
  )
}

export default BookWrapper
