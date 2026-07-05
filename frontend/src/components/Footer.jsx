import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Link to="/" className="text-3xl font-black text-white tracking-tight">OFFSIDE</Link>
          </div>
          <p className="text-gray-400 max-w-sm mb-6 font-medium leading-relaxed">
            Complete your style with awesome clothes from us. Live for influential and innovative streetwear!
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-offside-primary text-black rounded-lg flex items-center justify-center text-xl hover:bg-white transition-colors">
               <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-offside-primary text-black rounded-lg flex items-center justify-center text-xl hover:bg-white transition-colors">
               <i className="ri-instagram-line"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-offside-primary text-black rounded-lg flex items-center justify-center text-xl hover:bg-white transition-colors">
               <i className="ri-twitter-fill"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-medium">About</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact Us</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Support</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Store Location</Link></li>
            <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors font-medium">Order Tracking</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Size Guide</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Legal</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Terms & Conditions</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 font-medium text-sm">
        Copyright © 2026 OFFSIDE. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
