/* eslint no-return-assign:0 */
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Menu, MainButton, ChildButton} from './react-mfb'

import './react-mfb/mfb.scss'

class FAVMenu extends PureComponent {
  static displayName = 'FAVMenu'
  static contextTypes = {
    i18n: PropTypes.object
  }

  render () {
    const {i18n} = this.context

    return (
      <Menu effect='zoomin' method='click' position='br' ref={node => this.menu = node}>
        <MainButton
          onClick={(e) => this.menu.toggleMenu(e)}
          iconResting='ion-plus-round'
          iconActive='ion-close-round' />
        <ChildButton
          onClick={(e) => this.menu.toggleMenu(e)}
          icon='ion-ios-list'
          label={i18n.t('ADD_SINGLE_DOC')} />
        <ChildButton
          onClick={(e) => this.menu.toggleMenu(e)}
          icon='ion-ios-paper'
          label={i18n.t('ADD_MULTIPLE_DOCS')} />
      </Menu>
    )
  }
}

export default FAVMenu
