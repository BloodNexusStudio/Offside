import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'

const CollectionProductItem = ({ id, image, name, price, mainPrice }) => {
    const { currency, favourites, toggleFavourite } = useContext(ShopContext);

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
                    loading="lazy"
                />

                {/* Top Badges */}
                <div className='absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-wider rounded-sm'>
                    NEW
                </div>
                <motion.div 
                    whileTap={{ scale: 0.8 }}
                    className='absolute top-4 right-4 z-20 cursor-pointer' 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavourite(id); }}
                >
                    <motion.div
                        initial={false}
                        animate={favourites?.includes(id) ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart className={`w-5 h-5 transition-colors stroke-[1.5] ${favourites?.includes(id) ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-white/70 hover:text-white'}`} />
                    </motion.div>
                </motion.div>

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
