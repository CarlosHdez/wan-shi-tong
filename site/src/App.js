import React, {useState, useEffect, useCallback} from 'react'
import {
  useHistory,
  useLocation,
  Switch,
  Route
} from 'react-router-dom'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import Login from 'displays/navigation/login'
import MainWrapper from 'displays/main_wrapper'
import {initAuth} from 'lib/firebase'

const App = () => {
  const {push} = useHistory()
  const {pathname} = useLocation()
  const [auth, setAuth] = useState(null)
  const [logged, setLogged] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prevLoc, setPrevLoc] = useState(pathname)

  const toggleExpanded = () => setExpanded(!expanded)
  const onLogin = useCallback(() => {
    setLogged(true)
    if (prevLoc !== '/login') {
      push(prevLoc)
    } else {
      push('/')
    }
  }, [prevLoc, push])

  useEffect(() => {
    const loadAuth = async () => {
      const resp = await initAuth()
      resp.onAuthStateChanged((user) => {
        if (user) {
          onLogin(user)
        }
      })
      setAuth(resp)
    }
    loadAuth()
  }, [onLogin])

  useEffect(() => {
    if (auth && !logged) {
      // TODO: Only do this if auth has loaded and confirmed the user is not there
      setPrevLoc(pathname)
      return push('/login')
    }
  }, [logged, auth, pathname, push])

  return (
    <Switch>
      <Route path='/login'>
        <Login onLogin={onLogin} auth={auth}/>
      </Route>
      <Route path='*'>
        {logged &&
          <div className="app">
            <Header onIconClick={toggleExpanded} />
            <div className='main-container'>
              <Sidebar expanded={expanded} />
              <MainWrapper />
            </div>
          </div>
        }
      </Route>
    </Switch>
  )
}

export default App
