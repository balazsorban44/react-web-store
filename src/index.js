import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './main.css'


import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>
  , document.getElementById('root'))

module.hot && module.hot.accept('./components/App', () => {
  const NextApp = require('./components/App').default
  ReactDOM.render(
    <AppContainer>
      <NextApp/>
    </AppContainer>,
    document.getElementById('root')
  )
})
