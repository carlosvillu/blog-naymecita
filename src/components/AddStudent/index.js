import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import ImageSelect from '../ImageSelect'

const INITIAL_STATE = {
  open: false,
  name: null,
  surname: null,
  image: false
}
class AddStudent extends PureComponent {
  static contextTypes = {
    i18n: PropTypes.object
  }

  static propTypes = {
    disabled: PropTypes.bool,
    onStudentAdd: PropTypes.func
  }
  state = INITIAL_STATE

  render () {
    const {disabled, onStudentAdd} = this.props
    const {open} = this.state
    const {i18n} = this.context

    return (
      <div className='AddStudent'>
        <FloatingActionButton
          secondary
          className='AddStudent-FAV'
          disabled={disabled}
          onClick={() => {
            this.setState({open: true})
          }}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={i18n.t('ADD_STUDENT_DIALOG_TITLE')}
          contentStyle={{
            width: '100%',
            maxWidth: 'none'
          }}
          actions={[
            <FlatButton
              label={i18n.t('CANCEL')}
              onTouchTap={() => this.setState(INITIAL_STATE)}
            />,
            <FlatButton
              label={i18n.t('ADD_STUDENT')}
              primary
              disabled={this._shouldDisableAction()}
              onTouchTap={() => {
                const {name, surname, image} = this.state
                onStudentAdd({name, surname, image})
                this.setState(INITIAL_STATE)
              }}
            />
          ]}
          modal
          open={open}>
          {this._form}
        </Dialog>
      </div>
    )
  }

  get _form () {
    const {name, surname, image} = this.state
    const {i18n} = this.context
    return (
      <div className='AddStudent-form'>
        <TextField
          value={name}
          onChange={this._handleChangeField('name')}
          floatingLabelText={!name ? i18n.t('LABEL_NAME_INPUT') : false} />
        <TextField
          value={surname}
          onChange={this._handleChangeField('surname')}
          floatingLabelText={!name ? i18n.t('LABEL_SURNAME_INPUT') : false} />
        <ImageSelect image={image} onChangeImage={({image}) => {
          this.setState({image})
        }} />
      </div>
    )
  }

  _shouldDisableAction = () => {
    const {name, surname, image} = this.state
    return !(name && surname && image)
  }

  _handleChangeField = name => (event, index, value) => {
    this.setState({[name]: value || event.target.value})
  }
}

export default AddStudent
