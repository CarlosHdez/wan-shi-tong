import React from 'react'
import {Button} from '@material-ui/core'

const FormWrapper = ({children, wrapperClass, hasControls}) => {
  const getSaveButtons = () => {
    if (hasControls) {
      return (
        <footer className={`${wrapperClass}__controls`}>
          <Button
            color='primary'
            size='medium'
            variant='contained'
          >
            Save
          </Button>
          <Button
            color='default'
            size='medium'
          >
            Cancel
          </Button>
        </footer>
      )
    }
  }

  return (
    <div className={wrapperClass}>
      {children}
      {getSaveButtons()}
    </div>
  )
}

export default FormWrapper
