import React, {useState} from 'react'
import {
  TextField,
  Dialog,
  DialogTitle
} from '@material-ui/core'

import FormWrapper from 'components/form'
import {saveAuthor} from 'api/books'
import 'stylesheets/books/author.scss'

const AuthorEditor = ({open, onSave, onClose}) => {
  const [author, setAuthor] = useState({})

  const onUpdatedField = ({target}) => {
    setAuthor({
      ...author,
      [target.name]: target.value
    })
  }

  const onSaveClick = async () => {
    const newAuthor = await saveAuthor(author)
    onSave(newAuthor)
    setAuthor({})
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='new-author-dialog-title'
    >
      <DialogTitle id='new-author-dialog-title'>New Author</DialogTitle>
      <FormWrapper
        wrapperClass='author-editor'
        onSave={onSaveClick}
        onCancel={onClose}
        hasControls
      >
        <TextField
          id='author-name'
          label='Name'
          className='author-editor__input'
          variant='filled'
          name='name'
          value={author.name}
          onChange={onUpdatedField}
        />
        <TextField
          id='author-surname'
          label='Surname'
          className='author-editor__input'
          name='surname'
          variant='filled'
          value={author.surname}
          onChange={onUpdatedField}
        />
      </FormWrapper>
    </Dialog>
  )
}

export default AuthorEditor
