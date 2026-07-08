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
                Welcome to OFFSIDE. These Terms & Conditions govern your use of our website (theoffside.in) and the purchase of our products. By accessing our site or placing an order, you agree to be bound by these Terms.
            </p>
            
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>1. General Conditions</h3>
            <p className='mb-4'>
                We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
            </p>
            
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>2. Products, Sizing, and Availability</h3>
            <p className='mb-4'>
                We have made every effort to display as accurately as possible the colors and images of our products. However, we cannot guarantee your monitor's display of any color will be accurate. All products are subject to availability, and we reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice.
            </p>
            
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>3. Pricing and Payments</h3>
            <p className='mb-4'>
                Prices for our products are subject to change without notice. We use secure third-party payment gateways (Razorpay) for all transactions. By submitting payment information, you represent and warrant that you have the legal right to use the payment method provided.
            </p>
            
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>4. Cancellations, Returns, and Refunds (Strict Policy)</h3>
            <div className='mb-4'>
                <p className='font-bold text-red-600 mb-2'>Please read carefully before purchasing:</p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li><span className='font-bold text-offside-black'>No Refunds:</span> All sales are strictly final. We do not offer refunds to the original payment method under any circumstances once a product is purchased.</li>
                    <li><span className='font-bold text-offside-black'>Pre-Shipment Cancellations Only:</span> An order can only be canceled or modified <span className='underline'>before</span> it has been dispatched from our warehouse. Once the order status changes to "Shipped", it is locked and cannot be canceled.</li>
                    <li><span className='font-bold text-offside-black'>Defective Items:</span> In the rare event you receive a damaged or incorrect item, you must contact our support team within 48 hours of delivery with photographic evidence. We will authorize an exchange for the exact same item. No refunds will be issued.</li>
                </ul>
            </div>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>5. Shipping and Delivery</h3>
            <p className='mb-4'>
                Estimated delivery times are provided as guidelines only and do not take into account possible delays caused by payment authorization or logistics partners. OFFSIDE is not responsible for any lost or stolen packages once marked as "Delivered" by the courier.
            </p>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>6. User Comments and Feedback</h3>
            <p className='mb-4'>
                If you send us specific submissions (e.g., contest entries) or creative ideas, suggestions, or proposals, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, and otherwise use them in any medium.
            </p>

            <p className='mt-12 font-bold uppercase text-xs tracking-widest text-gray-400'>Last Updated: July 2026</p>
        </div>
    </div>
  )
}

export default TermsConditions;
