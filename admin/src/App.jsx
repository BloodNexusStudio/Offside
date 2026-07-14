import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen font-sans text-gray-900'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Navbar setToken={setToken} />
              <main className="w-full">
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                  <Routes>
                    <Route path='/' element={<Dashboard token={token} />} />
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/list' element={<List token={token} />} />
                    <Route path='/orders' element={<Orders token={token} />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
      }
    </div>
  )
}

export default App