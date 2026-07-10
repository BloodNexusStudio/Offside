import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Truck, ShieldCheck, RefreshCcw, Headphones } from 'lucide-react'

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])
  const [trackingId, setTrackingId] = useState(null)
  const [replaceId, setReplaceId] = useState(null)
  const [selectedNewSize, setSelectedNewSize] = useState('')

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['deliveryDate'] = order.deliveryDate
            item['orderId'] = order._id // keep track of the parent order
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  const handleTrackOrder = async (index) => {
      setReplaceId(null);
      if (trackingId === index) {
          setTrackingId(null);
      } else {
          setTrackingId(index);
          await loadOrderData(); // refresh data to get latest status
          toast.success("Tracking information updated");
      }
  }

  const handleOpenReplace = (index, currentSize) => {
      setTrackingId(null);
      if (replaceId === index) {
          setReplaceId(null);
      } else {
          setReplaceId(index);
          setSelectedNewSize(currentSize);
      }
  }

  const handleConfirmReplace = async (item) => {
      if (selectedNewSize === item.size) {
          toast.info("You selected the same size.");
          setReplaceId(null);
          return;
      }
      try {
          const response = await axios.post(backendUrl + '/api/order/replaceItem', {
              orderId: item.orderId,
              itemId: item._id,
              newSize: selectedNewSize
          }, {headers: {token}});

          if (response.data.success) {
              toast.success(response.data.message);
              setReplaceId(null);
              await loadOrderData();
          } else {
              toast.error(response.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
  }

  const trackingSteps = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];

  const getStepStatus = (currentStatus, stepName) => {
      const currentIndex = trackingSteps.indexOf(currentStatus);
      const stepIndex = trackingSteps.indexOf(stepName);
      
      if (stepIndex < currentIndex) return 'completed';
      if (stepIndex === currentIndex) return 'current';
      return 'pending';
  }

  return (
    <div className='border-t pt-10 sm:pt-16 min-h-screen bg-gray-50/30'>
        
        {/* Page Header */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4'>
            <div>
                <div className='flex items-center gap-4 mb-2'>
                    <h1 className='text-3xl sm:text-4xl font-heading font-bold uppercase tracking-wide text-offside-black'>MY ORDERS</h1>
                    <div className='w-12 sm:w-20 h-[2px] bg-offside-black'></div>
                </div>
                <p className='text-gray-500 text-sm'>Track and manage all your orders in one place.</p>
            </div>
            <div>
                <select className='border border-gray-200 rounded px-4 py-2.5 text-sm outline-none bg-white min-w-[160px] cursor-pointer hover:border-gray-300'>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>

        {/* Orders List */}
        <div className='flex flex-col gap-6'>
            {orderData.length === 0 ? (
                <div className='bg-white border rounded-lg p-10 text-center text-gray-500'>
                    You haven't placed any orders yet.
                </div>
            ) : (
                orderData.map((item,index) => (
                    <div key={index} className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
                        
                        {/* Card Header */}
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/50 px-6 py-4 border-b border-gray-100 text-sm'>
                            <div className='font-bold text-offside-black mb-1 sm:mb-0'>ORDER #OFFSD{item.orderId.toString().slice(-6).toUpperCase()}</div>
                            <div className='text-gray-500 font-medium tracking-wide mb-3 sm:mb-0'>PLACED ON {new Date(item.date).toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'}).toUpperCase()}</div>
                            <div className='sm:text-right flex sm:block items-center gap-2'>
                                <div className='text-[11px] text-gray-400 font-bold tracking-widest'>TOTAL</div>
                                <div className='font-bold text-offside-black'>{currency}{item.price}</div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className='flex flex-col md:flex-row p-6'>
                            
                            {/* Left: Product Info */}
                            <div className='flex-1 flex gap-6 items-center'>
                                <div className='w-20 sm:w-24 h-24 sm:h-28 bg-gray-50 flex items-center justify-center p-2 rounded'>
                                    <img src={item.image[0]} className='max-h-full max-w-full object-contain mix-blend-multiply' alt={item.name} />
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-lg text-offside-black uppercase tracking-wide'>{item.name}</div>
                                    <div className='text-sm text-gray-600 mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium'>
                                        <span>{currency}{item.price}</span>
                                        <span className='w-1 h-1 rounded-full bg-gray-300'></span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span className='w-1 h-1 rounded-full bg-gray-300'></span>
                                        <span>Size: {item.size}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Middle: Status */}
                            <div className='flex-1 flex flex-col justify-center items-start md:items-center border-t border-gray-100 md:border-t-0 md:border-l md:border-gray-100 my-6 pt-6 md:my-0 md:pt-0'>
                                <div className='flex items-center gap-2.5 mb-1.5'>
                                    <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                    <div className='font-bold text-offside-black uppercase tracking-widest text-sm'>{item.status}</div>
                                </div>
                                <div className='text-sm text-gray-500 pl-5 md:pl-0'>
                                    {item.status === 'Delivered' ? `Delivered on ${new Date().toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'})}` : `Status updated recently`}
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className='flex-1 flex flex-col justify-center items-start md:items-end gap-3'>
                                <button onClick={() => handleTrackOrder(index)} className='w-full md:max-w-[200px] bg-offside-black text-white text-xs sm:text-sm font-bold uppercase tracking-widest py-3.5 flex justify-between items-center px-5 hover:bg-gray-800 transition-colors'>
                                    <span>{trackingId === index ? 'HIDE TRACKING' : 'TRACK ORDER'}</span>
                                    <span>&rarr;</span>
                                </button>
                                {((item.status === 'Order Placed' || item.status === 'Packing') || (item.status === 'Delivered' && item.deliveryDate && (Date.now() - item.deliveryDate <= 48 * 60 * 60 * 1000))) && (
                                    <button onClick={() => handleOpenReplace(index, item.size)} className='w-full md:max-w-[200px] border border-gray-300 text-offside-black text-xs sm:text-sm font-bold uppercase tracking-widest py-3 hover:bg-gray-50 transition-colors'>
                                        {replaceId === index ? 'CANCEL EXCHANGE' : 'EXCHANGE SIZE'}
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Replace Size UI */}
                        {replaceId === index && (
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-offside-black uppercase tracking-wide mb-1">Select New Size</h4>
                                    <p className="text-xs text-gray-500">Pick a different size for your item before it ships.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                                    <div className="flex gap-2">
                                        {(item.sizes || ["S","M","L","XL"]).map((sizeOption, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedNewSize(sizeOption)}
                                                className={`flex-1 sm:flex-none px-4 py-2 text-sm border font-bold transition-colors ${selectedNewSize === sizeOption ? 'bg-offside-black text-white border-offside-black' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                                            >
                                                {sizeOption}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => handleConfirmReplace(item)} className="bg-offside-black text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tracking Timeline */}
                        {trackingId === index && (
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-offside-black mb-8 uppercase tracking-wide">Tracking Status</h4>
                                <div className="relative flex flex-col sm:flex-row justify-between w-full max-w-3xl mx-auto">
                                    {/* Connecting Background Line */}
                                    <div className="hidden sm:block absolute top-[14px] left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                                    
                                    {trackingSteps.map((step, i) => {
                                        const status = getStepStatus(item.status, step);
                                        return (
                                            <div key={i} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 relative z-10 mb-6 sm:mb-0">
                                                
                                                {/* Status Dot */}
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-[2px] transition-colors
                                                    ${status === 'completed' ? 'bg-offside-black border-offside-black text-white' : 
                                                    status === 'current' ? 'bg-white border-offside-black text-offside-black shadow-sm' : 
                                                    'bg-white border-gray-300 text-gray-300'}`}>
                                                    {status === 'completed' ? '✓' : i + 1}
                                                </div>

                                                {/* Step Name */}
                                                <p className={`text-xs sm:text-xs font-bold uppercase tracking-wider ${status === 'pending' ? 'text-gray-400' : 'text-offside-black'}`}>
                                                    {step}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>

        {/* Trust Badges Footer */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-t border-gray-200 mt-20 mb-10'>
            <div className='flex items-center justify-center sm:justify-start gap-5'>
                <Truck size={36} strokeWidth={1} className='text-offside-black' />
                <div>
                    <div className='font-bold text-sm text-offside-black tracking-wide mb-1'>FAST DELIVERY</div>
                    <div className='text-sm text-gray-500'>Quick & reliable shipping</div>
                </div>
            </div>
            <div className='flex items-center justify-center sm:justify-start gap-5'>
                <ShieldCheck size={36} strokeWidth={1} className='text-offside-black' />
                <div>
                    <div className='font-bold text-sm text-offside-black tracking-wide mb-1'>SECURE PAYMENTS</div>
                    <div className='text-sm text-gray-500'>100% safe & encrypted</div>
                </div>
            </div>
            <div className='flex items-center justify-center sm:justify-start gap-5'>
                <RefreshCcw size={36} strokeWidth={1} className='text-offside-black' />
                <div>
                    <div className='font-bold text-sm text-offside-black tracking-wide mb-1'>EASY EXCHANGE</div>
                    <div className='text-sm text-gray-500'>Hassle-free size exchange</div>
                </div>
            </div>
            <div className='flex items-center justify-center sm:justify-start gap-5'>
                <Headphones size={36} strokeWidth={1} className='text-offside-black' />
                <div>
                    <div className='font-bold text-sm text-offside-black tracking-wide mb-1'>SUPPORT</div>
                    <div className='text-sm text-gray-500'>We're here to help</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Orders
