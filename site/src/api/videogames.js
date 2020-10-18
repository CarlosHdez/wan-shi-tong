// TODO: Move to generic file
const requestCollection = async (collection) => {
  const endpoint = `${process.env.REACT_APP_API_HOST}/v1/${collection}`
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}

// TODO: Move to generic file
const getAPIValues = (id) => {
  const baseEndpoint = `${process.env.REACT_APP_API_HOST}/v1/videogames`
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

// TODO: Move to generic file
const formatTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim())
  }
  if (Array.isArray(tags)) {
    return tags
  }
  return []
}

export const listVideogames = async () => await requestCollection('videogames')

export const saveVideogame = async (book) => {
  const {tags, ...rest} = book
  const gameToSave = {
    ...rest,
    tags: formatTags(tags)
  }
  const {method, endpoint} = getAPIValues(book.id)
  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameToSave)
  }
  try {
    const request = await fetch(endpoint, options)
    return await request.json()
  } catch (e) {
    console.log(e)
    return []
  }
}
