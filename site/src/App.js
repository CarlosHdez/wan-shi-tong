import React, {useState, useEffect} from 'react'
import {
  useHistory,
  Switch,
  Route
} from 'react-router-dom'

import Header from 'displays/navigation/header'
import Sidebar from 'displays/navigation/sidebar'
import Login from 'displays/navigation/login'
import MainWrapper from 'displays/main_wrapper'

const App = () => {
  const {push} = useHistory()
  const [logged, setLogged] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!logged) {
      return push('/login')
    }
    push('/')
  }, [logged, push])

  const toggleExpanded = () => setExpanded(!expanded)
  const onLogin = () => setLogged(true)

  return (
    <Switch>
      <Route path='/login'>
        <Login onLogin={onLogin} />
      </Route>
      <Route path='*'>
        <div className="app">
          <Header onIconClick={toggleExpanded} />
          <div className='main-container'>
            <Sidebar expanded={expanded} />
            <MainWrapper />
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default App
