import React from 'react'
import {useHistory} from 'react-router-dom'
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
import 'stylesheets/books/editor.scss'

const BookEditor = ({authors}) => {
  const {push} = useHistory()

  const onCancel = () => {
    // TODO: Confirm and clear form
    push('/books')
  }

  const onSave = () => {
    // TODO: Get form values, send to db and then redirect
    push('/books')
  }

  const authorOptions = authors.data.map(({id, name, surname}) => {
    return <MenuItem value={id} key={id}>{name} {surname}</MenuItem>
  })

  return (
    <FormWrapper
      wrapperClass='books-editor'
      onCancel={onCancel}
      onSave={onSave}
      hasControls
    >
      <div className='books-editor__grid'>
        <TextField
          id='book-title'
          label='Title'
          className='books-editor__input books-editor--title'
          variant='filled'
        />
        <FormControl className='books-editor__input books-editor--author'>
          <InputLabel
            id='book-author-label'
            className='MuiInputLabel-filled'
          >
            Author
          </InputLabel>
          <Select
            id='book-author'
            labelId='book-author-label'
            className='books-editor__input books-editor--title'
            variant='filled'
          >
          </Select>
        </FormControl>
        <TextField
          label='Description'
          className='books-editor__input books-editor--description'
          variant='filled'
          rows={5}
          multiline
        />
        <StarRating value={3} className='books-editor--rating'/>
        <TextField
          id='book-tags'
          label='Tags'
          className='books-editor__input books-editor--tags'
          variant='filled'
        />
        <TextField
          id='book-language'
          label='Language'
          className='books-editor__input books-editor--lang'
          variant='filled'
        />
        <TextField
          id='book-country'
          label='Country'
          className='books-editor__input books-editor--country'
          variant='filled'
        />
        <TextField
          id='book-year'
          label='Year'
          className='books-editor__input books-editor--year'
          variant='filled'
          type='month'
        />
        <TextField
          id='book-isbn'
          label='ISBN'
          className='books-editor__input books-editor--isbn'
          variant='filled'
        />
        <TextField
          id='book-ddc'
          label='DDC'
          className='books-editor__input books-editor--ddc'
          variant='filled'
          disabled
        />
        <TextField
          id='book-genre'
          label='Genre'
          className='books-editor__input books-editor--genre'
          variant='filled'
        />
        <TextField
          id='book-link'
          label='Goodreads link'
          className='books-editor__input books-editor--link'
          type='url'
          variant='filled'
        />
      </div>
    </FormWrapper>
  )
}

export default BookEditor
