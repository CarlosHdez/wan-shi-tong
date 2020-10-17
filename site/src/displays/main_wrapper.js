import React from 'react'
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import BooksWrapper from 'displays/books/wrapper'
import VideogamesWrapper from 'displays/videogames/wrapper'
import {listBooks} from 'api/books'
import {useCollection} from 'hooks/collection_hook'

import 'stylesheets/main_wrapper.scss'

const MainWrapper = () => {
  const books = useCollection(listBooks)
  return (
    <div className='main-wrapper'>
      <Switch>
        <Route path='/books'>
          <BooksWrapper collection={books} />
        </Route>
        <Route path='/videogames'>
          <VideogamesWrapper collection={[]} />
        </Route>
        <Route path='/boardgames'>
          <div>board games</div>
        </Route>
        <Route path='*'><Redirect to='/books' /></Route>
      </Switch>
    </div>
  )
}

export default MainWrapper
