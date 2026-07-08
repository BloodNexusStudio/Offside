import React from 'react';
import Title from '../components/Title';

const ShippingPolicy = () => {
  return (
    <div className='px-4 md:px-0 pt-10'>
      <div className='text-center text-2xl mb-10'>
        <Title text1={'SHIPPING &'} text2={'DELIVERY POLICY'} />
      </div>
      <div className='max-w-3xl mx-auto flex flex-col gap-6 text-gray-600 leading-relaxed mb-20'>
        <p>
          We know you are excited to receive your Offside gear. This policy outlines our 
          shipping and delivery processes to ensure you get your items as quickly and smoothly as possible.
        </p>
        
        <h3 className='text-lg font-bold text-gray-800 mt-4'>1. Processing Time</h3>
        <p>
          All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. 
          If we are experiencing a high volume of orders, shipments may be delayed by a few days. 
          Please allow additional days in transit for delivery.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>2. Shipping Rates & Delivery Estimates</h3>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout.
          We offer **Free Shipping** on all orders above ₹1999 across India.
        </p>
        <ul className='list-disc pl-6'>
          <li><strong>Standard Delivery:</strong> 3-5 business days.</li>
          <li><strong>Express Delivery:</strong> 1-2 business days (applicable in select pincodes).</li>
        </ul>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>3. Shipment Confirmation & Order Tracking</h3>
        <p>
          You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). 
          The tracking number will be active within 24 hours.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>4. Damages</h3>
        <p>
          Offside is not liable for any products damaged or lost during shipping. 
          If you received your order damaged, please contact the shipment carrier to file a claim, 
          and reach out to our support team at support@theoffside.in with photos of the damaged packaging.
        </p>

        <h3 className='text-lg font-bold text-gray-800 mt-4'>5. International Shipping</h3>
        <p>
          Currently, we do not ship outside of India. We are working on expanding our reach globally soon.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
