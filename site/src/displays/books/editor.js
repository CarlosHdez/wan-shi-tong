import React, {useState, useEffect} from 'react'
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
import AuthorEditor from 'displays/books/authors'
import {saveBook} from 'api/books'
import 'stylesheets/books/editor.scss'

const initialValues = {
  title: '',
  author: {id: ''},
  description: '',
  tags: '',
  language: '',
  country: '',
  type: '',
  date: '',
  ISBN: '',
  code: '',
  genre: '',
  rating: 0,
  goodreads_link: ''
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

  const onUpdateBook = ({target}) => {
    setBook({
      ...book,
      [target.name]: target.value
    })
  }

  const onRatingChange = (value) => {
    setBook({
      ...book,
      rating: value
    })
  }

  const onUpdateAuthor = ({target}) => {
    setBook({
      ...book,
      author: {
        id: target.value
      }
    })
  }

  const onCancel = () => {
    push('/books')
  }

  const onSave = async () => {
    const val = await saveBook(book)
    let index = books.data.length
    if (bookId) {
      index = books.data.findIndex(({id}) => id === bookId)
    }
    const newData = [
      ...books.data.slice(0, index),
      val,
      ...books.data.slice(index + 1)
    ]
    books.dispatch({type: 'success', data: newData})
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
            name='title'
            className='books-editor__input books-editor--title'
            variant='filled'
            value={book.title}
            onChange={onUpdateBook}
            required
          />
          <div className='books-editor--author'>
            <TextField
              id='book-author'
              label='Author'
              name='author'
              className='books-editor__input'
              variant='filled'
              value={book.author.id}
              onChange={onUpdateAuthor}
              select
              required
            >
              {authorOptions}
            </TextField>
            <Button onClick={onOpenModal} variant='contained'>Add</Button>
          </div>
          <TextField
            label='Description'
            className='books-editor__input books-editor--description'
            variant='filled'
            name='description'
            rows={5}
            value={book.description}
            onChange={onUpdateBook}
            multiline
          />
          <StarRating
            value={book.rating}
            onChange={onRatingChange}
            name='rating'
            className='books-editor--rating'
            editable
          />
          <TextField
            id='book-type'
            label='Type'
            name='type'
            className='books-editor__input books-editor--type'
            variant='filled'
            value={book.type}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-tags'
            label='Tags'
            name='tags'
            className='books-editor__input books-editor--tags'
            variant='filled'
            value={book.tags}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-language'
            label='Language'
            name='language'
            className='books-editor__input books-editor--lang'
            variant='filled'
            value={book.language}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-country'
            label='Country'
            name='country'
            className='books-editor__input books-editor--country'
            variant='filled'
            value={book.country}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-date'
            label='date'
            name='date'
            className='books-editor__input books-editor--date'
            variant='filled'
            type='date'
            value={book.date}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-isbn'
            label='ISBN'
            name='ISBN'
            className='books-editor__input books-editor--isbn'
            variant='filled'
            value={book.ISBN}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-ddc'
            label='DDC'
            name='code'
            className='books-editor__input books-editor--ddc'
            variant='filled'
            value={book.code}
            disabled
          />
          <TextField
            id='book-genre'
            label='Genre'
            name='genre'
            className='books-editor__input books-editor--genre'
            variant='filled'
            value={book.genre}
            onChange={onUpdateBook}
          />
          <TextField
            id='book-link'
            label='Goodreads link'
            name='goodreads_link'
            className='books-editor__input books-editor--link'
            type='url'
            variant='filled'
            value={book.goodreads_link}
            onChange={onUpdateBook}
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
