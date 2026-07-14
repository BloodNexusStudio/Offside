import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, ListTodo, Package, Users, Star, Settings, CreditCard, Truck, Calculator, Activity } from 'lucide-react'
import { assets } from '../assets/assets'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const sidebarContent = (
    <>
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
            <img className='h-6 w-auto' src={assets.logo} alt="OFFSIDE" />
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-8 px-4 py-6">
                
                {/* OVERVIEW */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">OVERVIEW</h3>
                    <ul className="space-y-1">
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/" end className={({ isActive }) => `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-100 text-offside-black' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <LayoutDashboard className="h-5 w-5 shrink-0" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/orders" className={({ isActive }) => `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-100 text-offside-black' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <Package className="h-5 w-5 shrink-0" />
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/list" className={({ isActive }) => `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-100 text-offside-black' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <ListTodo className="h-5 w-5 shrink-0" />
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/add" className={({ isActive }) => `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-100 text-offside-black' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <PlusCircle className="h-5 w-5 shrink-0" />
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Coming Soon Links to match design loosely */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">MANAGEMENT</h3>
                    <ul className="space-y-1">
                        <li>
                            <div className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                                <Users className="h-5 w-5 shrink-0" />
                                Customers
                            </div>
                        </li>
                        <li>
                            <div className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                                <Star className="h-5 w-5 shrink-0" />
                                Reviews
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bottom Admin Profile Section */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-offside-black text-white">
                        <span className="font-bold">O</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">OFFSIDE Admin</p>
                        <p className="text-xs text-gray-500">Version 1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Mobile Sidebar (Fixed & Animated) */}
      <div className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 min-h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </div>

      {/* Desktop Sidebar (Static) */}
      <div className="hidden lg:flex flex-col w-64 min-h-screen border-r border-gray-200 bg-white shrink-0">
        {sidebarContent}
      </div>
    </>
  )
}

export default Sidebar