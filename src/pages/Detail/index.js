import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import AppBar from '../../components/material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../../components/material-ui-scrolling-techniques/AppCanvas'

import StudientAdvancedCard from '../../components/StudientAdvancedCard'

const Detail = ({match, history}, {i18n}) => (
  <div className='Detail'>
    <AppCanvas scrollingTechniques>
      <AppBar
        iconElementLeft={<IconButton><ArrowBack /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          history.push('/')
        }}
        title={i18n.t('TITLE')} />
      <Content>
        <StudientAdvancedCard studentID={match.params.id} />
      </Content>
    </AppCanvas>
  </div>
)

Detail.displayName = 'Detail'
Detail.contextTypes = {
  i18n: PropTypes.object
}
Detail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default Detail
