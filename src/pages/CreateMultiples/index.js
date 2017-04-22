import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import AppBar from '../../components/material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../../components/material-ui-scrolling-techniques/AppCanvas'

import MultipleForm from '../../components/MultipleForm'

const CreateMultiples = ({history}, {i18n}) => (
  <div className='CreateMultiples'>
    <AppCanvas scrollingTechniques>
      <AppBar
        iconElementLeft={<IconButton><ArrowBack /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          history.push('/')
        }}
        title={i18n.t('TITLE')} />
      <Content>
        <MultipleForm />
      </Content>
    </AppCanvas>
  </div>
)

CreateMultiples.displayName = 'CreateMultiples'
CreateMultiples.contextTypes = {
  i18n: PropTypes.object
}
CreateMultiples.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default CreateMultiples
