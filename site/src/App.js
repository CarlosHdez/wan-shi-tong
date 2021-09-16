import React, {useState, useEffect} from 'react'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import Login from 'displays/navigation/login'
import MainWrapper from 'displays/main_wrapper'
import {initAuth} from 'lib/firebase'

// TODO: Create a loading screen
const Loading = () => <>Loading the app</>

const App = () => {
  const [auth, setAuth] = useState(null)
  const [logged, setLogged] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)
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
      <Header onIconClick={toggleExpanded} />
      <div className='main-container'>
        <Sidebar expanded={expanded} />
        <MainWrapper />
      </div>
    </div>
  )
}

export default App
