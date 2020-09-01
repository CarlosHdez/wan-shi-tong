import React, {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import MainWrapper from 'displays/main_wrapper'

const App = () => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <Router>
      <div className="app">
        <Header onIconClick={toggleExpanded} />
        <div className='main-container'>
          <Sidebar expanded={expanded} />
          <MainWrapper />
        </div>
      </div>
    </Router>
  )
}

export default App
