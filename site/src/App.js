import React from 'react'

import Header from './navigation/header'
import Sidebar from './navigation/sidebar'

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <Header />
        <div className='main-container'>
          <Sidebar />
        </div>
      </div>
    )
  }
}

export default App
