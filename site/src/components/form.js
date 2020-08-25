import React from 'react'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

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

const FormWrapper = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default FormWrapper
