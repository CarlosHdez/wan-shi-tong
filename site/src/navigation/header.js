import React from 'react'
import {
  AppBar,
  Typography,
  Toolbar
} from '@material-ui/core'

class Header extends React.PureComponent {
  render() {
    return (
      <AppBar position='absolute'>
        <Toolbar>
          <Typography component='h1' variant='h6' color='inherit' noWrap>
            Wan Shi Tong
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
