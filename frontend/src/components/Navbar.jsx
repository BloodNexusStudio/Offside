import React, { useContext, useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Reset visibility when route changes
    useEffect(() => {
        setVisible(false);
    }, [location.pathname]);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    // Scroll effect for dynamic styling
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

  return (
    <>
        {/* Top Banner */}
        <div className="bg-offside-black text-offside-white text-[10px] sm:text-xs font-bold py-2 text-center uppercase tracking-widest relative z-[60]">
            Free shipping on orders above ₹1999
        </div>

        <div className={`sticky top-0 w-full z-50 transition-all duration-300 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] 
            ${scrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50' : 'py-6 bg-offside-white border-b border-gray-200'}`}>
            <div className='flex items-center justify-between'>
                
                <Link to='/' className="flex items-center gap-2 relative z-50">
                    <img src={assets.logo} alt="OFFSIDE" className="h-6 sm:h-10 scale-[1.5] sm:scale-[2.5] origin-left object-contain" />
                </Link>

                <ul className='hidden lg:flex gap-12 text-[13px] font-bold uppercase tracking-widest text-offside-black'>
                    <NavLink to='/' className='group flex flex-col items-center gap-1 relative'>
                        <span className='hover:opacity-60 transition-opacity'>SHOP</span>
                        <hr className='w-full border-none h-[1.5px] bg-offside-black absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </NavLink>
                    <NavLink to='/collection' className='group flex flex-col items-center gap-1 relative'>
                        <span className='hover:opacity-60 transition-opacity flex items-center gap-1'>COLLECTIONS <ChevronDown className="w-3 h-3" /></span>
                        <hr className='w-full border-none h-[1.5px] bg-offside-black absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </NavLink>
                    <NavLink to='/about' className='group flex flex-col items-center gap-1 relative'>
                        <span className='hover:opacity-60 transition-opacity'>ABOUT</span>
                        <hr className='w-full border-none h-[1.5px] bg-offside-black absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </NavLink>
                    <NavLink to='/collection' className='group flex flex-col items-center gap-1 relative'>
                        <span className='hover:opacity-60 transition-opacity'>NEW LAUNCH</span>
                        <hr className='w-full border-none h-[1.5px] bg-offside-black absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-6 text-offside-black'>
                    <Search onClick={()=> { setShowSearch(true); navigate('/collection') }} className='w-[22px] h-[22px] cursor-pointer stroke-[1.5] hover:opacity-60 transition-opacity' />
                    
                    <div className='group relative'>
                        <User onClick={()=> token ? null : navigate('/login') } className='w-[22px] h-[22px] cursor-pointer stroke-[1.5] hover:opacity-60 transition-opacity' />
                        {/* Dropdown Menu */}
                        {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-40 py-4 px-6 bg-white border border-gray-100 shadow-xl rounded-none font-medium'>
                                <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:opacity-60 transition-opacity'>My Profile</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:opacity-60 transition-opacity'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:opacity-60 transition-opacity'>Logout</p>
                            </div>
                        </div>}
                    </div> 
                    
                    <Link to='/cart' className='relative'>
                        <ShoppingBag className='w-[22px] h-[22px] stroke-[1.5] hover:opacity-60 transition-opacity' />
                        <p className='absolute -right-1.5 -bottom-1.5 w-[18px] h-[18px] text-center leading-[18px] bg-offside-black text-white aspect-square rounded-full text-[10px] font-bold shadow-sm'>{getCartCount()}</p>
                    </Link>
                    
                    <Menu onClick={()=>setVisible(true)} className='w-6 h-6 cursor-pointer lg:hidden stroke-[1.5]' />
                </div>
            </div>
        </div>

        {/* Sidebar Menu For Small Screens */}
        <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-[60] transition-all duration-500 ${visible ? 'w-full h-screen' : 'w-0 h-0'}`}>
            <div className='flex flex-col text-offside-black h-full relative'>
                <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                    <img src={assets.logo} alt="OFFSIDE" className="h-10 sm:h-12 object-contain" />
                    <div onClick={()=>setVisible(false)} className='cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <X className='w-6 h-6 stroke-[1.5]' />
                    </div>
                </div>
                <div className="flex flex-col px-10 py-10 gap-6">
                    <NavLink onClick={()=>setVisible(false)} className='text-3xl font-heading uppercase tracking-wide hover:opacity-60 transition-opacity' to='/'>SHOP</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='text-3xl font-heading uppercase tracking-wide hover:opacity-60 transition-opacity' to='/collection'>COLLECTIONS</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='text-3xl font-heading uppercase tracking-wide hover:opacity-60 transition-opacity' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='text-3xl font-heading uppercase tracking-wide hover:opacity-60 transition-opacity' to='/collection'>NEW LAUNCH</NavLink>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
