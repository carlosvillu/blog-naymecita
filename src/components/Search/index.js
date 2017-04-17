import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Paper from 'material-ui/Paper'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import './index.scss'

const GRADES = [
  {literal: 'GRADE_2', grade: 2},
  {literal: 'GRADE_4', grade: 4},
  {literal: 'GRADE_8', grade: 8}
]

class Search extends PureComponent {
  static displayName = 'Search'
  static contextTypes = {
    i18n: PropTypes.object
  }

  state = {
    isExpanded: false,
    grade: null
  }

  render () {
    const {isExpanded} = this.state
    const {i18n} = this.context
    const advancedWrapperClassName = cx('Search-AdvancedWrapper', {
      'Search-AdvancedWrapper--isExpanded': isExpanded
    })

    return (
      <div className='Search'>
        <Paper className='Search-InputWrapper'>
          <SearchIcon />
          <input className='Search-Input' type='search' placeholder={i18n.t('SEARCH_PLACEHOLDER')} />
          {isExpanded ? <ExpandLess onClick={this._toogleExpand} /> : <ExpandMore onClick={this._toogleExpand} />}
        </Paper>
        <Paper className={advancedWrapperClassName}>
          <SelectField
            className='Search-GradeSelect'
            fullWidth
            floatingLabelText={i18n.t('GRADE')}
            value={this.state.grade}
            onChange={(event, index, value) => this.setState({grade: value})}
          >
            <MenuItem value={0} primaryText={i18n.t('SHOW_ALL')} />
            {GRADES.map(
              ({literal, grade}) => <MenuItem key={grade} value={grade} primaryText={i18n.t(literal)} />
            )}
          </SelectField>
        </Paper>
      </div>
    )
  }

  _toogleExpand = () => {
    const nextIsExpanded = !this.state.isExpanded
    this.setState({
      isExpanded: nextIsExpanded,
      grade: !nextIsExpanded ? null : this.state.grade
    })
  }
}

Search.displayName = 'Search'

export default Search
