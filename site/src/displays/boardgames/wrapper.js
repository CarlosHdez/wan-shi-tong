import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import BoardgamesShelf from 'displays/boardgames/shelf'
import BoardgamesEditor from 'displays/boardgames/editor'
import 'stylesheets/boardgames/wrapper.scss'

const BoardgamesWrapper = () => {
  const {path} = useRouteMatch()

  return (
    <div className='boardgames--wrapper'>
      <h2>Boardgames</h2>
      <Switch>
        <Route path='*'><BoardgamesShelf /></Route>
      </Switch>
      <Route path={[`${path}/new`, `${path}/:gameId`]}>
        <BoardgamesEditor />
      </Route>
    </div>
  )
}

export default BoardgamesWrapper
