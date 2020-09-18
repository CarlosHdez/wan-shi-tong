import React from 'react'
import {
  TextField,
  Dialog,
  DialogTitle
} from '@material-ui/core'

import FormWrapper from 'components/form'
import 'stylesheets/books/author.scss'

const AuthorEditor = ({open, onClose}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='new-author-dialog-title'
    >
      <DialogTitle id='new-author-dialog-title'>Create Author</DialogTitle>
      <FormWrapper
        wrapperClass='author-editor'
        onSave={() => {}}
        onCancel={onClose}
        hasControls
      >
        <TextField
          id='author-name'
          label='Name'
          className='author-editor__input'
          variant='filled'
        />
        <TextField
          id='author-surname'
          label='Surname'
          className='author-editor__input'
          variant='filled'
        />
      </FormWrapper>
    </Dialog>
  )
}

export default AuthorEditor
