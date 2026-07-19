import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const ManageCollections = ({ token }) => {
    
    const [collections, setCollections] = useState([])
    const [name, setName] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchCollections = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/collection/list')
            if (response.data.success) {
                setCollections(response.data.collections)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("subtitle", subtitle)
            formData.append("image", image)

            const response = await axios.post(backendUrl + "/api/collection/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setSubtitle('')
                setImage(false)
                fetchCollections()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const removeCollection = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/collection/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchCollections()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col gap-10">
            {/* Add Collection Form */}
            <div>
                <h3 className="text-lg font-bold mb-4">Add New Collection</h3>
                <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5 max-w-[500px] border border-gray-200 p-6 rounded bg-white'>
                    
                    <div className="w-full">
                        <p className='mb-2'>Upload Image (Required)</p>
                        <label htmlFor="image">
                            <img className='w-24 object-cover rounded cursor-pointer border border-gray-100' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                        </label>
                    </div>

                    <div className='w-full'>
                        <p className='mb-2'>Collection Name (e.g. FIFA)</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-300' type="text" placeholder='Type here' required />
                    </div>

                    <div className='w-full'>
                        <p className='mb-2'>Collection Subtitle</p>
                        <input onChange={(e) => setSubtitle(e.target.value)} value={subtitle} className='w-full px-3 py-2 border border-gray-300' type="text" placeholder='Type here' required />
                    </div>

                    <button type="submit" disabled={loading} className='w-32 py-3 mt-4 bg-black text-white disabled:opacity-50'>{loading ? "Adding..." : "ADD COLLECTION"}</button>
                </form>
            </div>

            {/* List Collections */}
            <div>
                <h3 className="text-lg font-bold mb-4">All Collections</h3>
                <div className='flex flex-col gap-2 max-w-[800px]'>
                    
                    <div className='hidden md:grid grid-cols-[1fr_3fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                        <b>Image</b>
                        <b>Name</b>
                        <b>Subtitle</b>
                        <b className='text-center'>Action</b>
                    </div>

                    {collections.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr_3fr] md:grid-cols-[1fr_3fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                            <img className='w-12 h-16 object-cover' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p className="truncate pr-4">{item.subtitle}</p>
                            <p onClick={() => removeCollection(item._id)} className='text-right md:text-center cursor-pointer text-red-500 font-bold'>Remove</p>
                        </div>
                    ))}
                    
                    {collections.length === 0 && (
                        <div className="p-4 text-center border text-gray-500">No collections found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageCollections
