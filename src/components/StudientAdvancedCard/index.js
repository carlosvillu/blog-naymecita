import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'

import Loading from '../Loading'

const STUDENT = {
  name: 'Naymecita',
  surname: 'Salas',
  school: 'Tierno Galvan',
  grade: '2º Primaria',
  letter: 'A',
  image: `https://unsplash.it/4000/3000/?random&__c=${Math.random()}`,
  consent: true,
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt turpis eu magna auctor hendrerit. Quisque bibendum erat nec nunc porta, venenatis sollicitudin arcu ultrices. Curabitur dignissim velit ut est maximus gravida vitae bibendum ipsum. Curabitur sit amet ligula facilisis, maximus purus in, rhoncus augue. Quisque lacinia mauris eget nulla tempus fringilla. Nulla sollicitudin sit amet arcu et sollicitudin. Duis et elit vel augue faucibus sodales'
}

class StudientAdvancedCard extends PureComponent {
  static displayName = 'StudientAdvancedCard'
  static contextTypes = {
    i18n: PropTypes.object
  }
  static propTypes = {
    studentID: PropTypes.string
  }

  state = {
    student: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        student: STUDENT
      })
    }, 0)
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
    return (
      <div className='StudientAdvancedCard-Info'>
        <Card>
          <CardHeader
            title={title || grade}
            subtitle={title ? grade : ''}
          />
          <CardMedia>
            <ImageLazyLoad src={image} aspectRatio={'4:3'} />
          </CardMedia>
          {consent && <CardTitle title={name} subtitle={surname} />}
          {description && <CardText>{description}</CardText>}
        </Card>
        <FloatingActionButton secondary className='StudientAdvancedCard-FAV'>
          <FileDownload />
        </FloatingActionButton>
      </div>
    )
  }
}

export default StudientAdvancedCard
