const endpoint = `${process.env.REACT_APP_API_HOST}/v1/books`

export const listBooks = async () => {
  const request = await fetch(endpoint)
  const {data} = await request.json()
  return data
}
