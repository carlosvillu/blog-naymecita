import React from 'react'
import PropTypes from 'prop-types'

import ActionFavorite from 'material-ui/svg-icons/action/favorite'

const Footer = (props, {i18n}) => (
  <div className='Footer'>
    <div className='Footer-logos'>
      <img className='Footer-Image' width='200px' src='/MINECO-min.png' />
      <img className='Footer-Image' width='200px' src='/Recercaixa-min.jpg' />
      <img className='Footer-Image' width='200px' src='/UAB_color-min.jpg' />
      <img className='Footer-Image' width='200px' src='/UVal_color-min.jpg' />
      <img className='Footer-Image' width='200px' src='/UVic_color-min.jpg' />
    </div>
    <div className='Footer-Claim'>
      <span>{i18n.t('HANDMADE_WITH')}</span>
      <ActionFavorite className='Footer-heart' />
      <span>{i18n.t('BY')}</span>
      <a className='Footer-Name'href='https://twitter.com/carlosvillu'>@carlosvillu</a>
    </div>
  </div>
)

Footer.displayName = 'Footer'
Footer.contextTypes = {
  i18n: PropTypes.object
}
export default Footer
