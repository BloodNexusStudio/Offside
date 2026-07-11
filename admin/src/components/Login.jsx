import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-[#F7F7F7] px-4'>
        <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-10 py-12 max-w-md w-full border border-gray-100'>
            <div className="mb-8 text-center">
                <h1 className='text-3xl font-black tracking-tight text-gray-900'>OFFSIDE</h1>
                <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Admin Portal</p>
            </div>
            <form onSubmit={onSubmitHandler} className="space-y-6">
                <div>
                    <label className='block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Email Address</label>
                    <input 
                      onChange={(e)=>setEmail(e.target.value)} 
                      value={email} 
                      className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50' 
                      type="email" 
                      placeholder='admin@theoffside.in' 
                      required 
                    />
                </div>
                <div>
                    <label className='block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Password</label>
                    <input 
                      onChange={(e)=>setPassword(e.target.value)} 
                      value={password} 
                      className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50' 
                      type="password" 
                      placeholder='Enter your password' 
                      required 
                    />
                </div>
                <button className='w-full py-4 mt-2 rounded-lg text-white bg-black font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors shadow-md' type="submit"> 
                  Sign In 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login