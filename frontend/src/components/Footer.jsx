import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-offside-black text-white pt-24 pb-8 px-6 sm:px-12 w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-800 pb-16">
        
        {/* Left Side - Brand */}
        <div className="md:col-span-4 lg:col-span-5">
          <Link to="/" className="text-4xl font-heading font-bold text-white tracking-wide uppercase block mb-6">OFFSIDE</Link>
          <p className="text-sm text-gray-400 max-w-xs mb-8 leading-relaxed">
            Minimalist. Timeless. Unapologetic.<br/>
            ESTD. 2026
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
               <i className="ri-instagram-line text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
               <i className="ri-tiktok-fill text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
               <i className="ri-youtube-fill text-xl"></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Shop</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/collection" className="text-sm font-medium hover:text-gray-400 transition-colors">All Products</Link></li>
            <li><Link to="/collection" className="text-sm font-medium hover:text-gray-400 transition-colors">T-Shirts</Link></li>
            <li><Link to="/collection" className="text-sm font-medium hover:text-gray-400 transition-colors">Bottomwear</Link></li>
            <li><Link to="/collection" className="text-sm font-medium hover:text-gray-400 transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Company</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/about" className="text-sm font-medium hover:text-gray-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-sm font-medium hover:text-gray-400 transition-colors">Lookbook</Link></li>
            <li><Link to="#" className="text-sm font-medium hover:text-gray-400 transition-colors">Size Guide</Link></li>
            <li><Link to="/contact" className="text-sm font-medium hover:text-gray-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Brand Ethos */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">The Offside Rule</h4>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Style doesn't have to shout to be noticed. We create minimal, timeless pieces for those who choose to stand apart from the noise.
          </p>
          <div className="text-white font-bold tracking-widest text-sm uppercase">
            Stand out. Blend in.
          </div>
        </div>

      </div>

      {/* Bottom Legal */}
      <div className="max-w-[1400px] mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
        <p>© OFFSIDE 2026. All rights reserved.</p>
        <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
