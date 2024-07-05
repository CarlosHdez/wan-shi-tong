import {useState, useEffect, useMemo, useCallback, useContext} from 'react'
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
import {BooksContext, AuthorsContext, TagsContext} from 'lib/contexts/books'
import {TagInput} from 'components/tag_input'
import {saveBook, saveAuthor} from 'api/books'
import 'stylesheets/books/editor.scss'

const initialValues = {
  title: '',
  author: {id: ''},
  description: '',
  tags: [],
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

const bookValidator = (values) => {
  const errors = {}
  if (!values.title) {
    errors.title = true
  }
  if (!values.author || !values.author.id) {
    errors.author = true
  }
  return errors
}

const TypeOptions = [
  <MenuItem key='hc' value='Hardcover'>Hardcover</MenuItem>,
  <MenuItem key='pb' value='Paperback'>Paperback</MenuItem>,
  <MenuItem key='eb' value='Ebook'>eBook</MenuItem>,
  <MenuItem key='cm' value='Comic'>Comic</MenuItem>
]
const LanguageOptions = [
  <MenuItem key='en' value='English'>English</MenuItem>,
  <MenuItem key='es' value='Español'>Español</MenuItem>
]

const BookEditor = () => {
  const books = useContext(BooksContext)
  const authors = useContext(AuthorsContext)
  const tags = useContext(TagsContext)
  const [open, setOpen] = useState(false)
  const [book, setBook] = useState(initialValues)
  const {push} = useHistory()
  const {bookId} = useParams()

  useEffect(() => {
    const book = books.state.data.find(({id}) => id === bookId) || initialValues
    setBook(book)
  }, [bookId, books.state.data])

  const onRatingChange = (value) => {
    onChange({
      target: {
        name: 'rating',
        value
      }
    })
  }

  const onTagChange = (value) => {
    onChange({
      target: {
        name: 'tags',
        value
      }
    })
  }

  const onUpdateAuthor = ({target}) => {
    onChange({
      target: {
        name: 'author',
        value: {id: target.value}
      }
    })
  }

  const onCancel = () => push('/books')

  const onSave = async (values) => {
    const val = await saveBook(values)
    let index = books.state.data.length
    if (bookId) {
      index = books.state.data.findIndex(({id}) => id === bookId)
    }
    const newData = [
      ...books.state.data.slice(0, index),
      val,
      ...books.state.data.slice(index + 1)
    ]
    books.dispatch({type: 'success', data: newData})
    push('/books')
  }

  const {
    values,
    onChange,
    handleSubmit,
    valid,
    saving
  } = useForm({
    initialValues: book,
    onSave,
    validator: useCallback(bookValidator, [])
  })

  const onCloseModal = () => setOpen(false)
  const onOpenModal = () => setOpen(true)
  const onSaveAuthor = (author) => {
    const data = [...authors.state.data, author]
    authors.dispatch({type: 'success', data})
    onUpdateAuthor({target: {value: author.id}})
    onCloseModal()
  }

  const authorOptions = useMemo(() => {
    return authors.state.data.map(({id, name, surname}) => {
      const key = `${name}-${surname}-${id}`
      return <MenuItem value={id} key={key}>{name} {surname}</MenuItem>
    }).sort((a, b) => a.key < b.key ? -1 : 1)
  }, [authors.state.data])

  return (
    <Dialog
      aria-labelledby='book-editor-dialog'
      className='editor-dialog'
      onClose={onCancel}
      open
    >
      <DialogTitle id='book-editor-dialog'>
        {book.id ? `Edit ${book.name}` : 'New book'}
      </DialogTitle>
      <FormWrapper
        wrapperClass='books-editor'
        onCancel={onCancel}
        onSave={handleSubmit}
        canSave={valid && !saving}
        saving={saving}
        hasControls
      >
        <TextField
          id='book-title'
          label='Title'
          name='title'
          className='books-editor__input books-editor--title'
          variant='filled'
          value={values.title}
          onChange={onChange}
          autoFocus
          required
        />
        <div className='books-editor--author'>
          <TextField
            id='book-author'
            label='Author'
            name='author'
            className='books-editor__input'
            variant='filled'
            value={values.author.id}
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
          value={values.description}
          onChange={onChange}
          multiline
        />
        <TextField
          id='book-genre'
          label='Genre'
          name='genre'
          className='books-editor__input books-editor--genre'
          variant='filled'
          value={values.genre}
          onChange={onChange}
        />
        <TextField
          id='book-type'
          label='Type'
          name='type'
          className='books-editor__input books-editor--type'
          variant='filled'
          value={values.type}
          onChange={onChange}
          select
        >
          {TypeOptions}
        </TextField>
        <TextField
          id='book-country'
          label='Country'
          name='country'
          className='books-editor__input books-editor--country'
          variant='filled'
          value={values.country}
          onChange={onChange}
        />
        <TextField
          id='book-language'
          label='Language'
          name='language'
          className='books-editor__input books-editor--lang'
          variant='filled'
          value={values.language}
          onChange={onChange}
          select
        >
          {LanguageOptions}
        </TextField>
        <TextField
          id='book-date'
          label='Date'
          name='date'
          className='books-editor__input books-editor--date'
          variant='filled'
          type='date'
          value={values.date}
          InputLabelProps={{shrink: true}}
          onChange={onChange}
        />
        <TextField
          id='book-isbn'
          label='ISBN'
          name='ISBN'
          className='books-editor__input books-editor--isbn'
          variant='filled'
          value={values.ISBN}
          onChange={onChange}
        />
        <StarRating
          value={values.rating}
          onChange={onRatingChange}
          name='rating'
          className='books-editor--rating'
          editable
        />
        <TextField
          id='book-link'
          label='Goodreads link'
          name='goodreads_link'
          className='books-editor__input books-editor--link'
          type='url'
          variant='filled'
          value={values.goodreads_link}
          onChange={onChange}
        />
        <TagInput
          id='book-tags'
          label='Tags'
          name='tags'
          wrapperClass='books-editor--tags'
          inputClass='books-editor__input'
          options={tags.state.data}
          value={values.tags}
          onChange={onTagChange}
        />
      </FormWrapper>
      <AuthorEditor
        open={open}
        apiSave={saveAuthor}
        onSave={onSaveAuthor}
        onClose={onCloseModal}
      />
    </Dialog>
  )
}

export default BookEditor
