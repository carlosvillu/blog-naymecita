import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Route } from 'react-router-dom'

import Home from '../../pages/Home'
import CreateSingle from '../../pages/CreateSingle'
import CreateMultiples from '../../pages/CreateMultiples'

const Root = ({i18n}) => (
  <MuiThemeProvider>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/create/single' component={CreateSingle} />
      <Route path='/create/multiples' component={CreateMultiples} />
    </div>
  </ MuiThemeProvider>
)

Root.displayName = 'Root'
Root.propTypes = {
  i18n: PropTypes.object.isRequired
}

export default Root
