import React from 'react';
import Title from '../components/Title';

const RefundPolicy = () => {
  return (
    <div className='px-4 md:px-0 pt-10'>
      <div className='text-center text-2xl mb-10'>
        <Title text1={'REFUND &'} text2={'CANCELLATION POLICY'} />
      </div>
      <div className='max-w-3xl mx-auto flex flex-col gap-6 text-gray-600 leading-relaxed mb-20'>
        <p>
          At Offside, we strive to ensure you are completely satisfied with your purchase. 
          If you are not entirely happy with your order, we are here to help.
        </p>
        
        <h3 className='text-lg font-bold text-gray-800 mt-4'>1. Returns</h3>
        <p>
          You have 7 calendar days to return an item from the date you received it. 
          To be eligible for a return, your item must be unused, unwashed, and in the same condition 
          that you received it. It must also be in the original packaging with all tags attached.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>2. Refunds</h3>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. 
          We will immediately notify you on the status of your refund after inspecting the item.
        </p>
        <p>
          If your return is approved, we will initiate a refund to your credit card (or original method of payment). 
          You will receive the credit within 5-7 business days, depending on your card issuer's policies.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>3. Cancellations</h3>
        <p>
          Orders can be cancelled before they are dispatched. If you wish to cancel your order, 
          please contact us immediately at support@theoffside.in. Once the order has been shipped, 
          it cannot be cancelled and must be processed as a return.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>4. Non-Refundable Items</h3>
        <p>
          Certain items are non-refundable, including items bought on sale, undergarments, and accessories 
          (unless received defective).
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>5. Shipping for Returns</h3>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item. 
          Shipping costs are non-refundable. If you receive a refund, the cost of return shipping 
          will be deducted from your refund.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
