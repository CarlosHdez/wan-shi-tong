import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import BooksWrapper from 'displays/books/wrapper'
import VideogamesWrapper from 'displays/videogames/wrapper'
import BoardgamesWrapper from 'displays/boardgames/wrapper'
import {listBooks} from 'api/books'
import {listVideogames} from 'api/videogames'
import {listBoardgames} from 'api/boardgames'
import {useCollection} from 'hooks/useCollection'

import 'stylesheets/main_wrapper.scss'

const MainWrapper = () => {
  const books = useCollection(listBooks)
  const videogames = useCollection(listVideogames)
  const boardgames = useCollection(listBoardgames)
  return (
    <div className='main-wrapper'>
      <Switch>
        <Route path='/books'>
          <BooksWrapper collection={books} />
        </Route>
        <Route path='/videogames'>
          <VideogamesWrapper collection={videogames} />
        </Route>
        <Route path='/boardgames'>
          <BoardgamesWrapper collection={boardgames} />
        </Route>
        <Route path='*'><Redirect to='/books' /></Route>
      </Switch>
    </div>
  )
}

export default MainWrapper
