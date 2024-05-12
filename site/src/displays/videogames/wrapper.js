import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import VideogamesShelf from 'displays/videogames/shelf'
import VideogameEditor from 'displays/videogames/editor'
import {useCollection} from 'hooks/useCollection'
import {listVideogameTags} from 'api/videogames'
import 'stylesheets/videogames/wrapper.scss'

const VideogamesWrapper = ({collection}) => {
  const {path} = useRouteMatch()
  const tags = useCollection(listVideogameTags)
  return (
    <div className='videogames--wrapper'>
      <h2>Videogames</h2>
      <Switch>
        <Route path='*'>
          <VideogamesShelf collection={collection} />
        </Route>
      </Switch>
      <Route path={[`${path}/new`, `${path}/:videogameId`]}>
        <VideogameEditor games={collection} tags={tags} />
      </Route>
    </div>
  )
}

export default VideogamesWrapper
