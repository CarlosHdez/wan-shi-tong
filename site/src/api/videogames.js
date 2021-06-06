import {formatTags} from 'lib/utils'
import {requestCollection, getAPIValues} from 'api/utils'

export const listVideogames = async () => await requestCollection('videogames')

export const saveVideogame = async (game) => {
  const {tags, ...rest} = game
  const gameToSave = {
    ...rest,
    tags: formatTags(tags)
  }
  const {method, endpoint} = getAPIValues('videogames', game.id)
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

export const deleteVideogame = async (id) => {
  const {endpoint} = getAPIValues('videogames', id)
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
