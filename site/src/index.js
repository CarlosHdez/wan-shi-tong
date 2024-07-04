import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme} from '@mui/material/styles';

import App from 'App'
import 'stylesheets/index.scss'
import 'stylesheets/fonts.scss'

const theme = createTheme(adaptV4Theme({
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
}))

const root = createRoot(document.getElementById('root'))

root.render(
  <Router>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Router>
)
