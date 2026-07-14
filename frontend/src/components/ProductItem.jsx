import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const ProductItem = ({ id, image, name, price, mainPrice }) => {
    const { currency, favourites, toggleFavourite } = useContext(ShopContext);

    return (
        <Link className='relative text-gray-700 cursor-pointer block group bg-[#ebe9e1]/40 backdrop-blur-sm border border-gray-300/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300' to={`/product/${id}`}>
            
            {/* Heart Icon outside image */}
            <div 
                className='absolute top-4 right-4 z-20 cursor-pointer'
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavourite(id); }}
            >
                <Heart className={`w-5 h-5 transition-colors stroke-[1.2] ${favourites?.includes(id) ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-gray-500 hover:text-offside-black'}`} />
            </div>

            <div className='relative overflow-hidden mb-5 aspect-[4/5] bg-gray-200'>
                {/* Badges */}
                <div className='absolute top-0 left-0 bg-offside-black text-white text-[10px] font-bold px-3 py-1.5 z-10 uppercase tracking-wider'>
                    NEW
                </div>

                <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='w-full h-full object-cover mix-blend-multiply' 
                    src={image[0]} 
                    alt={name} 
                />
            </div>
            
            <p className='pt-1 pb-1 text-[11px] sm:text-xs font-bold text-offside-black uppercase tracking-wider'>{name}</p>
            <div className='flex items-center gap-2 mb-3'>
                {mainPrice > 0 && <p className='text-[13px] font-medium text-gray-400 line-through'>{currency}{mainPrice}</p>}
                <p className='text-[13px] font-bold text-gray-800'>{currency}{price}</p>
            </div>
            
            {/* Color Swatches */}
            <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-offside-black shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm border border-gray-200"></div>
            </div>
        </Link>
    )
}

export default ProductItem
