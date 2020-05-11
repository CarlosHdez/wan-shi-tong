import React from 'react'

import 'stylesheets/header.scss'

class Header extends React.PureComponent {
  render() {
    return (
      <div className='main-header'>
        <img alt='menu' src='icons/menu.png' />
        <h1>Wan Shi Tong</h1>
      </div>
    )
  }
}

export default Header
