import React from 'react'
import {
  Button,
  CircularProgress
} from '@mui/material'

import 'stylesheets/components/form.scss'

const FormFooter = ({
  onCancel = () => {},
  canSave = () => {},
  className
}) => {
  return (
    <footer className={className}>
      <Button
        type='submit'
        color='primary'
        size='medium'
        variant='contained'
        disabled={!canSave}
      >
        Save
      </Button>
      <Button size='medium' onClick={onCancel}>
        Cancel
      </Button>
    </footer>
  )
}

const FormWrapper = ({
  children,
  wrapperClass = '',
  hasControls,
  onSave = () => {},
  onCancel = () => {},
  canSave = true,
  saving = false
}) => {
  return (
    <form onSubmit={onSave}>
      <div className={`${wrapperClass} form-wrapper`}>
        {children}
        { saving && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                zIndex: 10,
                backdropFilter: 'blur(3px)'
              }}
            >
              <CircularProgress color='primary' />
            </div>
        )}
      </div>
      {hasControls &&
        <FormFooter
          canSave={canSave}
          onCancel={onCancel}
          className={`${wrapperClass}__controls`}
        />
      }
    </form>
  )
}

export default FormWrapper
