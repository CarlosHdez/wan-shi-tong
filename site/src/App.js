import React, {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import MainWrapper from 'displays/main_wrapper'

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
    MuiPaper: {
      root: {
        padding: '2rem'
      }
    }
  }
})

const App = () => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header onIconClick={toggleExpanded} />
          <div className='main-container'>
            <Sidebar expanded={expanded} />
            <MainWrapper />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
