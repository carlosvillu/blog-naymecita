import React from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import Media from 'react-media'
import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'

import {Link} from 'react-router-dom'

const MQ = {maxWidth: 768}

const Grid = ({images = []}) => (
  <Media query={MQ}>
    { matches => (
      <GridList
        cols={matches ? 3 : 6}
        cellHeight='auto' >
        {images.map(tile => (
          <GridTile
            key={tile.image}
          >
            <Link to={`/detail/${tile.id}`}>
              <ImageLazyLoad aspectRatio={'16:9'} src={tile.image} />
            </Link>
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
    image: PropTypes.string.isRequired
  }))
}

export default Grid
