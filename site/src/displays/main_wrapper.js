import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import BooksWrapper from 'displays/books/wrapper'
import VideogamesWrapper from 'displays/videogames/wrapper'
import BoardgamesWrapper from 'displays/boardgames/wrapper'
import {BooksProvider} from 'lib/contexts/books'
import {VideogamesProvider} from 'lib/contexts/videogames'
import {BoardgamesProvider} from 'lib/contexts/boardgames'

import 'stylesheets/main_wrapper.scss'

const MainWrapper = () => {
  return (
    <BooksProvider>
      <VideogamesProvider>
        <BoardgamesProvider>
          <div className='main-wrapper'>
            <Switch>
              <Route path='/books'>
                  <BooksWrapper />
              </Route>
              <Route path='/videogames'>
                <VideogamesWrapper />
              </Route>
              <Route path='/boardgames'>
                <BoardgamesWrapper />
              </Route>
              <Route path='*'><Redirect to='/books' /></Route>
            </Switch>
          </div>
        </BoardgamesProvider>
      </VideogamesProvider>
    </BooksProvider>
  )
}

export default MainWrapper
