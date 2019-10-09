import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navbar from './components/Navbar'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import * as websocket from './websocket'

import PollScene from './scenes/PollScene'
import PollsScene from './scenes/PollsScene'
import LoginScene from './scenes/LoginScene'

import logo from './logo.svg'
import './App.css'

const useStyles = makeStyles({
  page: {
    // add padding for fixed navbar
    paddingTop: 64,
    paddingBottom: 64,
  }
})

const App = (props) => {
  const classes = useStyles(props)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const user = useSelector(state => state.app.user)

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      history.replace('/login')
      return
    }

    if (user) {
      websocket.connect(user.id, dispatch)
    }

    return () => {
      websocket.close()
    }
  }, [dispatch, user, history, location])

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <div className={classes.page}>
        <Switch>
          <Route path="/poll/:pollId" component={PollScene} />
          <Route path="/poll" component={PollsScene} />
          <Route path="/login" component={LoginScene} />
          <Route path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </Route>
          <Route>
            Not Found
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  )
}

export default App
