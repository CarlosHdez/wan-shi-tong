import React, {useState, useCallback} from 'react'
import {
  TextField,
  Dialog,
  DialogTitle
} from '@material-ui/core'

import FormWrapper from 'components/form'
import useForm from 'hooks/useForm'
import 'stylesheets/books/author.scss'

const validateAuthor = (values) => {
  if (!values.name) {
    return {name: true}
  }
  return {}
}

const AuthorEditor = ({open, onSave, apiSave, onClose, title = 'New Author'}) => {
  const [author, setAuthor] = useState({name: '', surname: ''})

  const onSaveClick = async (values) => {
    const newAuthor = await apiSave(values)
    onSave(newAuthor)
    setAuthor({})
  }

  const {values, onChange, handleSubmit, valid, saving} = useForm({
    initialValues: author,
    onSave: onSaveClick,
    validator: useCallback(validateAuthor, [])
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='new-author-dialog-title'
    >
      <DialogTitle id='new-author-dialog-title'>{title}</DialogTitle>
      <FormWrapper
        wrapperClass='author-editor'
        onSave={handleSubmit}
        onCancel={onClose}
        canSave={valid && !saving}
        saving={saving}
        hasControls
      >
        <TextField
          id='author-name'
          label='Name'
          className='author-editor__input'
          variant='filled'
          name='name'
          value={values.name}
          onChange={onChange}
          autoFocus
        />
        <TextField
          id='author-surname'
          label='Surname'
          className='author-editor__input'
          name='surname'
          variant='filled'
          value={values.surname}
          onChange={onChange}
        />
      </FormWrapper>
    </Dialog>
  )
}

export default AuthorEditor
