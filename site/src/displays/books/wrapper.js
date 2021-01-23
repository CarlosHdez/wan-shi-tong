import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import BooksShelf from 'displays/books/shelf'
import BookEditor from 'displays/books/editor'
import {listAuthors} from 'api/books'
import {useCollection} from 'hooks/collection_hook'

import 'stylesheets/books/wrapper.scss'

const BookWrapper = ({collection}) => {
  const authors = useCollection(listAuthors)
  const {path} = useRouteMatch()
  return (
    <div className='books-wrapper'>
      <h2>Books</h2>
      <Switch>
        <Route path={[`${path}/new`, `${path}/:bookId`]}>
          <BookEditor books={collection} authors={authors} />
        </Route>
        <Route path='*'>
          <BooksShelf collection={collection} />
        </Route>
      </Switch>
    </div>
  )
}

export default BookWrapper
