import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-3 mt-4 text-sm'>
            <div className='flex justify-between'>
                <p className='text-gray-600'>Cart Total(Incl. of all taxes)</p>
                <p className='font-medium'>{currency} {getCartAmount()}.00</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-600'>Shipping Charges</p>
                <div className='flex items-center gap-2'>
                  {getCartAmount() > 0 ? (
                    <p className='font-medium'>{currency} {delivery_fee}.00</p>
                  ) : (
                    <p>{currency} 0.00</p>
                  )}
                </div>
            </div>
            <hr className='my-2 border-gray-300' />
            <div className='flex justify-between text-base pt-2'>
                <b className="text-offside-black tracking-wide">Total Amount (Incl. of GST)</b>
                <b className="text-offside-black">{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
