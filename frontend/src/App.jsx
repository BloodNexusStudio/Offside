import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BestSellers from './pages/BestSellers'
import Collections from './pages/Collections'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Verify from './pages/Verify'
import Wishlist from './pages/Wishlist'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import ShippingPolicy from './pages/ShippingPolicy';

import Chatbot from './components/Chatbot';

const App = () => {
  const location = useLocation()

  return (
    <div className='min-h-screen flex flex-col'>
      <ScrollToTop />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <main className="flex-grow w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PageTransition><Home /></PageTransition>} />
            <Route path='/collection' element={<PageTransition><Collection /></PageTransition>} />
            <Route path='/best-sellers' element={<PageTransition><BestSellers /></PageTransition>} />
            <Route path='/collections' element={<PageTransition><Collections /></PageTransition>} />
            <Route path='/about' element={<PageTransition><About /></PageTransition>} />
            <Route path='/contact' element={<PageTransition><Contact /></PageTransition>} />
            <Route path='/product/:productId' element={<PageTransition><Product /></PageTransition>} />
            <Route path='/cart' element={<PageTransition><Cart /></PageTransition>} />
            <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
            <Route path='/place-order' element={<PageTransition><PlaceOrder /></PageTransition>} />
            <Route path='/orders' element={<PageTransition><Orders /></PageTransition>} />
            <Route path='/profile' element={<PageTransition><Profile /></PageTransition>} />
            <Route path='/verify' element={<PageTransition><Verify /></PageTransition>} />
            <Route path='/wishlist' element={<PageTransition><Wishlist /></PageTransition>} />
            <Route path='/privacy-policy' element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path='/terms-conditions' element={<PageTransition><TermsConditions /></PageTransition>} />
            <Route path='/shipping-policy' element={<PageTransition><ShippingPolicy /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Chatbot />
      <Footer />
    </div>
  )
}

export default App
