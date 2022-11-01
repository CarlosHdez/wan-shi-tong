import React, {useState, useEffect} from 'react'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import Login from 'displays/navigation/login'
import MainWrapper from 'displays/main_wrapper'
import {initAuth} from 'lib/firebase'

import {CircularProgress} from '@material-ui/core'
const Loading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      color: 'black',
      backgroundColor: '#99bc6a9f'
    }}
  >
    <CircularProgress color='primary' />
    <h2>Loading ...</h2>
  </div>
)

const App = () => {
  const [auth, setAuth] = useState(null)
  const [logged, setLogged] = useState(false)

  const onLogin = () => {setLogged(true)}

  useEffect(() => {
    if (auth) {
      return
    }
    const loadAuth = async () => {
      const resp = await initAuth()
      resp.onAuthStateChanged((user) => {
        if (user) {
          setLogged(true)
        }
        setAuth(resp)
      })
    }
    loadAuth()
  }, [auth])

  if (!auth) {
    return <Loading />
  }
  if (!logged) {
    return <Login onLogin={onLogin} auth={auth} />
  }

  return (
    <div className="app">
      <Header onIconClick={() => {}} />
      <div className='main-container'>
        <Sidebar />
        <MainWrapper />
      </div>
    </div>
  )
}

export default App
