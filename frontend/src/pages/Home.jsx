import React from 'react'
import Hero from '../components/Hero'
import ScrollingBanner from '../components/ScrollingBanner'
import LatestCollection from '../components/LatestCollection'
import PaydaySale from '../components/PaydaySale'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <ScrollingBanner />
      <LatestCollection/>
      <PaydaySale />
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
