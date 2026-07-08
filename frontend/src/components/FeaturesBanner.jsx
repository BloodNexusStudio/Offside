import React from 'react'
import { ShieldCheck, Shirt, Clock, Lock } from 'lucide-react'

const FeaturesBanner = () => {
  return (
    <div className="bg-white text-offside-black py-10 px-6 sm:px-12 w-full border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8 first:pl-0 first:pt-0">
          <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest">Premium Quality</h3>
            <p className="text-[10px] text-gray-500 font-medium">Built to last.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
          <Shirt className="w-6 h-6 stroke-[1.5]" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest">Oversized Fit</h3>
            <p className="text-[10px] text-gray-500 font-medium">Street ready.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
          <Clock className="w-6 h-6 stroke-[1.5]" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest">Limited Drops</h3>
            <p className="text-[10px] text-gray-500 font-medium">No restocks.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
          <Lock className="w-6 h-6 stroke-[1.5]" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest">Secure Payments</h3>
            <p className="text-[10px] text-gray-500 font-medium">100% safe checkout.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FeaturesBanner
