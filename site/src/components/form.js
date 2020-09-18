import React from 'react'
import {Button} from '@material-ui/core'

const FormFooter = ({onSave, onCancel, className}) => {
  return (
    <footer className={className}>
      <Button
        color='primary'
        size='medium'
        variant='contained'
        onClick={onSave}
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
  const {children, wrapperClass, hasControls, onSave, onCancel} = props

  return (
    <>
      <div className={wrapperClass}>
        {children}
      </div>
      {hasControls &&
        <FormFooter
          onSave={onSave}
          onCancel={onCancel}
          className={`${wrapperClass}__controls`}
        />
      }
    </>
  )
}

FormWrapper.defaultProps ={
  onSave: () => {},
  onCancel: () => {}
}

export default FormWrapper
