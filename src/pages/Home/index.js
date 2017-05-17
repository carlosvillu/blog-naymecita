/* eslint no-console:0 */
import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '../../components/material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../../components/material-ui-scrolling-techniques/AppCanvas'

import Grid from '../../components/Grid'
import FAVMenu from '../../components/FAVMenu'
import Search from '../../components/Search'
import LoadingOverlay from '../../components/LoadingOverlay'

import {calls, services, pipe} from '@schibstedspain/ddd-react-redux'

const Home = ({
  history,
  listStudients,
  listStudientsParams,
  listStudientsUseCase
}, {i18n}) => {
  listStudients === undefined && listStudientsUseCase()
  return (
    <div className='Home'>
      <AppCanvas scrollingTechniques>
        <AppBar title={i18n.t('TITLE')} showMenuIconButton={false} />
        <Content>
          <div className='Home-SearchWrapper'><Search /></div>
          <div className='Home-GridWrapper'><Grid images={listStudients} /></div>
          <div className='Home-FAVWrapper'><FAVMenu onClickItem={({item}) => {
            const path = item === FAVMenu.ITEMS.SINGLE ? '/create/single' : '/create/multiples'
            history.push(path)
          }} /></div>
        </Content>
      </AppCanvas>
      <LoadingOverlay display={listStudients === undefined} />
    </div>
  )
}

Home.displayName = 'Home'
Home.contextTypes = {
  i18n: PropTypes.object
}
Home.propTypes = {
  listStudients: PropTypes.array,
  listStudientsParams: PropTypes.object,
  listStudientsUseCase: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default pipe(
  calls('list_studients_use_case'),
  services('list_studients_use_case')
)(Home)
