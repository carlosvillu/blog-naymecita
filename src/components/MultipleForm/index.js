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

import StudentCard from '../StudentCard'
import AddStudent from '../AddStudent'
import ConsentToogle from '../ConsentToogle'

const SCHOOLS = [
  {name: 'Tierno Galben'},
  {name: 'Pablo Picasso'},
  {name: 'Escuela 43'}
]

const GRADES = [
  {grade: '2º Primaria'},
  {grade: '4º Primaria'},
  {grade: '2º ESO'}
]

const CLASSES = [
  {'letter': 'A'},
  {'letter': 'B'},
  {'letter': 'C'},
  {'letter': 'D'}
]

const STUDENTS = Array.apply(null, new Array(2))
  .map((_, index) =>
    ({
      name: `Naymecita ${index}`,
      surname: 'Salitas',
      image: `https://unsplash.it/4000/3000/?random&__c=${Math.random()}`
    }))

class MultipleForm extends PureComponent {
  static displayName = 'MultipleForm'

  static contextTypes = {
    i18n: PropTypes.object
  }

  static propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
    grades: PropTypes.arrayOf(PropTypes.shape({
      grade: PropTypes.string
    })),
    classes: PropTypes.arrayOf(PropTypes.shape({
      'letter': PropTypes.string
    }))
  }

  static defaultProps = {
    schools: SCHOOLS,
    grades: GRADES,
    classes: CLASSES
  }

  state = {
    students: STUDENTS,
    consent: false,
    finished: false,
    grade: null,
    letter: null,
    name: null,
    snackMsg: null,
    school: null,
    stepIndex: 0,
    surname: null
  }

  render () {
    const {stepIndex} = this.state
    const {i18n} = this.context
    return (
      <div className='MultipleForm'>
        <Stepper activeStep={stepIndex} orientation='vertical'>
          <Step>
            <StepLabel>{i18n.t('FIRST_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._firstStep}
              {this._renderStepActions(0)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('SECOND_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._secondStep}
              {this._renderStepActions(1)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>{i18n.t('THIRD_STEP_MULTIPLE')}</StepLabel>
            <StepContent className='MultipleForm-FirstStepWrapper'>
              {this._thirdStep}
              {this._renderStepActions(2)}
            </StepContent>
          </Step>

        </Stepper>
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

  get _firstStep () {
    const {i18n} = this.context
    const {name, surname, school, grade, letter} = this.state
    const {schools, grades, classes} = this.props
    return (
      <div className='MultipleForm-FirstStep'>
        <TextField
          value={name}
          onChange={this._handleChangeField('name')}
          floatingLabelText={!name ? i18n.t('LABEL_NAME_INPUT') : false} />

        <TextField
          value={surname}
          onChange={this._handleChangeField('surname')}
          floatingLabelText={!surname ? i18n.t('LABEL_SURNAME_INPUT') : false} />

        <SelectField
          value={school}
          onChange={this._handleChangeField('school')}
          floatingLabelText={i18n.t('LABEL_SCHOOLS_SELECT')}>
          {schools.map(({name}) => <MenuItem key={name} value={name} primaryText={name} />)}
        </SelectField>

        <SelectField
          value={grade}
          onChange={this._handleChangeField('grade')}
          floatingLabelText={i18n.t('LABEL_GRADES_SELECT')}>
          {grades.map(({grade}) => <MenuItem key={grade} value={grade} primaryText={grade} />)}
        </SelectField>

        <SelectField
          value={letter}
          onChange={this._handleChangeField('letter')}
          floatingLabelText={i18n.t('LABEL_CLASSES_SELECT')}>
          {classes.map(({letter}) => <MenuItem key={letter} value={letter} primaryText={letter} />)}
        </SelectField>
      </div>
    )
  }

  get _secondStep () {
    const {students} = this.state
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
          label={i18n.t('WARNING_SINGLE_FORM')} />
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
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3
    })
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
    const {stepIndex} = this.state

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={i18n.t(stepIndex === 2 ? 'SAVE' : 'NEXT')}
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
