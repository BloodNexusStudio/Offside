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
      <p className='mb-2'>All Products List</p>
      <div className='w-full overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm'>
        <div className='min-w-[800px]'>
          {/* ------- List Table Title ---------- */}
          <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest'>
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className='text-center'>Action</span>
          </div>

          {/* ------ Product List ------ */}
          <div className="divide-y divide-gray-100">
            {list.map((item, index) => (
              <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-4 px-6 text-sm text-gray-700 hover:bg-gray-50 transition-colors' key={index}>
                <img className='w-14 h-14 object-cover rounded-md border border-gray-100' src={item.image[0]} alt="" />
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p>{item.category}</p>
                <p className="font-medium text-gray-900">
                  {item.mainPrice > 0 && <del className="text-gray-400 mr-2 text-xs">{currency}{item.mainPrice}</del>}
                  {currency}{item.price}
                </p>
                <div className='flex justify-center'>
                  <button onClick={()=>removeProduct(item._id)} className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors text-xs font-bold uppercase tracking-widest'>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default List