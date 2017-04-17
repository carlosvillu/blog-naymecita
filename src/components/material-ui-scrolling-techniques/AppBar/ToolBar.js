import React from 'react'
import LegacyAppBar from 'material-ui/AppBar'

const ToolBar = ({children, zDepth = 0, ...other}) => {
  return children || <LegacyAppBar zDepth={zDepth} {...other} />
}

ToolBar.displayName = 'AppBar.ToolBar'

export default ToolBar
