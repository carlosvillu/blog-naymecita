import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'

export default class Loading extends PureComponent {
  static displayName = 'Loading'
  static propTypes = {
    label: PropTypes.string
  }

  render () {
    const {label} = this.props
    return (
      <div className='Loading'>
        <h2 className='Loading-title'>{label || 'Doing my stuffs'}</h2>
        <CircularProgress />
      </div>
    )
  }
}
