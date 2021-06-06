import {formatTags} from 'lib/utils'
import {requestCollection, getAPIValues} from 'api/utils'

export const listBoardgames = async () => await requestCollection('boardgames')

export const listDesigners = async () => await requestCollection('designers')

export const saveDesigner = async (designer) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(designer)
  }
  try {
    const request = await fetch(
      `${process.env.REACT_APP_API_HOST}/v1/designers`,
      options
    )
    return await request.json()
  } catch (e) {
    console.log(e)
  }
}

export const saveBoardgame = async (game) => {
  const {designer, mechanics, ...rest} = game
  const gameToSave = {
    ...rest,
    mechanics: formatTags(mechanics),
    designer: designer.id
  }
  const {method, endpoint} = getAPIValues('boardgames', game.id)
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
  }
}

export const deleteBoardgame = async (id) => {
  const {endpoint} = getAPIValues('boardgames', id)
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
