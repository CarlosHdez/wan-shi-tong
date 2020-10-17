import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import VideogamesShelf from 'displays/videogames/shelf'

const VideogamesWrapper = () => {
  return (
    <div className='videogames--wrapper'>
      <h2>Videogames</h2>
      <Switch>
        <Route path='*'>
          <VideogamesShelf />
        </Route>
      </Switch>
    </div>
  )
}

export default VideogamesWrapper
