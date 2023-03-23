import React from 'react'
import {
  Button,
  CircularProgress
} from '@material-ui/core'

import 'stylesheets/components/form.scss'

const FormFooter = ({onCancel, canSave, className}) => {
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
      <Button
        color='default'
        size='medium'
        onClick={onCancel}
      >
        Cancel
      </Button>
    </footer>
  )
}

const FormWrapper = (props) => {
  const {
    children,
    wrapperClass = '',
    hasControls,
    onSave,
    onCancel,
    canSave = true,
    saving = false
  } = props

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

FormWrapper.defaultProps = {
  onSave: () => {},
  onCancel: () => {}
}

export default FormWrapper
