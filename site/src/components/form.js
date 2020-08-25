import React from 'react'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#698c3d',
      light: '#99bc6a',
      dark: '#3b5f10',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e1e674',
      light: '#ffffa5',
      dark: '#adb444',
      contrastText: '#0a0a0'
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        marginBottom: '1rem'
      }
    }
  }
})

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
    <ThemeProvider theme={theme}>
      <div className={wrapperClass}>
        {children}
        {getSaveButtons()}
      </div>
    </ThemeProvider>
  )
}

export default FormWrapper
