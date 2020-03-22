import React from 'react'
import {Drawer} from '@material-ui/core'

class Sidebar extends React.PureComponent {
  render() {
    return (
      <Drawer
        variant='permanent'
        className='sidebar'
        open
      >
        icon
        icon 2
      </Drawer>
    )
  }
}

export default Sidebar
