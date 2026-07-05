import React, { useContext, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { assets } from '../assets/assets'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
    const location = useLocation()

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const navLinks = [
        { path: '/collection', label: 'COLLECTIONS' },
        { path: '/drops', label: 'DROPS' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' },
    ]

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className='sticky top-0 z-50 flex items-center justify-between py-6 font-medium bg-offside-white/90 backdrop-blur-md'
        >
            {/* Logo */}
            <Link to='/' className='overflow-hidden'>
                <motion.div whileHover={{ scale: 1.05 }}>
                    <img src={assets.logo} alt="Offside" className="h-7 sm:h-8 w-auto object-contain mix-blend-multiply" />
                </motion.div>
            </Link>

            {/* Desktop Links */}
            <ul className='hidden sm:flex gap-10 text-xs font-bold text-gray-900 uppercase tracking-[0.2em] ml-12'>
                {navLinks.map((link) => (
                    <NavLink 
                        key={link.path} 
                        to={link.path} 
                        className='relative group overflow-hidden py-1 hover:text-offside-electric transition-colors'
                    >
                        {({ isActive }) => (
                            <>
                                <span className='relative z-10'>{link.label}</span>
                                <motion.div 
                                    className='absolute bottom-0 left-0 w-full h-[2px] bg-offside-electric origin-left'
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isActive ? 1 : 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                            </>
                        )}
                    </NavLink>
                ))}
            </ul>

            {/* Icons */}
            <div className='flex items-center gap-6'>
                <MagneticButton onClick={() => { setShowSearch(true); navigate('/collection') }}>
                    <Search className='w-5 h-5 text-gray-900 hover:text-offside-electric transition-colors' strokeWidth={1.5} />
                </MagneticButton>
                
                <MagneticButton>
                    <Heart className='w-5 h-5 text-gray-900 hover:text-offside-electric transition-colors' strokeWidth={1.5} />
                </MagneticButton>

                <Link to='/cart' className='relative'>
                    <MagneticButton>
                        <ShoppingBag className='w-5 h-5 text-gray-900 hover:text-offside-electric transition-colors' strokeWidth={1.5} />
                        {getCartCount() > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className='absolute -right-2 -bottom-2 w-4 text-center leading-4 bg-offside-electric text-white aspect-square rounded-full text-[9px] font-bold'
                            >
                                {getCartCount()}
                            </motion.span>
                        )}
                    </MagneticButton>
                </Link> 

                <div className='group relative'>
                    <MagneticButton onClick={() => token ? null : navigate('/login')}>
                        <User className='w-5 h-5 text-gray-900 hover:text-offside-electric transition-colors' strokeWidth={1.5} />
                    </MagneticButton>
                    
                    {/* Dropdown Menu */}
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-4 px-5 bg-white shadow-xl text-sm border border-gray-100'>
                            <p className='cursor-pointer hover:text-offside-electric transition-colors'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-offside-electric transition-colors'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-offside-electric transition-colors'>Logout</p>
                        </div>
                    </div>}
                </div> 

                <button onClick={() => setVisible(true)} className='sm:hidden'>
                    <Menu className='w-6 h-6 text-gray-900' />
                </button> 
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {visible && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className='fixed top-0 right-0 bottom-0 w-full h-screen bg-white z-50 flex flex-col'
                    >
                        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                            <h2 className='text-2xl font-black italic uppercase font-sans'>offside</h2>
                            <button onClick={() => setVisible(false)}>
                                <X className='w-8 h-8 text-gray-900' />
                            </button>
                        </div>
                        <div className='flex flex-col text-3xl font-black uppercase tracking-tighter p-8 gap-8 mt-10'>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <NavLink 
                                        onClick={() => setVisible(false)} 
                                        className='hover:text-offside-electric transition-colors' 
                                        to={link.path}
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
