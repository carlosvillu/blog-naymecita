import React from 'react'

import Grid from '../components/Grid'
import FAVMenu from '../components/FAVMenu'
import Search from '../components/Search'

const Home = () => (
  <div className='Home'>
    <div className='Home-SearchWrapper'><Search /></div>
    <div className='Home-GridWrapper'><Grid /></div>
    <div className='Home-FAVWrapper'><FAVMenu /></div>
  </div>
)

Home.displayName = 'Home'

export default Home
