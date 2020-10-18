import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import VideogamesShelf from 'displays/videogames/shelf'
import VideogameEditor from 'displays/videogames/editor'
import 'stylesheets/videogames/wrapper.scss'

const VideogamesWrapper = ({collection}) => {
  const {path} = useRouteMatch()
  return (
    <div className='videogames--wrapper'>
      <h2>Videogames</h2>
      <Switch>
        <Route path={`${path}/new`}>
          <VideogameEditor games={collection} />
        </Route>
        <Route path='*'>
          <VideogamesShelf collection={collection} />
        </Route>
      </Switch>
    </div>
  )
}

export default VideogamesWrapper
