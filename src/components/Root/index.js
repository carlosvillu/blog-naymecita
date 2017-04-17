import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from '../material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../material-ui-scrolling-techniques/AppCanvas'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Provider from '../Provider'
import Home from '../../pages/Home'

const Root = ({i18n}) => (
  <Provider i18n={i18n}>
    <MuiThemeProvider>
      <Router>
        <AppCanvas scrollingTechniques>
          <AppBar title={i18n.t('TITLE')} showMenuIconButton={false} />
          <Content>
            <Route exact path='/' component={Home} />
          </Content>
        </AppCanvas>
      </Router>
    </ MuiThemeProvider>
  </Provider>
)

Root.displayName = 'Root'
Root.propTypes = {
  i18n: PropTypes.object.isRequired
}

export default Root
