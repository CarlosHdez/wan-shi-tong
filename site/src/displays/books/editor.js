import React from 'react'
import {TextField} from '@material-ui/core'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
import 'stylesheets/books/editor.scss'

const BookEditor = () => {
  return (
    <FormWrapper
      wrapperClass='books-editor'
      hasControls
    >
      <div className='books-editor__grid'>
        <TextField
          id='book-title'
          label='Title'
          className='books-editor__input books-editor--title'
          variant='filled'
        />
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
