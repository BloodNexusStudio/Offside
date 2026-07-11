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
      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Order Management</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-300 hover:border-white/30 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)]' key={index}>
              <img className='w-12 filter invert' src={assets.parcel_icon} alt="" />
              <div>
                <div className="font-bold text-white mb-2">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span className="text-gray-400"> {item.size} </span> </p>
                    }
                    else {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span className="text-gray-400"> {item.size} </span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-bold text-white uppercase tracking-wider'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className="text-gray-400">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className="mt-2 text-white">{order.address.phone}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className='text-sm sm:text-[15px]'>Items : <span className="font-bold text-white">{order.items.length}</span></p>
                <p className='mt-2'>Method : <span className="font-bold text-white uppercase">{order.paymentMethod}</span></p>
                <p>Payment : <span className={`font-bold uppercase tracking-wider ${order.payment ? 'text-green-400' : 'text-yellow-400'}`}>{ order.payment ? 'Done' : 'Pending' }</span></p>
                <p>Date : <span className="font-bold text-white">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
              <p className='text-lg font-black text-white'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2.5 font-bold uppercase tracking-wider text-[10px] bg-[#111] text-white border border-white/20 rounded-lg outline-none focus:border-white focus:ring-1 focus:ring-white transition-all'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
        {orders.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
                No orders found.
            </div>
        )}
      </div>
    </div>
  )
}

export default Orders