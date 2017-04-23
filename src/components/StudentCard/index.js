import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardHeader,
  CardActions,
  CardMedia
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'

class StudentCard extends PureComponent {
  static contextTypes = {
    i18n: PropTypes.object
  }
  static propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
    image: PropTypes.string,
    onClickDelete: PropTypes.func
  }
  state = {
    expanded: false
  }

  render () {
    const {name, surname, image} = this.props
    const {i18n} = this.context
    return (
      <div className='StudentCard'>
        <Card className='StudentCard-Card' expanded={this.state.expanded} onExpandChange={this._handleExpandChange}>
          <CardHeader
            title={name}
            subtitle={surname}
            actAsExpander
            showExpandableButton />
          <CardMedia expandable>
            <ImageLazyLoad aspectRatio={'4:3'} src={image} />
          </CardMedia>
          <CardActions expandable>
            <FlatButton secondary label={i18n.t('REMOVE')} onClick={(e) => {
              this.props.onClickDelete(e)
            }} />
          </CardActions>
        </Card>
      </div>
    )
  }

  _handleExpandChange = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }
}

export default StudentCard
