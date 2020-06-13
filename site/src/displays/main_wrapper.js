import React from 'react'
import PropTypes from 'prop-types'

import BooksWrapper from 'displays/books/wrapper'
import {SECTIONS} from 'lib/constants'

class MainWrapper extends React.PureComponent {
  static propTypes = {
    selectedSection: PropTypes.object.isRequired
  }

  renderContent = () => {
    switch(this.props.selectedSection) {
      case SECTIONS.books:
        return <BooksWrapper />
      case SECTIONS.videogames:
        return <div>Vidieo games </div>
      case SECTIONS.boardgames:
        return <div>Board games </div>
      default:
        return <div> wtf </div>
    }
  }

  render() {
    return this.renderContent()
  }
}

export default MainWrapper
