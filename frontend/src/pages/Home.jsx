import React from 'react'
import Hero from '../components/Hero'
import FeaturesBanner from '../components/FeaturesBanner'
import CollectionsSection from '../components/CollectionsSection'
import NewDrops from '../components/NewDrops'
import BestSellerSection from '../components/BestSellerSection'
import CultSection from '../components/CultSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesBanner />
      <CollectionsSection />
      <NewDrops />
      <BestSellerSection />
      <CultSection />
    </div>
  )
}

export default Home
