import React from 'react'
import Hero from '../components/Hero'
import FeaturesBanner from '../components/FeaturesBanner'
import CollectionsSection from '../components/CollectionsSection'
import NewDrops from '../components/NewDrops'
import BestSellerSection from '../components/BestSellerSection'
import CultSection from '../components/CultSection'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Offside",
    "url": "https://theoffside.in",
    "logo": "https://theoffside.in/logo.png",
    "description": "Premium streetwear crafted from high-quality 100% premium cotton.",
    "sameAs": [
      "https://instagram.com/theoffside.in"
    ]
  };

  return (
    <div>
      <SEO 
        title="Home"
        schema={organizationSchema}
      />
      <Hero />
      <FeaturesBanner />
      <CollectionsSection />
      <NewDrops />
    </div>
  )
}

export default Home
