const endpoint = `${process.env.REACT_APP_API_HOST}/v1/books`

export const listBooks = async () => {
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}

export const listAuthors = async () => {
  const endpoint = `${process.env.REACT_APP_API_HOST}/v1/authors`
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}
