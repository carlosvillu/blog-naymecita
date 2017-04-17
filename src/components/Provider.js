/* eslint no-console: 0 */
import { Component, PropTypes, Children } from 'react'

export default class Provider extends Component {
  getChildContext () {
    return {
      i18n: this.i18n,
      domain: this.domain
    }
  }

  constructor (...args) {
    super(...args)

    const { i18n, domain } = this.props

    this.i18n = i18n
    this.domain = domain
  }

  componentWillReceiveProps (nextProps) {
    const { i18n, domain } = this
    const { i18n: nextI18n, domain: nextDomain } = nextProps

    if (i18n !== nextI18n) {
      console.warn('<Provider> does not support changing `i18n` on the fly.')
    }
    if (domain !== nextDomain) {
      console.warn('<Provider> does not support changing `domain` on the fly.')
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.displayName = 'Provider'

Provider.propTypes = {
  i18n: PropTypes.object.isRequired,
  domain: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

Provider.defaultProps = {
  i18n: {
    t: literal => literal,
    n: number => number,
    c: number => number
  },
  domain: {
    get: () => Promise.rejected('Provider default domain not implemented.')
  }
}

Provider.childContextTypes = {
  i18n: PropTypes.object,
  domain: PropTypes.object
}
