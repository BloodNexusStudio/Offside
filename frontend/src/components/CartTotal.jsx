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
                <p className='text-gray-600'>Member Savings</p>
                <p className='text-green-600'>- {currency} {getCartAmount() > 0 ? 100 : 0}.00</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-600'>Shipping Charges</p>
                <div className='flex items-center gap-2'>
                  {getCartAmount() > 0 ? (
                    <>
                      <span className='line-through text-gray-400'>{currency} {delivery_fee}.00</span>
                      <span className='text-green-600'>Free</span>
                    </>
                  ) : (
                    <p>{currency} 0.00</p>
                  )}
                </div>
            </div>
            <hr className='my-1' />
            <div className='flex justify-between text-base'>
                <b>Total Amount(Incl. of GST)</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() - 100}.00</b>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
