import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestseller/>
      <Ourpolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
