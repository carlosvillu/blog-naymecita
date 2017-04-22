import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '../../components/material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../../components/material-ui-scrolling-techniques/AppCanvas'

import Grid from '../../components/Grid'
import FAVMenu from '../../components/FAVMenu'
import Search from '../../components/Search'

const Home = ({history}, {i18n}) => {
  return (
    <div className='Home'>
      <AppCanvas scrollingTechniques>
        <AppBar title={i18n.t('TITLE')} showMenuIconButton={false} />
        <Content>
          <div className='Home-SearchWrapper'><Search /></div>
          <div className='Home-GridWrapper'><Grid /></div>
          <div className='Home-FAVWrapper'><FAVMenu onClickItem={({item}) => {
            const path = item === FAVMenu.ITEMS.SINGLE ? '/create/single' : '/create/multiples'
            history.push(path)
          }} /></div>
        </Content>
      </AppCanvas>
    </div>
  )
}

Home.displayName = 'Home'
Home.contextTypes = {
  i18n: PropTypes.object
}
Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Home
