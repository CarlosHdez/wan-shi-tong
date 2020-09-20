import React from 'react'
import PropTypes from 'prop-types'

import 'stylesheets/header.scss'

const Header = ({onIconClick}) => {
  return (
    <div className='main-header'>
      <img
        alt='menu'
        src='/icons/logo.png'
        onClick={onIconClick}
      />
      <h1>Wan Shi Tong</h1>
    </div>
  )
}

Header.propTypes = {
  onIconClick: PropTypes.func.isRequired
}

export default Header
