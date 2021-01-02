import React from 'react'
import {
  Paper,
  Button,
  TextField
} from '@material-ui/core'

import styles from 'stylesheets/navigation/login.module.scss'

const Login = () => {
  const login = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    console.log(ev)
  }

  return (
    <div className={styles.login}>
      <div className={styles.bg}>
        <div className={styles.blur} />
      </div>
      <Paper elevation={3} className={styles.paper}>
        <h2>Visit the library</h2>
        <form onSubmit={login}>
          <TextField
            label='Username'
            variant='filled'
            name='username'
            autoFocus
          />
          <TextField
            label='Password'
            variant='filled'
            name='pass'
            type='password'
          />
          <i>"I am Wan Shi Tong, he who knows ten thousand things"</i>
          <Button
            type='submit'
            color='primary'
            size='medium'
            variant='contained'
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default Login
