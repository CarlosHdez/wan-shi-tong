import React from 'react'

import Header from './navigation/header'
import Sidebar from './navigation/sidebar'

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <Header />
        {/* <Sidebar /> */}
      </div>
    )
  }
}

export default App
