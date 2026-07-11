import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div className='flex flex-col gap-4 mt-6'>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-6 items-center bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow text-sm text-gray-700' key={index}>
              <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                <img className='w-6' src={assets.parcel_icon} alt="" />
              </div>
              <div className="space-y-3">
                <div className="font-medium text-gray-900">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity} <span className="text-gray-500 text-xs">({item.size})</span>
                      {idx !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                <div>
                  <p className='font-bold text-gray-900'>{order.address.firstName + " " + order.address.lastName}</p>
                  <p className="text-gray-500 mt-1">{order.address.street}</p>
                  <p className="text-gray-500">{order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}</p>
                  <p className="text-gray-500 mt-1 font-medium">{order.address.phone}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="flex justify-between gap-4"><span className="text-gray-500">Items:</span> <span className="font-bold text-gray-900">{order.items.length}</span></p>
                <p className="flex justify-between gap-4"><span className="text-gray-500">Method:</span> <span className="font-bold text-gray-900">{order.paymentMethod}</span></p>
                <p className="flex justify-between gap-4"><span className="text-gray-500">Payment:</span> <span className={`font-bold ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>{ order.payment ? 'Done' : 'Pending' }</span></p>
                <p className="flex justify-between gap-4"><span className="text-gray-500">Date:</span> <span className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {currency}{order.amount}
              </div>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2.5 bg-white font-bold border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-black text-sm cursor-pointer'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders