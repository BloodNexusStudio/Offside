import React from 'react'
import Hero from '../components/Hero'
import FeaturesBanner from '../components/FeaturesBanner'
import CollectionsSection from '../components/CollectionsSection'
import BestSeller from '../components/BestSeller'
import CultSection from '../components/CultSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesBanner />
      <CollectionsSection />
      <BestSeller />
      <CultSection />
    </div>
  )
}

export default Home
