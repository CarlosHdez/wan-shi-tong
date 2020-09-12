import React from 'react'
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import BooksWrapper from 'displays/books/wrapper'

import 'stylesheets/main_wrapper.scss'

const MainWrapper = () => {
  return (
    <div className='main-wrapper'>
      <Switch>
        <Route path='/books'>
          <BooksWrapper />
        </Route>
        <Route path='/videogames'>
          <div>Video games</div>
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
