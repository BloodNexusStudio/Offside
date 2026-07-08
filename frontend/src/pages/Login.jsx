import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mail, EyeOff, Lock, Truck, Heart, ArrowRight, User } from 'lucide-react';
import tagImg from '../assets/new_logo.png';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="w-full bg-[#FAFAFA] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 border-t border-gray-200 min-h-[85vh]">
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Column */}
        <div className="hidden lg:flex flex-col relative h-full justify-center pr-8">
            <h2 className="absolute -top-10 -left-10 text-[9rem] font-heading font-black text-black/[0.03] italic select-none z-0">
                OFFSIDE
            </h2>
            <div className="relative z-10 mt-12">
                <h1 className="text-4xl xl:text-5xl font-heading font-bold uppercase leading-tight mb-4 text-offside-black">
                    WELCOME <br/> BACK
                </h1>
                <p className="text-sm font-medium text-gray-500 max-w-[250px] leading-relaxed">
                    Log in to access your account, track orders, and explore more.
                </p>
            </div>
            <div className="mt-16 relative z-10 w-full max-w-[280px]">
                <img src={tagImg} className="w-full h-auto -rotate-12 shadow-2xl rounded-sm mix-blend-multiply opacity-90" alt="Offside Tag" />
            </div>
        </div>

        {/* Middle Column (Form) */}
        <div className="bg-white p-8 sm:p-12 shadow-2xl shadow-gray-200/60 relative z-20">
            <div className='flex items-center gap-4 mb-2'>
                <h2 className="text-4xl font-heading font-bold uppercase text-offside-black">{currentState}</h2>
                <div className="h-[2px] w-12 bg-offside-black"></div>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-10">{currentState === 'Login' ? 'Login to continue' : 'Sign up to get started'}</p>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
                {currentState === 'Sign Up' && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Name</label>
                        <div className="relative">
                            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-offside-black transition-colors" placeholder="Enter your name" required />
                            <User className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                )}
                
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                    <div className="relative">
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-offside-black transition-colors" placeholder="Enter your email" required />
                        <Mail className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Password</label>
                    <div className="relative">
                        <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-offside-black transition-colors" placeholder="Enter your password" required />
                        <EyeOff className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="w-4 h-4 accent-offside-black cursor-pointer" />
                        <label htmlFor="remember" className="text-xs font-medium text-gray-600 cursor-pointer">Remember me</label>
                    </div>
                    {currentState === 'Login' && <p className="text-xs font-medium text-gray-600 cursor-pointer hover:text-offside-black transition-colors">Forgot password?</p>}
                </div>

                <button type="submit" className="w-full bg-offside-black text-white font-bold uppercase tracking-widest text-[11px] py-4 mt-4 flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
                    {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
                    <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center mt-4">
                    {currentState === 'Login' ? (
                        <p className="text-[11px] font-medium text-gray-500">New here? <span onClick={()=>setCurrentState('Sign Up')} className="text-offside-black underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">Create an account</span></p>
                    ) : (
                        <p className="text-[11px] font-medium text-gray-500">Already have an account? <span onClick={()=>setCurrentState('Login')} className="text-offside-black underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">Login here</span></p>
                    )}
                </div>
            </form>
        </div>

        {/* Right Column */}
        <div className="hidden lg:flex flex-col gap-10 pl-16 py-10 justify-center h-full">
            <div className="flex gap-5 items-start">
                <Lock className="w-5 h-5 stroke-[1.5] text-offside-black mt-0.5 shrink-0" />
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-offside-black mb-1.5">Secure Login</h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">Your data is always<br/>safe with us.</p>
                </div>
            </div>
            <div className="w-24 h-[1px] bg-gray-200"></div>
            <div className="flex gap-5 items-start">
                <Truck className="w-5 h-5 stroke-[1.5] text-offside-black mt-0.5 shrink-0" />
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-offside-black mb-1.5">Easy Tracking</h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">Track your orders<br/>and history.</p>
                </div>
            </div>
            <div className="w-24 h-[1px] bg-gray-200"></div>
            <div className="flex gap-5 items-start">
                <Heart className="w-5 h-5 stroke-[1.5] text-offside-black mt-0.5 shrink-0" />
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-offside-black mb-1.5">Favourites</h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">Save your favourite<br/>pieces.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Login
