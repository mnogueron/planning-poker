import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { initStore } from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const { store, persistor } = initStore()

const ProviderWrapper = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default ProviderWrapper
