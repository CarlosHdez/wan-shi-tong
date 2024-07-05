import {useState, useMemo, useEffect, useCallback, useContext} from 'react'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  MenuItem
} from '@mui/material'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
import AuthorEditor from 'displays/books/authors'
import useForm from 'hooks/useForm'
import {
  BoardgamesContext,
  DesignersContext,
  MechanicsContext
} from 'lib/contexts/boardgames'
import {TagInput} from 'components/tag_input'
import {saveBoardgame, saveDesigner} from 'api/boardgames'
import 'stylesheets/boardgames/editor.scss'

const initialValues = {
  name: '',
  designer: {id: ''},
  type: '',
  rating: 0,
  players: {min: 0, max: 0},
  mechanics: [],
  language: '',
  publisher: '',
  link: ''
}

const validator = ({name, designer}) => {
  const errors = {}
  if (!name) {
    errors.name = true
  }
  if (!designer || !designer.id) {
    errors.designer = true
  }
  return errors
}

const BoardgameEditor = () => {
  const {
    state: games,
    dispatch: gamesDispatch
  } = useContext(BoardgamesContext)
  const {
    state: designers,
    dispatch: designersDispatch
  } = useContext(DesignersContext)
  const {state: mechanics} = useContext(MechanicsContext)
  const [isModalOpen, setModalOpen] = useState(false)
  const [game, setGame] = useState(initialValues)
  const {push} = useHistory()
  const {gameId} = useParams()

  useEffect(() => {
    const game = games.data.find(({id}) => id === gameId) || initialValues
    setGame(game)
  }, [gameId, games.data])

  const onCancel = () => push('/boardgames')
  const onSave = async (values) => {
    const val = await saveBoardgame(values)
    let index = games.data.length
    if (gameId) {
      index = games.data.findIndex(({id}) => id === gameId)
    }
    // TODO: Update mechanics list if new one was added
    const newData = [
      ...games.data.slice(0, index),
      val,
      ...games.data.slice(index + 1)
    ]
    gamesDispatch({type: 'success', data: newData})
    push('/boardgames')
  }

  const {values, onChange, handleSubmit, valid, saving} = useForm({
    onSave,
    initialValues: game,
    validator: useCallback(validator, [])
  })

  const onUpdateDesigner = ({target}) => {
    onChange({
      target: {
        name: 'designer',
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

  const onMechanicsChange = (value) => {
    onChange({
      target: {
        name: 'mechanics',
        value
      }
    })
  }

  const designerOptions = useMemo(() => {
    return designers.data.map(({id, name, surname}) => {
      const key = `${name}-${surname}-${id}`
      return <MenuItem value={id} key={key}>{name} {surname}</MenuItem>
    }).sort((a, b) => a.key < b.key ? -1 : 1)
  }, [designers.data])

  const onOpenModal = () => setModalOpen(true)
  const onCloseModal = () => setModalOpen(false)
  const onSaveDesigner = (designer) => {
    const data = [...designers.data, designer]
    designersDispatch({type: 'success', data})
    onUpdateDesigner({target: {value: designer.id}})
    onCloseModal()
  }

  return (
    <Dialog
      aria-labelledby='boardgames-editor-dialog'
      className='editor-dialog'
      onClose={onCancel}
      open
    >
      <DialogTitle id='boardgames-editor-dialog'>
        {game.id ? `Edit ${game.name}` : 'New boardgame'}
      </DialogTitle>
      <FormWrapper
        onCancel={onCancel}
        onSave={handleSubmit}
        canSave={valid && !saving}
        saving={saving}
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
            id='game-designer'
            label='Designer'
            name='designer'
            variant='filled'
            value={values.designer.id}
            onChange={onUpdateDesigner}
            select
            required
          >
            {designerOptions}
          </TextField>
          <Button onClick={onOpenModal} variant='contained'>Add</Button>
        </div>
        <TextField
          id='game-type'
          label='Type'
          name='type'
          className='game-editor--type'
          variant='filled'
          value={values.type}
          onChange={onChange}
        />
        <TextField
          id='game-language'
          label='Language'
          name='language'
          className='game-editor--language'
          variant='filled'
          value={values.language}
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
        <TextField
          id='game-publisher'
          label='Publisher'
          name='publisher'
          className='game-editor--publisher'
          variant='filled'
          value={values.publisher}
          onChange={onChange}
        />
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
            value={values.players.max}
          />
        </div>
        <StarRating
          value={values.rating}
          onChange={onRatingChange}
          name='rating'
          className='game-editor--rating'
          editable
        />
        <TagInput
          id='game-mechanics'
          label='Mechanics'
          name='mechanics'
          wrapperClass='game-editor--mechanics'
          variant='filled'
          options={mechanics.data}
          value={values.mechanics}
          onChange={onMechanicsChange}
        />
      </FormWrapper>
      <AuthorEditor
        open={isModalOpen}
        onSave={onSaveDesigner}
        onClose={onCloseModal}
        apiSave={saveDesigner}
        title='New Designer'
      />
    </Dialog>
  )
}

export default BoardgameEditor
