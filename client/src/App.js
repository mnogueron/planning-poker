import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PollScene from './scenes/PollScene'
import PollsScene from './scenes/PollsScene'

import logo from './logo.svg'
import './App.css'


const Provider = (props) => {
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const useStyles = makeStyles({
  page: {
    // add padding for fixed navbar
    paddingTop: 64,
  }
})

const App = (props) => {
  const classes = useStyles(props)
  return (
    <Provider>
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
    </Provider>
  )
}

export default App
