import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { Provider } from 'react-redux'
import { initStore } from './store'
import App from './App'

const store = initStore()

const ProviderWrapper = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  )
}

export default ProviderWrapper
