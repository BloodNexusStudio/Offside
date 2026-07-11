import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, ListTodo, Package, Users, Star, X } from 'lucide-react'
import { assets } from '../assets/assets'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0a0a0a] border-r border-white/10 
        transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Logo & Close (Mobile) */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
            <img className='h-6 w-auto' src={assets.logo} alt="OFFSIDE" style={{filter: 'invert(1)'}} />
            <button 
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-8 px-4 py-6">
                
                {/* OVERVIEW */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">Overview</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/" end className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                                <LayoutDashboard className="h-5 w-5 shrink-0" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/orders" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                                <Package className="h-5 w-5 shrink-0" />
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/list" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                                <ListTodo className="h-5 w-5 shrink-0" />
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setSidebarOpen(false)} to="/add" className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                                <PlusCircle className="h-5 w-5 shrink-0" />
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* MANAGEMENT */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">Management</h3>
                    <ul className="space-y-2">
                        <li>
                            <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 cursor-not-allowed">
                                <Users className="h-5 w-5 shrink-0" />
                                Customers
                            </div>
                        </li>
                        <li>
                            <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 cursor-not-allowed">
                                <Star className="h-5 w-5 shrink-0" />
                                Reviews
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bottom Admin Profile Section */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                        <span className="font-bold text-lg">O</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white uppercase tracking-wider">OFFSIDE</p>
                        <p className="text-xs text-gray-500">Admin Console 1.0</p>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default Sidebar