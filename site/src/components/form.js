import React from 'react'
import {Button} from '@material-ui/core'

const FormFooter = ({onCancel, valid, className}) => {
  return (
    <footer className={className}>
      <Button
        type='submit'
        color='primary'
        size='medium'
        variant='contained'
        disabled={!valid}
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
  const {children, wrapperClass, hasControls, onSave, onCancel, valid} = props

  return (
    <form onSubmit={onSave}>
      <div className={wrapperClass}>
        {children}
      </div>
      {hasControls &&
        <FormFooter
          valid={valid}
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
