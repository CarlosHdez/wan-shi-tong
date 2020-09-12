import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {useHistory, useRouteMatch} from 'react-router-dom'

import {SECTIONS} from 'lib/constants'

import 'stylesheets/sidebar.scss'

const MAIN_CLASS = 'main-sidebar'

const SidebarItem = ({id, title, icon}) => {
  const history = useHistory()
  const route = `/${id}`
  const match = useRouteMatch(route)
  const classes = classnames('sidebar__item', {
    'sidebar__item--selected': match
  })
  const onMenuItemClick = ({target}) => history.push(`/${target.dataset.id}`)
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

const Sidebar = ({expanded}) => {
  const classes = classnames(MAIN_CLASS, {
    [`${MAIN_CLASS}--expanded`]: expanded
  })

  const renderMenu = () => {
    const items = Object.values(SECTIONS)
    return <ul>{items.map(SidebarItem)}</ul>
  }

  return (
    <div className={classes}>
      {renderMenu()}
    </div>
  )
}

Sidebar.propTypes = {
  expanded: PropTypes.bool.isRequired
}

export default Sidebar
