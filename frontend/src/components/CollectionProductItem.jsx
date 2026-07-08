import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'

const CollectionProductItem = ({ id, image, name, price, mainPrice }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className='cursor-pointer block group rounded-md overflow-hidden' to={`/product/${id}`}>
            <div className='relative overflow-hidden aspect-[4/5] bg-gray-900'>
                
                {/* Background Image */}
                <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className='w-full h-full object-cover opacity-90' 
                    src={image[0]} 
                    alt={name} 
                />

                {/* Top Badges */}
                <div className='absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-wider rounded-sm'>
                    NEW
                </div>
                <div className='absolute top-4 right-4 z-10'>
                    <Heart className='w-5 h-5 text-white/70 hover:text-white transition-colors stroke-[1.5]' />
                </div>

                {/* Bottom Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none'></div>

                {/* Content Overlay */}
                <div className='absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between'>
                    <div>
                        <p className='text-xs sm:text-sm font-bold text-white uppercase tracking-widest leading-tight mb-1'>{name}</p>
                        <div className='flex items-center gap-2 mb-3'>
                            {mainPrice > 0 && <p className='text-[11px] sm:text-xs font-medium text-gray-400 line-through'>{currency}{mainPrice.toLocaleString('en-IN')}</p>}
                            <p className='text-[11px] sm:text-xs font-medium text-white'>{currency}{price.toLocaleString('en-IN')}</p>
                        </div>
                        
                        {/* Color Swatches */}
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-transparent border-[1.5px] border-white/50 cursor-pointer hover:border-white transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-transparent cursor-pointer hover:bg-white/40 transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/40 border border-transparent cursor-pointer hover:bg-white/60 transition-colors"></div>
                        </div>
                    </div>

                    {/* Plus Button */}
                    <div className='w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer'>
                        <Plus className='w-4 h-4 stroke-[2]' />
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default CollectionProductItem
