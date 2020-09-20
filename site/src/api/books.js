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
