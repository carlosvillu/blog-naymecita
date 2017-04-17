import React from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import Media from 'react-media'
import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'

import '@schibstedspain/sui-image-lazy-load/lib/index.scss'

const MQ = {maxWidth: 768}
const IMAGES = Array.apply(null, Array(90))
                    .map((_, id) => ({id, img: `https://unsplash.it/200/300/?random&__c=${Math.random()}`}))

const Grid = ({images = IMAGES}) => (
  <Media query={MQ}>
    { matches => (
      <GridList
        cols={matches ? 3 : 6}
        cellHeight='auto' >
        {images.map(tile => (
          <GridTile
            key={tile.img}
          >
            <ImageLazyLoad aspectRatio={'16:9'} src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    )}
  </Media>
)

Grid.displayName = 'Grid'
Grid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  }))
}

export default Grid
