import React from 'react';
import Title from '../components/Title';

const TermsConditions = () => {
  return (
    <div className='border-t pt-10 min-h-[60vh]'>
        <div className='text-2xl mb-6'>
            <Title text1={'TERMS &'} text2={'CONDITIONS'} />
        </div>
        <div className='text-gray-600 text-sm max-w-4xl leading-loose'>
            <p className='mb-4'>
                Welcome to OFFSIDE. By accessing our website and purchasing our products, you agree to be bound by the following Terms & Conditions. Please read them carefully before using our services.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>1. General Conditions</h3>
            <p className='mb-4'>
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (excluding credit card information) may be transferred unencrypted and involve transmissions over various networks.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>2. Products and Pricing</h3>
            <p className='mb-4'>
                All products and prices are subject to change without notice. We make every effort to display the colors and images of our products as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right to limit the sales of our products to any person or geographic region.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>3. Orders and Payments</h3>
            <p className='mb-4'>
                By placing an order, you agree to provide current, complete, and accurate purchase and account information. We use Razorpay for secure payment processing. Once an order is placed and payment is verified, you will receive a confirmation email with an invoice. We reserve the right to cancel or refuse any order you place with us.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>4. Returns and Refunds</h3>
            <p className='mb-4'>
                Please review our Return Policy for detailed information regarding returns, exchanges, and refunds. Items must be returned in their original condition and packaging within the specified return window to be eligible for a refund.
            </p>
            <p className='mt-10 font-bold'>Last Updated: July 2026</p>
        </div>
    </div>
  )
}

export default TermsConditions;
