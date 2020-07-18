import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {SECTIONS} from 'lib/constants'

import 'stylesheets/sidebar.scss'

const MAIN_CLASS = 'main-sidebar'

const Sidebar = ({expanded, onChangeSelectedSection, selectedSection}) => {
  const classes = classnames(MAIN_CLASS, {
    [`${MAIN_CLASS}--expanded`]: expanded
  })

  const onMenuItemClick = ({target}) => {
    const {id} = target.dataset
    console.log(id, SECTIONS[id])
    onChangeSelectedSection(SECTIONS[id])
  }

  const renderItem = ({title, id, icon}) => {
    const classes = classnames('sidebar__item', {
      'sidebar__item--selected': selectedSection.id === id
    })
    return (
      <li
        key={id}
        data-id={id}
        className={classes}
        onClick={onMenuItemClick}
      >
        <span className='material-icons'>{icon}</span>
        <span className='item__title'>{title}</span>
      </li>
    )
  }

  const renderMenu = () => {
    const items = Object.values(SECTIONS)
    return <ul>{items.map(renderItem)}</ul>
  }

  return (
    <div className={classes}>
      {renderMenu()}
    </div>
  )
}

Sidebar.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onChangeSelectedSection: PropTypes.func.isRequired,
  selectedSection: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
}

export default Sidebar
