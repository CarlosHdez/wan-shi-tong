import React, {useState, useEffect} from 'react'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

import FormWrapper from 'components/form'
import StarRating from 'components/star_rating'
import AuthorEditor from 'displays/books/authors'
import 'stylesheets/books/editor.scss'

const initialValues = {
  author: {id: ''},
}

const BookEditor = ({books, authors}) => {
  const [open, setOpen] = useState(false)
  const [book, setBook] = useState(initialValues)
  const {push} = useHistory()
  const {bookId} = useParams()

  useEffect(() => {
    const book = books.data.find(({id}) => id === bookId) || initialValues
    setBook(book)
  }, [bookId, books.data])

  const onCancel = () => {
    // TODO: Confirm and clear form
    push('/books')
  }

  const onSave = () => {
    // TODO: Get form values, send to db and then redirect
    push('/books')
  }

  const onCloseModal = () => setOpen(false)
  const onOpenModal = () => setOpen(true)
  const onSaveAuthor = (author) => {
    const data = [...authors.data, author]
    authors.dispatch({type: 'success', data})
    onCloseModal()
  }

  const authorOptions = authors.data.map(({id, name, surname}) => {
    return <MenuItem value={id} key={id}>{name} {surname}</MenuItem>
  })

  return (
    <>
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
            value={book.title}
          />
          <FormControl className='books-editor__input books-editor--author'>
            <InputLabel id='book-author-label' className='MuiInputLabel-filled'>
              Author
            </InputLabel>
            <div className='books-editor--title'>
              <Select
                id='book-author'
                labelId='book-author-label'
                className='books-editor__input'
                variant='filled'
                value={book.author.id}
              >
                {authorOptions}
              </Select>
              <Button
                onClick={onOpenModal}
                variant='contained'
              >
                Add
              </Button>
            </div>
          </FormControl>
          <TextField
            label='Description'
            className='books-editor__input books-editor--description'
            variant='filled'
            rows={5}
            value={book.description}
            multiline
          />
          <StarRating value={book.rating} className='books-editor--rating'/>
          <TextField
            id='book-type'
            label='Type'
            className='books-editor__input books-editor--type'
            variant='filled'
            value={book.type}
          />
          <TextField
            id='book-tags'
            label='Tags'
            className='books-editor__input books-editor--tags'
            variant='filled'
            value={book.tags}
          />
          <TextField
            id='book-language'
            label='Language'
            className='books-editor__input books-editor--lang'
            variant='filled'
            value={book.language}
          />
          <TextField
            id='book-country'
            label='Country'
            className='books-editor__input books-editor--country'
            variant='filled'
            value={book.country}
          />
          <TextField
            id='book-date'
            label='date'
            className='books-editor__input books-editor--date'
            variant='filled'
            type='date'
            value={book.date}
          />
          <TextField
            id='book-isbn'
            label='ISBN'
            className='books-editor__input books-editor--isbn'
            variant='filled'
            value={book.ISBN}
          />
          <TextField
            id='book-ddc'
            label='DDC'
            className='books-editor__input books-editor--ddc'
            variant='filled'
            disabled
            value={book.code}
          />
          <TextField
            id='book-genre'
            label='Genre'
            className='books-editor__input books-editor--genre'
            variant='filled'
            value={book.genre}
          />
          <TextField
            id='book-link'
            label='Goodreads link'
            className='books-editor__input books-editor--link'
            type='url'
            variant='filled'
            value={book.goodreads_link}
          />
        </div>
      </FormWrapper>
      <AuthorEditor
        open={open}
        onSave={onSaveAuthor}
        onClose={onCloseModal}
      />
    </>
  )
}

export default BookEditor
