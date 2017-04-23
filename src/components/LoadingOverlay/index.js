import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'

const LoadingOverlay = ({display}) => {
  if (!display) { return null }
  return (
    <div className='LoadingOverlay'>
      <CircularProgress className='LoadingOverlay-Spinner' />
    </div>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'
LoadingOverlay.defaultProps = {
  display: false
}
LoadingOverlay.propTypes = {
  display: PropTypes.bool
}

export default LoadingOverlay
