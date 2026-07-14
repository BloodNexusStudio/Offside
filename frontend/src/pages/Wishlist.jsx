import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import { X, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

const Wishlist = () => {
    const { products, currency, favourites, toggleFavourite, navigate } = useContext(ShopContext);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = favourites.map(id => {
                return products.find(product => product._id === id);
            }).filter(Boolean); // Remove undefined if product not found
            setWishlistData(tempData);
        }
    }, [favourites, products]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-8'>
                <Title text1={'YOUR'} text2={'WISHLIST'} />
            </div>

            {wishlistData.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 text-center'>
                    <div className='w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center'>
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-heading uppercase tracking-widest text-offside-black mb-4'>Your wishlist is empty</h2>
                    <p className='text-gray-500 mb-8'>Save your favorite items here to easily find them later.</p>
                    <Link to='/collection' className='bg-offside-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity'>
                        Explore Collection
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {wishlistData.map((item, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            key={index} 
                            className='group relative border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'
                        >
                            <Link to={`/product/${item._id}`} className='block relative aspect-[4/5] overflow-hidden bg-gray-50'>
                                <img 
                                    src={item.image[0]} 
                                    alt={item.name} 
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                    loading="lazy"
                                />
                                {item.bestseller && (
                                    <div className='absolute top-3 left-3 bg-offside-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider'>
                                        BESTSELLER
                                    </div>
                                )}
                                {!item.sizes || item.sizes.length === 0 && (
                                     <div className='absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm'>
                                        OUT OF STOCK
                                    </div>
                                )}
                            </Link>

                            <button 
                                onClick={(e) => { e.preventDefault(); toggleFavourite(item._id); }}
                                className='absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10'
                            >
                                <X className='w-4 h-4' />
                            </button>

                            <div className='p-4'>
                                <Link to={`/product/${item._id}`}>
                                    <h3 className='text-xs sm:text-sm font-bold text-offside-black uppercase tracking-wider mb-1 line-clamp-1'>{item.name}</h3>
                                </Link>
                                <div className='flex items-center gap-2 mb-4'>
                                    {item.mainPrice > 0 && <span className='text-xs text-gray-400 line-through'>{currency}{item.mainPrice}</span>}
                                    <span className='text-sm font-bold text-offside-black'>{currency}{item.price}</span>
                                </div>

                                <button 
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    className='w-full flex items-center justify-center gap-2 border border-offside-black text-offside-black py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-offside-black hover:text-white transition-colors'
                                >
                                    <ShoppingBag className='w-3 h-3' /> View Product
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist
