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
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const location = useLocation()

  return (
    <div className='min-h-screen bg-offside-white flex flex-col'>
      <ScrollToTop />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <main className="flex-grow w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PageTransition><Home /></PageTransition>} />
            <Route path='/collection' element={<PageTransition><Collection /></PageTransition>} />
            <Route path='/about' element={<PageTransition><About /></PageTransition>} />
            <Route path='/contact' element={<PageTransition><Contact /></PageTransition>} />
            <Route path='/product/:productId' element={<PageTransition><Product /></PageTransition>} />
            <Route path='/cart' element={<PageTransition><Cart /></PageTransition>} />
            <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
            <Route path='/place-order' element={<PageTransition><PlaceOrder /></PageTransition>} />
            <Route path='/orders' element={<PageTransition><Orders /></PageTransition>} />
            <Route path='/profile' element={<PageTransition><Profile /></PageTransition>} />
            <Route path='/verify' element={<PageTransition><Verify /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
