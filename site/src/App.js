import React from 'react'

import Header from './displays/navigation/header'
import Sidebar from './displays/navigation/sidebar'
import MainWrapper from './displays/main_wrapper'
import {SECTIONS} from './lib/constants'

const APP_STATE = {
  collections: {
    books: [],
    boardgames: [],
    videogames: []
  },
  display: {
    selectedSection: SECTIONS.books
  }
}

class App extends React.PureComponent {
  state = {...APP_STATE}

  onChangeSelectedSection = (section) => {
    this.setState({
      display: {
        ...this.state.display,
        selectedSection: section
      }
    })
  }

  render() {
    const {selectedSection} = this.state.display
    return (
      <div className="app">
        <Header />
        <div className='main-container'>
          <Sidebar
            onChangeSelectedSection={this.onChangeSelectedSection}
            selectedSection={selectedSection}
          />
          <MainWrapper selectedSection={selectedSection} />
        </div>
      </div>
    )
  }
}

export default App
