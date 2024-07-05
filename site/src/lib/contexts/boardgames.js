import {useEffect, useReducer, createContext} from 'react'

import {fetchCollection} from 'api/utils'
import {initialState, collectionReducer} from 'lib/constants'
import {listBoardgames, listDesigners, listMechanics} from 'api/boardgames'

export const BoardgamesContext = createContext(null)
export const DesignersContext = createContext(null)
export const MechanicsContext = createContext(null)

const Boardgames = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  // TODO: Move back to wrapper with validation for state
  useEffect(() => {
    fetchCollection(listBoardgames, dispatch)
  }, [])
  return (
    <BoardgamesContext.Provider value={{state, dispatch}}>
      {children}
    </BoardgamesContext.Provider>
  )
}
const Designers = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  useEffect(() => {
    fetchCollection(listDesigners, dispatch)
  }, [])
  return (
    <DesignersContext.Provider value={{state, dispatch}}>
      {children}
    </DesignersContext.Provider>
  )
}
const Mechanics = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  useEffect(() => {
    fetchCollection(listMechanics, dispatch)
  }, [])
  return (
    <MechanicsContext.Provider value={{state, dispatch}}>
      {children}
    </MechanicsContext.Provider>
  )
}

export const BoardgamesProvider = ({children}) => {
  return (
    <Boardgames>
      <Designers>
        <Mechanics>
          {children}
        </Mechanics>
      </Designers>
    </Boardgames>
  )
}
