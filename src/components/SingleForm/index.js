import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper'

import ImageSelect from '../ImageSelect'
import ConsentToogle from '../ConsentToogle'
import LoadingOverlay from '../LoadingOverlay'

class SingleForm extends PureComponent {
  static displayName = 'SingleForm'
  static contextTypes = {
    i18n: PropTypes.object,
    domain: PropTypes.object
  }
  static propTypes = {
    onCreateStudent: PropTypes.func
  }

  state = {
    consent: false,
    description: '',
    displayOverlay: false,
    grade: null,
    image: null,
    letter: null,
    name: '',
    snackMsg: '',
    school: null,
    stepIndex: 0,
    surname: '',
    title: ''
  }

  render () {
    const {i18n} = this.context
    const {onCreateStudent} = this.props
    const {stepIndex, image, snackMsg, displayOverlay, id} = this.state

    return (
      <div className='SingleForm'>
        <Stepper activeStep={stepIndex} orientation='vertical'>
          <Step>
            <StepLabel>{i18n.t('FIRST_STEP_SINGLE')}</StepLabel>
            <StepContent className='SingleForm-FirstStepWrapper'>
              {this._firstStep}
              {this._renderStepActions(0)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('SECOND_STEP_SINGLE')}</StepLabel>
            <StepContent>
              <ImageSelect image={image} onChangeImage={({image}) => this.setState({image})} />
              {this._renderStepActions(1)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('THIRD_STEP_SINGLE')}</StepLabel>
            <StepContent>
              {this._thirdStep}
              {this._renderStepActions(2)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('FOURTH_STEP_SINGLE')}</StepLabel>
            <StepContent>
              {this._fourthStep}
              {this._renderStepActions(3)}
            </StepContent>
          </Step>

        </Stepper>
        <Snackbar
          open={!!snackMsg}
          action={id ? i18n.t('SEE') : false}
          onActionTouchTap={() => id && onCreateStudent(id)}
          message={i18n.t(snackMsg)}
          autoHideDuration={4000} />
        <LoadingOverlay display={displayOverlay} />
      </div>
    )
  }

  get _firstStep () {
    const {i18n, domain} = this.context
    const {name, surname, school, grade, letter} = this.state

    const schools = domain.get('config').get('schools')
    const grades = domain.get('config').get('grades')
    const letters = domain.get('config').get('letters')

    return (
      <div className='SingleForm-FirstStep'>
        <TextField
          className='SingleForm-FirstStepField'
          value={name}
          onChange={this._handleChangeField('name')}
          floatingLabelText={!name ? i18n.t('LABEL_NAME_INPUT') : false} />

        <TextField
          className='SingleForm-FirstStepField'
          value={surname}
          onChange={this._handleChangeField('surname')}
          floatingLabelText={!surname ? i18n.t('LABEL_SURNAME_INPUT') : false} />

        <SelectField
          className='SingleForm-FirstStepField'
          value={school}
          onChange={this._handleChangeField('school')}
          floatingLabelText={i18n.t('LABEL_SCHOOLS_SELECT')}>
          {schools.map(school => <MenuItem key={school} value={school} primaryText={i18n.t(school)} />)}
        </SelectField>

        <SelectField
          className='SingleForm-FirstStepField'
          value={grade}
          onChange={this._handleChangeField('grade')}
          floatingLabelText={i18n.t('LABEL_GRADES_SELECT')}>
          {grades.map(grade => <MenuItem key={grade} value={grade} primaryText={i18n.t(grade)} />)}
        </SelectField>

        <SelectField
          className='SingleForm-FirstStepField'
          value={letter}
          onChange={this._handleChangeField('letter')}
          floatingLabelText={i18n.t('LABEL_CLASSES_SELECT')}>
          {letters.map(letter => <MenuItem key={letter} value={letter} primaryText={i18n.t(letter)} />)}
        </SelectField>
      </div>
    )
  }

  get _thirdStep () {
    const {i18n} = this.context
    const {title, description} = this.state

    return (
      <div className='SingleForm-ThirdStep'>
        <TextField
          className='SingleForm-ThridStepField'
          value={title}
          onChange={this._handleChangeField('title')}
          floatingLabelText={!title ? i18n.t('LABEL_TITLE_INPUT') : false} />
        <TextField
          className='SingleForm-ThridStepField'
          value={description}
          onChange={this._handleChangeField('description')}
          multiLine
          floatingLabelText={!description ? i18n.t('LABEL_DESCRIPTION_INPUT') : false} />
      </div>
    )
  }

  get _fourthStep () {
    const {i18n} = this.context
    const {consent} = this.state

    return (
      <div className='SingleForm-FourthStep'>
        <ConsentToogle
          consent={consent}
          onConsentChange={({consent}) => {
            this.setState({consent})
          }}
          label={i18n.t('WARNING_SINGLE_FORM')} />
      </div>
    )
  }

  _handleChangeField = name => (event, index, value) => {
    this.setState({[name]: value || event.target.value})
  }

  _handleNext = () => {
    const {stepIndex, name, surname, school, grade, letter, image, consent, title, description} = this.state
    const {domain, i18n} = this.context
    this.setState({
      stepIndex: stepIndex + 1,
      displayOverlay: stepIndex >= 3
    })

    if (stepIndex === 3) {
      domain.get('save_studients_use_case').execute({name, surname, school, grade, letter, image, consent, title, description})
                                           .then(student => {
                                             this.setState({
                                               id: student.id,
                                               displayOverlay: false,
                                               snackMsg: i18n.t('FORM_SAVED')
                                             })
                                           })
    }
  }

  _handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  _shouldDisableAction = (step) => {
    const {name, surname, school, grade, letter, image} = this.state
    if (step === 0) {
      return !(name && surname && school && grade && letter)
    }

    if (step === 1) {
      return !image
    }

    if (step === 3) {
      return !(name && surname && school && grade && letter && image)
    }

    return false
  }

  _renderStepActions = (step) => {
    const {i18n} = this.context
    const {stepIndex} = this.state

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={i18n.t(stepIndex === 3 ? 'SAVE' : 'NEXT')}
          disabled={this._shouldDisableAction(step)}
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this._handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label={i18n.t('BACK')}
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this._handlePrev}
          />
        )}
      </div>
    )
  }
}

export default SingleForm
