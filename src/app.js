import 'reset-css/reset.css'
import './app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import firebase from 'firebase'

import {Provider} from '@schibstedspain/ddd-react-redux'
import i18n from './literals'
import Root from './components/Root'
import Aralescriptura from './domain'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBuvQYPhg4Ct98rfOmn1HFtYz9cGfSK7LU',
  authDomain: 'aralescriptura.firebaseapp.com',
  databaseURL: 'https://aralescriptura.firebaseio.com',
  projectId: 'aralescriptura',
  storageBucket: 'aralescriptura.appspot.com',
  messagingSenderId: '373178486905'
}
firebase.initializeApp(config)

const domain = new Aralescriptura()
domain.config('firebase', firebase)

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider i18n={i18n} domain={domain}>
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
