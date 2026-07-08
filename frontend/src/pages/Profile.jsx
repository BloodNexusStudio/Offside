import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User } from 'lucide-react'

const Profile = () => {
    const { backendUrl, token, navigate } = useContext(ShopContext)
    const [userData, setUserData] = useState({ name: '', email: '' })
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(true)

    // Temporary state to hold edited values before saving
    const [editData, setEditData] = useState({ name: '', email: '' })

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        fetchUserProfile()
    }, [token])

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (response.data.success) {
                setUserData({
                    name: response.data.user.name,
                    email: response.data.user.email
                })
                setEditData({
                    name: response.data.user.name,
                    email: response.data.user.email
                })
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(backendUrl + '/api/user/profile', editData, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                setUserData(response.data.user)
                setIsEdit(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const handleCancel = () => {
        setEditData(userData)
        setIsEdit(false)
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[50vh]'>
                <p className='text-gray-500 font-medium'>Loading profile...</p>
            </div>
        )
    }

    return (
        <div className='border-t pt-16 min-h-[60vh]'>
            <div className='text-2xl mb-8'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='max-w-xl bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-lg'>
                <div className='flex items-center gap-4 mb-8 pb-8 border-b border-gray-200'>
                    <div className='w-16 h-16 bg-offside-black rounded-full flex items-center justify-center text-white'>
                        <User size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>{userData.name}</h2>
                        <p className='text-gray-500 text-sm'>Member</p>
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
                    <div>
                        <label className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block'>Full Name</label>
                        {isEdit ? (
                            <input 
                                type="text" 
                                value={editData.name} 
                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                                className='w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-offside-black transition-colors'
                            />
                        ) : (
                            <p className='text-gray-800 text-lg font-medium'>{userData.name}</p>
                        )}
                    </div>

                    <div>
                        <label className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block'>Email Address</label>
                        {isEdit ? (
                            <input 
                                type="email" 
                                value={editData.email} 
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className='w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-offside-black transition-colors'
                            />
                        ) : (
                            <p className='text-gray-800 text-lg font-medium'>{userData.email}</p>
                        )}
                    </div>
                </div>

                <div className='mt-10 pt-8 border-t border-gray-200 flex items-center gap-4'>
                    {isEdit ? (
                        <>
                            <button onClick={handleSave} className='bg-offside-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors'>
                                Save Changes
                            </button>
                            <button onClick={handleCancel} className='border border-gray-300 text-gray-600 px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors'>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className='bg-offside-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors'>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
