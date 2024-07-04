import React, {useState} from 'react'
import classnames from 'classnames'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {ChevronRight} from '@mui/icons-material'
import {Paper} from '@mui/material'

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

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const classes = classnames(MAIN_CLASS, {
    [`${MAIN_CLASS}--expanded`]: expanded
  })

  const menu = Object.values(SECTIONS).map(SidebarItem)

  return (
    <div className={classes}>
      <Paper elevation={2} className='control' onClick={toggleExpanded}>
        <ChevronRight />
      </Paper>
      <ul>{menu}</ul>
    </div>
  )
}

export default Sidebar
