import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'

import StudentCard from '../StudentCard'
import AddStudent from '../AddStudent'
import ConsentToogle from '../ConsentToogle'
import LoadingOverlay from '../LoadingOverlay'

class MultipleForm extends PureComponent {
  static displayName = 'MultipleForm'

  static contextTypes = {
    i18n: PropTypes.object,
    domain: PropTypes.object
  }

  state = {
    students: [],
    consent: false,
    displayOverlay: false,
    grade: null,
    letter: null,
    name: '',
    snackMsg: '',
    school: null,
    stepIndex: 0,
    surname: '',
    finished: false
  }

  render () {
    const {stepIndex, displayOverlay, snackMsg} = this.state
    const {i18n} = this.context
    return (
      <div className='MultipleForm'>
        <Stepper activeStep={stepIndex} orientation='vertical'>
          <Step>
            <StepLabel>{i18n.t('FIRST_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._firstStep}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('SECOND_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._secondStep}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('THIRD_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._thirdStep}
            </StepContent>
          </Step>

        </Stepper>
        {this._renderStepActions(stepIndex)}
        <Snackbar
          open={!!snackMsg}
          message={i18n.t(snackMsg || '')}
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
      <div className='MultipleForm-FirstStep'>
        <TextField
          className='MultipleForm-FirstStepField'
          value={name}
          onChange={this._handleChangeField('name')}
          floatingLabelText={!name ? i18n.t('LABEL_NAME_INPUT') : false} />

        <TextField
          className='MultipleForm-FirstStepField'
          value={surname}
          onChange={this._handleChangeField('surname')}
          floatingLabelText={!surname ? i18n.t('LABEL_SURNAME_INPUT') : false} />

        <SelectField
          className='MultipleForm-FirstStepField'
          value={school}
          onChange={this._handleChangeField('school')}
          floatingLabelText={i18n.t('LABEL_SCHOOLS_SELECT')}>
          {schools.map(school => <MenuItem key={school} value={school} primaryText={i18n.t(school)} />)}
        </SelectField>

        <SelectField
          className='MultipleForm-FirstStepField'
          value={grade}
          onChange={this._handleChangeField('grade')}
          floatingLabelText={i18n.t('LABEL_GRADES_SELECT')}>
          {grades.map(grade => <MenuItem key={grade} value={grade} primaryText={i18n.t(grade)} />)}
        </SelectField>

        <SelectField
          className='MultipleForm-FirstStepField'
          value={letter}
          onChange={this._handleChangeField('letter')}
          floatingLabelText={i18n.t('LABEL_CLASSES_SELECT')}>
          {letters.map(letter => <MenuItem key={letter} value={letter} primaryText={i18n.t(letter)} />)}
        </SelectField>
      </div>
    )
  }

  get _secondStep () {
    const {students, stepIndex} = this.state
    return (
      <div className='MultipleForm-SecondStep'>
        {students.map(
          ({name, surname, image}, index) =>
            <StudentCard
              onClickDelete={this._handleClickDeleteStudent(index)}
              key={`${name}-${surname}`}
              name={name}
              surname={surname}
              image={image} />
        )}
        <AddStudent disabled={stepIndex !== 1} onStudentAdd={student => {
          this.setState({
            students: [
              ...this.state.students,
              student
            ]
          })
        }} />
      </div>
    )
  }

  get _thirdStep () {
    const {i18n} = this.context
    const {consent} = this.state

    return (
      <div className='MultipleForm-ThirdStep'>
        <ConsentToogle
          consent={consent}
          onConsentChange={({consent}) => {
            this.setState({consent})
          }}
          label={i18n.t('WARNING_MULTIPLE_FORM')} />
      </div>
    )
  }

  _handleClickDeleteStudent = index => () => {
    this.setState({
      students: [
        ...this.state.students.slice(0, index),
        ...this.state.students.slice(index + 1)
      ]
    })
  }

  _handleChangeField = name => (event, index, value) => {
    this.setState({[name]: value || event.target.value})
  }

  _handleNext = () => {
    const {stepIndex, students, consent, school, grade, letter} = this.state
    const {domain, i18n} = this.context
    this.setState({
      stepIndex: stepIndex + 1,
      displayOverlay: stepIndex >= 2
    })

    if (stepIndex === 2) {
      const fullStudents = students.map(student => ({
        ...student,
        school,
        grade,
        consent,
        letter
      }))
      Promise.all(
        fullStudents.map(
          student => domain.get('save_studients_use_case').execute(student)
        )
      ).then(students => {
        this.setState({
          displayOverlay: false,
          snackMsg: i18n.t('FORM_SAVED'),
          finished: true
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

  _shouldDisableAction = step => {
    const {name, surname, school, grade, letter, students} = this.state

    if (step === 0) {
      return !(name && surname && school && grade && letter)
    }

    if (step === 1) {
      return students.length === 0
    }
  }

  _renderStepActions = step => {
    const {i18n} = this.context
    const {stepIndex, finished} = this.state

    if (finished) { return null }

    return (
      <div style={{margin: '12px 0', padding: '14px'}}>
        <RaisedButton
          label={i18n.t(stepIndex >= 2 ? 'SAVE' : 'NEXT')}
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

export default MultipleForm
