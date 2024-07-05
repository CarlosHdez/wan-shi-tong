import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import VideogamesShelf from 'displays/videogames/shelf'
import VideogameEditor from 'displays/videogames/editor'
import 'stylesheets/videogames/wrapper.scss'

const VideogamesWrapper = () => {
  const {path} = useRouteMatch()
  return (
    <div className='videogames--wrapper'>
      <h2>Videogames</h2>
      <Switch>
        <Route path='*'>
          <VideogamesShelf />
        </Route>
      </Switch>
      <Route path={[`${path}/new`, `${path}/:videogameId`]}>
        <VideogameEditor />
      </Route>
    </div>
  )
}

export default VideogamesWrapper
