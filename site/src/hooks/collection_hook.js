import {useReducer, useEffect} from 'react'

const NEVER_REQUESTED = 'neverRequested'
const SUCCESS = 'success'
const LOADING = 'loading'
const ERROR = 'error'

const initialState = {
  data: [],
  error: '',
  status: NEVER_REQUESTED
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        status: LOADING,
        error: '',
        data: []
      }
    case SUCCESS:
      return {
        status: SUCCESS,
        error: '',
        data: action.data
      }
    case ERROR:
      return {
        status: ERROR,
        error: action.error,
        data: []
      }
    case NEVER_REQUESTED:
    default:
      return initialState
  }
}

export const useCollection = (fetchAction) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // TODO add cleanup
    const requestData = async () => {
      try {
        dispatch({type:LOADING})
        const response = await fetchAction()
        dispatch({type: SUCCESS, data: response})
      } catch (err) {
        dispatch({type: ERROR, error: err})
      }
    }
    if (state.status === NEVER_REQUESTED) {
      requestData()
    }
  }, [state.status, fetchAction])

  return {
    dispatch,
    ...state
  }
}

