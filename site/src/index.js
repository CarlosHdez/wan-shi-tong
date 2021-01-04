import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import App from 'App'
import 'stylesheets/index.scss'
import 'stylesheets/fonts.scss'

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
    },
    MuiDialog: {
      paper: {
        padding: '2rem'
      }
    }
  }
})

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
)
