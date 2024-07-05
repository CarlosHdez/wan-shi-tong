import {useEffect, useReducer, createContext} from 'react'

import {fetchCollection} from 'api/utils'
import {initialState, collectionReducer} from 'lib/constants'
import {listBooks, listAuthors, listTags} from 'api/books'

export const BooksContext = createContext(null)
export const AuthorsContext = createContext(null)
export const TagsContext = createContext(null)

const Books = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  // TODO: Move back to wrapper with validation for state
  useEffect(() => {
    fetchCollection(listBooks, dispatch)
  }, [])
  return (
    <BooksContext.Provider value={{state, dispatch}}>
      {children}
    </BooksContext.Provider>
  )
}
const Authors = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  useEffect(() => {
    fetchCollection(listAuthors, dispatch)
  }, [])
  return (
    <AuthorsContext.Provider value={{state, dispatch}}>
      {children}
    </AuthorsContext.Provider>
  )
}
const Tags = ({children}) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState)
  useEffect(() => {
    fetchCollection(listTags, dispatch)
  }, [])
  return (
    <TagsContext.Provider value={{state, dispatch}}>
      {children}
    </TagsContext.Provider>
  )
}

export const BooksProvider = ({children}) => {
  return (
    <Books>
      <Authors>
        <Tags>
          {children}
        </Tags>
      </Authors>
    </Books>
  )
}
