const requestCollection = async (collection) => {
  const endpoint = `${process.env.REACT_APP_API_HOST}/v1/${collection}`
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}

export const listBooks = async () => await requestCollection('books')

export const listAuthors = async () => await requestCollection('authors')

export const saveAuthor = async (author) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(author)
  }
  try {
    const request = await fetch(
      `${process.env.REACT_APP_API_HOST}/v1/authors`,
      options
    )
    return await request.json()
  } catch (e) {
    console.log(e)
  }
}

const getAPIValues = (id) => {
  const baseEndpoint = `${process.env.REACT_APP_API_HOST}/v1/books`
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

const formatTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim())
  }
  return
}

export const saveBook = async (book) => {
  const {author, tags, ...rest} = book
  const bookToSave = {
    ...rest,
    tags: formatTags(tags),
    author: author.id
  }
  const {method, endpoint} = getAPIValues(book.id)
  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookToSave)
  }
  try {
    const request = await fetch(endpoint, options)
    return await request.json()
  } catch (e) {
    console.log(e)
  }
}
