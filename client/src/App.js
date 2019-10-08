import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as websocket from './websocket'

import PollScene from './scenes/PollScene'
import PollsScene from './scenes/PollsScene'

import logo from './logo.svg'
import './App.css'

const useStyles = makeStyles({
  page: {
    // add padding for fixed navbar
    paddingTop: 64,
  }
})

const App = (props) => {
  const classes = useStyles(props)
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO correctly link the userId to the socket
    websocket.connect(Math.random(), dispatch)
    return () => {
      websocket.close()
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <div className={classes.page}>
        <Router>
          <Switch>
            <Route path="/poll/:pollId" component={PollScene} />
            <Route path="/poll" component={PollsScene} />
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
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  )
}

export default App
