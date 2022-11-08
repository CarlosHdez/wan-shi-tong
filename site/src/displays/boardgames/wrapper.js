import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import BoardgamesShelf from 'displays/boardgames/shelf'
import BoardgamesEditor from 'displays/boardgames/editor'
import {listDesigners} from 'api/boardgames'
import {useCollection} from 'hooks/useCollection'
import 'stylesheets/boardgames/wrapper.scss'

const BoardgamesWrapper = ({collection}) => {
  const designers = useCollection(listDesigners)
  const {path} = useRouteMatch()
  return (
    <div className='boardgames--wrapper'>
      <h2>Boardgames</h2>
      <Switch>
        <Route path={[`${path}/new`, `${path}/:gameId`]}>
          <BoardgamesEditor games={collection} designers={designers} />
        </Route>
        <Route path='*'>
          <BoardgamesShelf collection={collection} />
        </Route>
      </Switch>
    </div>
  )
}

export default BoardgamesWrapper
