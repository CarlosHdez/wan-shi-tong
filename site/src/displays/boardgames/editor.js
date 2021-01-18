import React, {useState, useEffect, useCallback} from 'react'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  Button,
  TextField,
  MenuItem
} from '@material-ui/core'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
// import AuthorEditor from 'displays/books/authors'
import useForm from 'hooks/useForm'
// import {saveBook} from 'api/books'
import 'stylesheets/boardgames/editor.scss'

const initialValues = {
  name: '',
  author: {id: ''},
  type: '',
  rating: 0,
  players: {min: 0, max: 0},
  mechanics: '',
  language: '',
  link: ''
}

const validator = ({name, author}) => {
  const errors = {}
  if (!name) {
    errors.name = true
  }
  if (!author || !author.id) {
    errors.author = true
  }
  return errors
}

const BoardgameEditor = ({games}) => {
  const [game, setGame] = useState(initialValues)
  const {push} = useHistory()
  const {gameId} = useParams()

  const onCancel = () => push('/boardgames')
  const onSave = (values) => {
    console.log(values)
    // const val = await saveBook(values)
    // let index = books.data.length
    // if (bookId) {
    //   index = books.data.findIndex(({id}) => id === bookId)
    // }
    // const newData = [
    //   ...books.data.slice(0, index),
    //   val,
    //   ...books.data.slice(index + 1)
    // ]
    // books.dispatch({type: 'success', data: newData})
    // push('/books')
  }

  const {values, onChange, handleSubmit, valid} = useForm({
    onSave,
    initialValues: game,
    validator: useCallback(validator, [])
  })

  const onUpdateAuthor = ({target}) => {
    onChange({
      target: {
        name: 'author',
        value: {id: target.value}
      }
    })
  }

  const onUpdatePlayers = ({target}) => {
    onChange({
      target: {
        name: 'players',
        value: {
          ...values.players,
          [target.name]: target.value
        }
      }
    })
  }

  const onRatingChange = (value) => {
    onChange({
      target: {
        name: 'rating',
        value
      }
    })
  }

  const onOpenModal = () => {}

  return (
    <>
      <FormWrapper
        onCancel={onCancel}
        onSave={handleSubmit}
        valid={valid}
        wrapperClass='game-editor'
        hasControls
      >
        <TextField
          id='game-name'
          label='Name'
          name='name'
          className='game-editor--name'
          variant='filled'
          value={values.name}
          onChange={onChange}
          autoFocus
          required
        />
        <div className='game-editor--author'>
          <TextField
            id='game-author'
            label='Author'
            name='author'
            variant='filled'
            value={values.author.id}
            onChange={onUpdateAuthor}
            select
            required
          >
          </TextField>
          <Button onClick={onOpenModal} variant='contained'>Add</Button>
        </div>
        <div className='game-editor--players'>
          <label>Players</label>
          <TextField
            id='game-players-min'
            className='players--min'
            type='number'
            label='Min'
            variant='filled'
            name='min'
            placeholder='Min'
            onChange={onUpdatePlayers}
            value={values.players.min}
          />
          <TextField
            id='game-players-max'
            className='players--max'
            type='number'
            label='Max'
            variant='filled'
            name='max'
            placeholder='Max'
            onChange={onUpdatePlayers}
            value={values.players.min}
          />
        </div>
        <StarRating
          value={values.rating}
          onChange={onRatingChange}
          name='rating'
          className='game-editor--rating'
          editable
        />
        <TextField
          id='game-name'
          label='Type'
          name='type'
          className='game-editor--type'
          variant='filled'
          value={values.type}
          onChange={onChange}
        />
        <TextField
          id='game-mechanics'
          label='Mechanics'
          name='mechanics'
          className='game-editor--mechancis'
          variant='filled'
          value={values.mechanics}
          onChange={onChange}
        />
        <TextField
          id='game-link'
          label='BGG Link'
          name='link'
          className='game-editor--link'
          variant='filled'
          value={values.link}
          onChange={onChange}
        />
      </FormWrapper>
    </>
  )
}

export default BoardgameEditor
