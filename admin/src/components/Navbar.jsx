import React, { useState } from 'react'
import { Menu, Bell, CalendarDays, ChevronDown, LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const Navbar = ({ setToken, setSidebarOpen, sidebarOpen }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper to get page title from route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/add': return 'Add Product';
      case '/list': return 'Products List';
      case '/orders': return 'Orders';
      default: return 'Dashboard';
    }
  }

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        
        {/* Mobile menu button */}
        <button 
            type="button" 
            className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden transition-colors"
            onClick={() => setSidebarOpen(true)}
        >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-white/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center justify-between">
            {/* Left side: Page Title */}
            <div>
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">{getPageTitle()}</h1>
                {location.pathname === '/' && <p className="text-xs sm:text-sm text-gray-500">System operations normal.</p>}
            </div>

            {/* Right side: Tools & Profile */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
                
                {/* Fake Date Range Picker */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-md text-sm text-gray-400 bg-white/5 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                    <CalendarDays className="w-4 h-4 text-white" />
                    <span>{formatDate(firstDay)} - {formatDate(today)}</span>
                </div>

                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-white relative transition-colors">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,1)]"></span>
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <div className="relative">
                    <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="-m-1.5 flex items-center p-1.5 cursor-pointer">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            <span className="text-xs font-black text-black">AD</span>
                        </div>
                        <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-bold leading-6 text-white uppercase tracking-wider" aria-hidden="true">
                                Admin
                            </span>
                            <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </button>
                    
                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-[#111] py-2 shadow-lg ring-1 ring-white/10 focus:outline-none">
                            <button 
                                onClick={() => {
                                    setToken('');
                                    setShowDropdown(false);
                                }} 
                                className="flex w-full items-center px-3 py-1.5 text-sm leading-6 text-red-500 font-bold hover:bg-white/5 transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                SIGN OUT
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar