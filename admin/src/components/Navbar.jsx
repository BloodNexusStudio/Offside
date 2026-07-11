import React, { useState } from 'react'
import { Menu, Bell, CalendarDays, ChevronDown, LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const Navbar = ({ setToken, setIsSidebarOpen }) => {
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

  // Get current date range for the fake picker
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm">
        
        {/* Mobile menu button placeholder */}
        <button onClick={() => setIsSidebarOpen(true)} type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center justify-between">
            {/* Left side: Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{getPageTitle()}</h1>
                {location.pathname === '/' && <p className="text-sm text-gray-500">Here's what's happening with your store today.</p>}
            </div>

            {/* Right side: Tools & Profile */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
                
                {/* Fake Date Range Picker */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <span>{formatDate(firstDay)} - {formatDate(today)}</span>
                </div>

                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-offside-black"></span>
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                {/* Profile dropdown */}
                <div className="relative">
                    <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="-m-1.5 flex items-center p-1.5 cursor-pointer">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                            <span className="text-xs font-bold text-gray-700">AD</span>
                        </div>
                        <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                Admin
                            </span>
                            <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </button>
                    
                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <button 
                                onClick={() => setToken('')} 
                                className="flex w-full items-center px-3 py-1 text-sm leading-6 text-red-600 hover:bg-gray-50"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign out
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