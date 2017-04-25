import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import Toggle from 'material-ui/Toggle'

const ConsentToogle = ({consent, onConsentChange, label}, {i18n}) => {
  const classNameToggle = cx('ConsentToogle-Toggle', {
    'ConsentToogle-Toggle--isActive': consent
  })
  return (
    <div className='SingleForm-FourthStep'>
      <Toggle
        className={classNameToggle}
        toggled={consent}
        labelPosition='right'
        onToggle={() => onConsentChange({consent: !consent})}
        label={label} />
    </div>
  )
}

ConsentToogle.displayName = 'ConsentToogle'
ConsentToogle.contextTypes = {
  i18n: PropTypes.object
}
ConsentToogle.propTypes = {
  consent: PropTypes.bool,
  onConsentChange: PropTypes.func,
  label: PropTypes.string
}
export default ConsentToogle
