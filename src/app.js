import 'reset-css/reset.css'
import './app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'

import Provider from './components/Provider'
import i18n from './literals'
import Root from './components/Root'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider i18n={i18n}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

injectTapEventPlugin()
render(Root)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default
    render(NewRoot)
  })
}
