import React from 'react'
import PropTypes from 'prop-types'

import BoardGamesShelf from 'displays/board_game_shelf'
import {SECTIONS} from 'lib/constants'

class MainWrapper extends React.PureComponent {
  static propTypes = {
    selectedSection: PropTypes.object.isRequired
  }

  renderContent = () => {
    switch(this.props.selectedSection) {
      case SECTIONS.books:
        return <div>Books</div>
      case SECTIONS.videogames:
        return <div>Vidieo games </div>
      case SECTIONS.boardgames:
      default:
        return <BoardGamesShelf />
    }
  }

  render() {
    return this.renderContent()
  }
}

export default MainWrapper
