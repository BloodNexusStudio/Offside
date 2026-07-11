import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, ListTodo, Package, Users, Star, X } from 'lucide-react'
import { assets } from '../assets/assets'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white border-r border-gray-100 shadow-xl lg:static lg:w-64 lg:shadow-none transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        {/* Header / Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-6">
            <img className='h-6 w-auto' src={assets.logo} alt="OFFSIDE" />
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-900"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-8 px-4 py-6">
                
                {/* OVERVIEW */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-3 uppercase">Overview</h3>
                    <ul className="space-y-1">
                        <li>
                            <NavLink onClick={() => setIsSidebarOpen(false)} to="/" end className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <LayoutDashboard className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsSidebarOpen(false)} to="/orders" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <Package className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsSidebarOpen(false)} to="/list" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <ListTodo className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setIsSidebarOpen(false)} to="/add" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                <PlusCircle className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* MANAGEMENT */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-3 uppercase">Management</h3>
                    <ul className="space-y-1">
                        <li>
                            <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed">
                                <Users className="h-5 w-5 shrink-0" />
                                Customers
                            </div>
                        </li>
                        <li>
                            <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed">
                                <Star className="h-5 w-5 shrink-0" />
                                Reviews
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bottom Admin Profile Section */}
            <div className="border-t border-gray-100 p-4">
                <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-sm">
                        <span className="font-bold text-sm">O</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">OFFSIDE Admin</p>
                        <p className="text-xs font-medium text-gray-500">Version 2.0</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar