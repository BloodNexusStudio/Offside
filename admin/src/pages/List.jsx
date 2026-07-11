import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">All Products List</h3>
      <div className='flex flex-col gap-3'>

        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-t-xl text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Product List ------ */}
        <div className="flex flex-col gap-2 md:gap-0 md:bg-transparent">
        {
          list.map((item, index) => (
            <div className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-4 border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300 hover:bg-white/10 transition-colors ${index === list.length - 1 ? 'md:rounded-b-xl' : ''} rounded-xl md:rounded-none`} key={index}>
              <img className='w-14 h-14 object-cover rounded-md border border-white/20' src={item.image[0]} alt="" />
              <p className="font-bold text-white uppercase tracking-wider">{item.name}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400">{item.category}</p>
              <p className="font-bold text-white">
                {item.mainPrice > 0 && <del className="text-gray-500 mr-2 text-xs">{currency}{item.mainPrice}</del>}
                {currency}{item.price}
              </p>
              <div className="flex justify-end md:justify-center">
                <button onClick={()=>removeProduct(item._id)} className='text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all font-bold text-[10px] uppercase tracking-widest border border-transparent hover:border-red-500/30'>
                  Remove
                </button>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default List