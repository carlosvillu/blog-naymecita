/* eslint no-console:0 */
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Paper from 'material-ui/Paper'
import SearchIcon from 'material-ui/svg-icons/action/search'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const GRADES = [
  {literal: 'GRADE_2', grade: 2},
  {literal: 'GRADE_4', grade: 4},
  {literal: 'GRADE_8', grade: 8}
]

const lengthTerm = length => fn => ({term, grade}) => !term || term.length >= length ? fn({term, grade}) : null
const lengthTermThree = lengthTerm(3)
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { fn.apply(null, args) }, delay)
  }
}

class Search extends PureComponent {
  static displayName = 'Search'
  static contextTypes = {
    i18n: PropTypes.object,
    domain: PropTypes.object
  }

  state = {
    isExpanded: false,
    term: null,
    grade: null
  }

  componentDidMount () {
    const {term, grade} = this.state
    this._search({term, grade})
  }

  render () {
    const {isExpanded, term, grade} = this.state
    const {i18n} = this.context
    const advancedWrapperClassName = cx('Search-AdvancedWrapper', {
      'Search-AdvancedWrapper--isExpanded': isExpanded
    })

    return (
      <div className='Search'>
        <Paper className='Search-InputWrapper'>
          <SearchIcon />
          <input
            value={term}
            onChange={this._handleChangeField('term')}
            className='Search-Input'
            type='search'
            placeholder={i18n.t('SEARCH_PLACEHOLDER')} />
          {isExpanded ? <ExpandLess onClick={this._toogleExpand} /> : <ExpandMore onClick={this._toogleExpand} />}
        </Paper>
        <Paper className={advancedWrapperClassName}>
          <SelectField
            className='Search-GradeSelect'
            fullWidth
            floatingLabelText={i18n.t('GRADE')}
            value={grade}
            onChange={this._handleChangeField('grade')}
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

  _search = debounce(lengthTermThree(({term, grade}) => {
    const {domain} = this.context
    domain.get('list_studients_use_case').execute({term, grade})
  }), 250)

  _handleChangeField = name => (event, index, value) => {
    this.setState({[name]: value || event.target.value}, () => {
      const {term, grade} = this.state
      this._search({term, grade})
    })
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
