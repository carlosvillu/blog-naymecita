import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import Delete from 'material-ui/svg-icons/action/delete'

import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'

// import './index.scss'

class ImageSelect extends PureComponent {
  static displayName = 'ImageSelect'
  static contextTypes = {
    i18n: PropTypes.object
  }

  static propTypes = {
    onChangeImage: PropTypes.func,
    deletable: PropTypes.bool,
    image: PropTypes.object
  }

  static defaultProps = {
    image: false,
    deletable: true
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      // image: `https://unsplash.it/4000/3000/?random&__c=${Math.random()}`
      image: props.image
    }
  }

  render () {
    const {image} = this.state
    return (
      <div className='ImageSelect'>
        { image ? this._preview : this._chooser}
      </div>
    )
  }

  get _preview () {
    const {image} = this.state
    const {deletable} = this.props
    return (
      <div className='ImageSelect-ImageWrapper'>
        <ImageLazyLoad aspectRatio={'4:3'} className='ImageSelect-Image' src={image} />
        {deletable && <Delete className='ImageSelect-Remove' onClick={() => {
          this.setState({image: false})
          this.props.onChangeImage({image: false})
        }} />}
      </div>
    )
  }

  get _chooser () {
    const {i18n} = this.context
    return (
      <label className='ImageSelect-Label' htmlFor='upload'>
        <Paper className='ImageSelect-Paper'>
          <FileUpload />
          <p className='ImageSelect-Claim'>{i18n.t('UPLOAD_PHOTO')}</p>
        </Paper>
        <input className='ImageSelect-Input' type='file' id='upload' onChange={e => {
          const image = window.URL.createObjectURL(e.target.files[0])
          this.setState({image})
          this.props.onChangeImage({image})
        }} />
      </label>
    )
  }
}

export default ImageSelect
