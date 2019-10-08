import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { Provider } from 'react-redux'
import { initStore } from './store'

const store = initStore()

const ProviderWrapper = (props) => {
  const { children } = props
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  )
}

export default ProviderWrapper
