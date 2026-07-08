import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const ProductItem = ({ id, image, name, price, mainPrice }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer block group' to={`/product/${id}`}>
            <div className='relative overflow-hidden bg-gray-100 p-6 sm:p-10 mb-4 aspect-[4/5] sm:aspect-square flex items-center justify-center'>
                
                {/* Badges */}
                <div className='absolute top-4 left-4 bg-offside-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-wider'>
                    NEW
                </div>
                <div className='absolute top-4 right-4 z-10'>
                    <Heart className='w-5 h-5 text-gray-400 hover:text-offside-black transition-colors stroke-[1.5]' />
                </div>

                <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='w-full h-full object-contain mix-blend-multiply' 
                    src={image[0]} 
                    alt={name} 
                />
            </div>
            
            <p className='pt-1 pb-1 text-xs font-bold text-offside-black uppercase tracking-wider'>{name}</p>
            <div className='flex items-center gap-2 mb-2'>
                {mainPrice > 0 && <p className='text-[13px] font-medium text-gray-400 line-through'>{currency}{mainPrice}</p>}
                <p className='text-[13px] font-bold text-gray-800'>{currency}{price}</p>
            </div>
            
            {/* Color Swatches */}
            <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-offside-black border border-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400 border border-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-offside-white border border-gray-200"></div>
            </div>
        </Link>
    )
}

export default ProductItem
