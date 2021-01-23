import React, {useState} from 'react'
import {
  Paper,
  Button,
  TextField
} from '@material-ui/core'

import styles from 'stylesheets/navigation/login.module.scss'

const Login = ({onLogin, auth}) => {
  const [credentials, setCred] = useState({username: '', pass: ''})

  const submit = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    try {
      await auth.signInWithEmailAndPassword(
        credentials.username,
        credentials.pass
      )
    } catch (e) {
      console.log(e)
    }
  }

  const updateCreds = ({target}) => {
    setCred({
      ...credentials,
      [target.name]: target.value
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles.bg}>
        <div className={styles.blur} />
      </div>
      <Paper elevation={3} className={styles.paper}>
        <h2>Visit the library</h2>
        <form onSubmit={submit}>
          <TextField
            label='Username'
            variant='filled'
            name='username'
            value={credentials.username}
            onChange={updateCreds}
            autoFocus
          />
          <TextField
            label='Password'
            variant='filled'
            name='pass'
            value={credentials.pass}
            onChange={updateCreds}
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
