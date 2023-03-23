import React, {useState, useEffect, useCallback} from 'react'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@material-ui/core'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
import TagInput from 'components/tag_input'
import useForm from 'hooks/useForm'
import {saveVideogame} from 'api/videogames'
import {PLATFORMS} from 'lib/constants'
import 'stylesheets/videogames/editor.scss'

const initialValues = {
  name: '',
  company: '',
  genre: '',
  platform: '',
  notes: '',
  completion: 0,
  rating: 0,
  isPhysical: true,
  tags: []
}

const videogameValidator = ({name, platform}) => {
  const errors = {}
  if (!name) {
    errors.name = true
  }
  if (!platform) {
    errors.platform = true
  }
  return errors
}

const VideogameEditor = ({games}) => {
  const [videogame, setVideogame] = useState(initialValues)
  const {push} = useHistory()
  const {videogameId} = useParams()

  useEffect(() => {
    const game = games.data.find(({id}) => id === videogameId) || initialValues
    setVideogame(game)
  }, [videogameId, games.data])

  const onRatingChange = (value) => {
    onChange({target: {name: 'rating', value}})
  }

  const onTagChange = (value) => {
    onChange({
      target: {
        name: 'tags',
        value
      }
    })
  }

  const onCompletionChange = ({target}) => {
    onChange({
      target: {
        name: 'completion',
        value: Number(target.value) / 100
      }
    })
  }

  const onFormatChange = ({target}) => {
    onChange({target: {name: 'isPhysical', value: target.checked}})
  }

  const onCancel = () => {
    push('/videogames')
  }

  const onSave = async (values) => {
    const val = await saveVideogame(values)
    let index = games.data.length
    if (videogameId) {
      index = games.data.findIndex(({id}) => id === videogameId)
    }
    const newData = [
      ...games.data.slice(0, index),
      val,
      ...games.data.slice(index + 1)
    ]
    games.dispatch({type: 'success', data: newData})
    push('/videogames')
  }

  const {values, onChange, handleSubmit, valid, saving} = useForm({
    onSave,
    initialValues: videogame,
    validator: useCallback(videogameValidator, [])
  })

  const platforms = PLATFORMS
    .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)

  return (
    <FormWrapper
      wrapperClass='videogames__editor'
      onCancel={onCancel}
      onSave={handleSubmit}
      canSave={valid || !saving}
      saving={saving}
      hasControls
    >
      <TextField
        id='videogame__name'
        label='Name'
        name='name'
        className='editor__input videogames__editor__name'
        variant='filled'
        value={values.name}
        onChange={onChange}
        autoFocus
        required
      />
      <TextField
        id='videogame__platform'
        label='Platform'
        name='platform'
        className='editor__input videogames__editor__platform'
        variant='filled'
        value={values.platform}
        onChange={onChange}
        select
        required
      >
        {platforms}
      </TextField>
      <TextField
        id='videogame__genre'
        label='Genre'
        name='genre'
        className='editor__input videogames__editor__genre'
        variant='filled'
        value={values.genre}
        onChange={onChange}
      />
      <TextField
        id='videogame__company'
        label='Company'
        name='company'
        className='editor__input videogames__editor__company'
        variant='filled'
        value={values.company}
        onChange={onChange}
      />
      <TextField
        label='Notes'
        className='editor__input videogames__editor__notes'
        variant='filled'
        name='notes'
        rows={3}
        value={values.notes}
        onChange={onChange}
        multiline
      />
      <TagInput
        id='videogame__tags'
        label='Tags'
        name='tags'
        wrapperClass='videogames__editor__tags'
        inputClass='editor__input'
        variant='filled'
        value={values.tags}
        onChange={onTagChange}
      />
      <TextField
        id='videogame__completion'
        label='Completion'
        name='completion'
        className='editor__input videogames__editor__completion'
        variant='filled'
        type='number'
        inputProps={{min: 0}}
        value={Math.round(values.completion * 100)}
        onChange={onCompletionChange}
        InputProps={{
          endAdornment: <InputAdornment position='end'>%</InputAdornment>
        }}
      />
      <StarRating
        value={values.rating}
        onChange={onRatingChange}
        name='rating'
        className='videogames__editor__rating'
        editable
      />
      <FormControlLabel
        label='Physical copy'
        className='editor__input videogames__editor__format'
        control={
          <Checkbox
            id='videogame__format'
            name='isPhysical'
            color='primary'
            checked={values.isPhysical}
            onChange={onFormatChange}
          />
        }
      />
    </FormWrapper>
  )
}

export default VideogameEditor
