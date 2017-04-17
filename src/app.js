import 'reset-css/reset.css'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import Rosetta from '@schibstedspain/rosetta'
import Polyglot from '@schibstedspain/rosetta/lib/adapters/polyglot'

import literals from './literals'
import Root from './components/Root'

const DEFAULT_CULTURE = 'es-ES'
const DEFAULT_CURRENCY = 'EUR'
const i18n = new Rosetta({ adapter: new Polyglot() })
i18n.languages = literals
i18n.culture = DEFAULT_CULTURE
i18n.currency = DEFAULT_CURRENCY

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component i18n={i18n} />
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
