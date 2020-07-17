import React from 'react'
import PropTypes from 'prop-types'

import {SECTIONS} from 'lib/constants'

import 'stylesheets/sidebar.scss'

class Sidebar extends React.PureComponent {
  static propTypes = {
    onChangeSelectedSection: PropTypes.func.isRequired,
    selectedSection: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  onMenuItemClick = ({target}) => {
    const {id} = target.dataset
    this.props.onChangeSelectedSection(SECTIONS[id])
  }

  renderItem = ({title, id, icon}) => {
    const {selectedSection} = this.props
    const selectedClass = selectedSection.id === id ? 'selected' : ''
    return (
      <li
        key={id}
        data-id={id}
        onClick={this.onMenuItemClick}
        className={selectedClass}
      >
        <span className='material-icons'>{icon}</span>
        {title}
      </li>
    )
  }

  renderMenu = () => {
    const items = Object.values(SECTIONS)
    return <ul>{items.map(this.renderItem)}</ul>
  }

  render() {
    return (
      <div className='main-sidebar'>
        {this.renderMenu()}
      </div>
    )
  }
}

export default Sidebar
