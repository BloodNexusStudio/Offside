import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Collections = () => {
    const navigate = useNavigate()
    const { collections } = useContext(ShopContext)

    const handleExplore = (theme) => {
        navigate(`/collection?theme=${theme}`)
    }

    return (
        <div className="w-full pt-10 pb-20">
            {/* Header Section */}
            <div className="text-center mb-12">
                <p className="text-[#c6a87c] text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Collections</p>
                <h1 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tight text-offside-black mb-4">Explore Our Worlds</h1>
                <p className="text-gray-500 text-sm md:text-base">Five cultures. One mindset.</p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 h-auto lg:h-[700px]">
                {collections.map((col, index) => (
                    <div 
                        key={index}
                        className="group relative h-[400px] lg:h-full overflow-hidden rounded-md cursor-pointer"
                        onClick={() => handleExplore(col.name)}
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${col.image})` }}
                        ></div>
                        
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full text-white">
                            <div className="flex items-center gap-3 mb-2 opacity-80">
                                <span className="text-[#c6a87c] text-sm font-medium">0{index + 1}</span>
                                <div className="h-[1px] w-6 bg-[#c6a87c]"></div>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide uppercase mb-2">
                                {col.name}
                            </h2>
                            
                            <p className="text-sm text-gray-300 mb-8 max-w-[200px]">
                                {col.subtitle}
                            </p>

                            {/* Button */}
                            <button className="flex items-center justify-between w-full border border-white/30 bg-transparent px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                                <span>Explore Collection</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features Footer (Optional, matching mockup) */}
            <div className="mt-20 py-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <i className="ri-leaf-line text-2xl text-offside-black"></i>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-offside-black">Premium Fabric</h4>
                        <p className="text-xs text-gray-500 mt-1">240 GSM heavyweight cotton</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <i className="ri-shield-check-line text-2xl text-offside-black"></i>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-offside-black">Quality Assured</h4>
                        <p className="text-xs text-gray-500 mt-1">Built to last. Made to stand out.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <i className="ri-exchange-box-line text-2xl text-offside-black"></i>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-offside-black">Easy Returns</h4>
                        <p className="text-xs text-gray-500 mt-1">Hassle-free returns & exchange</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <i className="ri-lock-2-line text-2xl text-offside-black"></i>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-offside-black">Secure Checkout</h4>
                        <p className="text-xs text-gray-500 mt-1">100% safe and encrypted</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections
