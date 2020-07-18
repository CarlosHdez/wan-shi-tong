import React, {useState} from 'react'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import MainWrapper from 'displays/main_wrapper'
import {SECTIONS} from 'lib/constants'

// const APP_STATE = {
//   collections: {
//     books: [],
//     boardgames: [],
//     videogames: []
//   },
//   display: {
//     selectedSection: SECTIONS.books,
//     sidebar: {
//       expanded: true
//     }
//   }
// }

const App = () => {
  const [selectedSection, setSelected] = useState(SECTIONS.books)
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <div className="app">
      <Header onIconClick={toggleExpanded} />
      <div className='main-container'>
        <Sidebar
          expanded={expanded}
          onChangeSelectedSection={setSelected}
          selectedSection={selectedSection}
        />
        <MainWrapper selectedSection={selectedSection} />
      </div>
    </div>
  )
}

export default App
