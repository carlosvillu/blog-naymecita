import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '../../components/material-ui-scrolling-techniques/AppBar'
import AppCanvas, {Content} from '../../components/material-ui-scrolling-techniques/AppCanvas'

import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import SingleForm from '../../components/SingleForm'

const CreateSingle = ({history}, {i18n}) => (
  <div className='CreateSingle'>
    <AppCanvas scrollingTechniques>
      <AppBar
        iconElementLeft={<IconButton><ArrowBack /></IconButton>}
        onLeftIconButtonTouchTap={() => {
          history.push('/')
        }}
        title={i18n.t('TITLE')} />
      <Content>
        <SingleForm />
      </Content>
    </AppCanvas>
  </div>
)

CreateSingle.displayName = 'CreateSingle'
CreateSingle.contextTypes = {
  i18n: PropTypes.object
}
CreateSingle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default CreateSingle
