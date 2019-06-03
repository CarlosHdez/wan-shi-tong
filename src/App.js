import React from 'react'
import {Navbar, NavItem} from 'react-materialize'

class App extends React.PureComponent {
  render() {
    const brand = (<a>Wan Shi Tong</a>)
    return (
      <div className="app">
        <Navbar brand={brand}>
        </Navbar>
      </div>
    )
  }
}

export default App;
