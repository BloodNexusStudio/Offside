import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link onClick={() => scrollTo(0, 0)} className='group text-offside-black cursor-pointer flex flex-col max-w-[400px] mx-auto w-full' to={`/product/${id}`}>
            <div className='overflow-hidden relative bg-offside-light aspect-[4/5] rounded-2xl mb-4'>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className='w-full h-full object-cover mix-blend-multiply' 
                    src={image[0]} 
                    alt={name} 
                />
            </div>
            <div className='flex items-center justify-between gap-4'>
                <div className="flex-1 min-w-0">
                    <h4 className='text-lg sm:text-xl font-medium text-offside-black truncate'>{name}</h4>
                    <p className='text-base font-medium text-gray-500 group-hover:text-offside-primary transition-colors'>Explore Now</p>
                </div>
                <span className='text-gray-500 shrink-0'>
                    <ArrowRight strokeWidth={2} className="w-6 h-6" />
                </span>
            </div>
        </Link>
    )
}

export default ProductItem
