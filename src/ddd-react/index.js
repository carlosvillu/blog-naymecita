import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

const connector = (...usesCases) => Target => class DDDConnector extends PureComponent {
  static displayName = 'DDDConnector'
  static contextTypes = {
    domain: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {domain} = this.context
    this._disposes = usesCases.map(usecase => {
      return domain.get(usecase).$.execute.subscribe(({params, result}) => {
        this.setState({
          [`${usecase}`]: result,
          [`${usecase}_params`]: params
        })
      })
    })
  }

  componentWillUnmount () {
    this._disposes.forEach(dispose => dispose())
  }

  render () {
    return <Target {...this.props} {...this.state} />
  }
}

export default connector
