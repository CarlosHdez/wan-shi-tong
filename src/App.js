import React from 'react'
import {Navbar, NavItem} from 'react-materialize'

import BookForm from './book_form'

class App extends React.PureComponent {
  render() {
    const brand = (<a>Wan Shi Tong</a>)
    return (
      <div className="app">
        <Navbar brand={brand} />
        <BookForm />
      </div>
    )
  }
}

export default App
