import {useEffect, useReducer, createContext} from 'react'

import {fetchCollection} from 'api/utils'
import {initialState, collectionReducer} from 'lib/constants'
import {listVideogames, listVideogameTags} from 'api/videogames'

export const VideogamesContext = createContext(null)
export const VideogameTagsContext = createContext(null)

const Games = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  // TODO: Move back to wrapper with validation for state
  useEffect(() => {
    fetchCollection(listVideogames, dispatch)
  }, [])
  return (
    <VideogamesContext.Provider value={{state, dispatch}}>
      {children}
    </VideogamesContext.Provider>
  )
}
const Tags = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  useEffect(() => {
    fetchCollection(listVideogameTags, dispatch)
  }, [])
  return (
    <VideogameTagsContext.Provider value={{state, dispatch}}>
      {children}
    </VideogameTagsContext.Provider>
  )
}

export const VideogamesProvider = ({children}) => {
  return (
    <Games>
      <Tags>
        {children}
      </Tags>
    </Games>
  )
}
