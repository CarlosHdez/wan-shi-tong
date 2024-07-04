import React, {useState} from 'react'
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent
} from '@mui/material'

const DeleteIcon = ({id, name, onDelete}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  const confirmDelete = () => {
    onDelete(id)
    closeDialog()
  }

  return (
    <>
      <IconButton
        aria-label='delete'
        className='cell__action--delete'
        data-id={id}
        onClick={openDialog}
        size="large"
      >
        <span className='material-icons'>delete</span>
      </IconButton>
      <Dialog open={dialogOpen}>
        <DialogContent>
          This action cannot be undone
          <p>Do you want to delete <b>{name}</b>?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button variant='contained' color='primary' onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteIcon
