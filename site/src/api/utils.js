export const requestCollection = async (collection) => {
  const endpoint = `${process.env.REACT_APP_API_HOST}/v1/${collection}`
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}

export const getAPIValues = (collection, id) => {
  const baseEndpoint = `${process.env.REACT_APP_API_HOST}/v1/${collection}`
  if (id) {
    return {
      method: 'PUT',
      endpoint: `${baseEndpoint}/${id}`
    }
  }
  return {
    method: 'POST',
    endpoint: baseEndpoint
  }
}

const SUCCESS = 'success'
const LOADING = 'loading'
const ERROR = 'error'
// TODO: Use middleware ?
export const fetchCollection = async (fetchAction, dispatch) => {
  try {
    dispatch({type:LOADING})
    const response = await fetchAction()
    dispatch({type: SUCCESS, data: response})
  } catch (err) {
    dispatch({type: ERROR, error: err})
  }
}
