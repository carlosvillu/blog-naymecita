import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { Route } from 'react-router-dom'

import Home from '../../pages/Home'
import CreateSingle from '../../pages/CreateSingle'
import CreateMultiples from '../../pages/CreateMultiples'
import Detail from '../../pages/Detail'

import theme from './theme'

const Root = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/create/single' component={CreateSingle} />
      <Route path='/create/multiples' component={CreateMultiples} />
      <Route path='/detail/:id' component={Detail} />
    </div>
  </ MuiThemeProvider>
)

Root.displayName = 'Root'

export default Root
