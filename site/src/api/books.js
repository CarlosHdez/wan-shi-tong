import {formatTags} from 'lib/utils'
import {requestCollection, getAPIValues} from 'api/utils'

export const listBooks = async () => await requestCollection('books')

export const listAuthors = async () => await requestCollection('authors')
export const listTags = async () => await requestCollection('bookTags')

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

export const saveBook = async (book) => {
  const {author, tags, ...rest} = book
  const bookToSave = {
    ...rest,
    tags: formatTags(tags),
    author: author.id
  }
  const {method, endpoint} = getAPIValues('books', book.id)
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

export const deleteBook = async (id) => {
  const {endpoint} = getAPIValues('books', id)
  const options = {
    method: 'delete',
    mode: 'cors'
  }
  try {
    const request = await fetch(endpoint, options)
    return await request.json()
  } catch (e) {
    console.log(e)
  }
}
