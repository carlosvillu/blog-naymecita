import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'

import Loading from '../Loading'

class StudientAdvancedCard extends PureComponent {
  static displayName = 'StudientAdvancedCard'
  static contextTypes = {
    i18n: PropTypes.object,
    domain: PropTypes.object
  }
  static propTypes = {
    studentID: PropTypes.string
  }

  state = {
    student: false
  }

  async componentDidMount () {
    const {studentID} = this.props
    const {domain} = this.context

    const student = await domain.get('get_studients_use_case').execute({id: studentID})
    this.setState({student})
  }

  render () {
    const {student} = this.state
    const {i18n} = this.context

    return (
      <div className='StudientAdvancedCard'>
        {!student ? (<Loading label={i18n.t('LOADING_STUDENT_DATA')} />) : this._detail}
      </div>
    )
  }

  get _detail () {
    const {name, surname, grade, image, consent, title, description} = this.state.student
    const {i18n} = this.context
    return (
      <div className='StudientAdvancedCard-Info'>
        <Card>
          <CardHeader
            title={i18n.t(title || grade)}
            subtitle={i18n.t(title ? grade : '')}
          />
          <CardMedia>
            <img src={image} />
          </CardMedia>
          {consent && <CardTitle title={name} subtitle={surname} />}
          {description && <CardText>{description}</CardText>}
        </Card>
        <a href={image} download>
          <FloatingActionButton secondary className='StudientAdvancedCard-FAV'>
            <FileDownload />
          </FloatingActionButton>
        </a>
      </div>
    )
  }
}

export default StudientAdvancedCard
