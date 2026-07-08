import React from 'react';
import Title from '../components/Title';

const PrivacyPolicy = () => {
  return (
    <div className='border-t pt-10 min-h-[60vh]'>
        <div className='text-2xl mb-6'>
            <Title text1={'PRIVACY'} text2={'POLICY'} />
        </div>
        <div className='text-gray-600 text-sm max-w-4xl leading-loose'>
            <p className='mb-4'>
                At OFFSIDE, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase from our store.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>1. Information We Collect</h3>
            <p className='mb-4'>
                When you create an account, place an order, or subscribe to our newsletter, we may collect personal information such as your name, email address, shipping and billing address, phone number, and payment details. We also automatically collect certain information about your device, including your IP address, browser type, and operating system when you interact with our site.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>2. How We Use Your Information</h3>
            <p className='mb-4'>
                We use your personal information to process and fulfill your orders, communicate with you about your purchases, provide customer support, and send you promotional offers or updates (if you have opted in). We do not sell your personal data to third parties.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>3. Data Security</h3>
            <p className='mb-4'>
                We employ industry-standard security measures, including SSL encryption, to protect your sensitive information during transmission. All payment processing is handled by secure third-party gateways (e.g., Razorpay) and we do not store your credit card or UPI details on our servers.
            </p>
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>4. Cookies</h3>
            <p className='mb-4'>
                Our website uses cookies to enhance your browsing experience, remember your cart items, and analyze site traffic. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
            </p>
            <p className='mt-10 font-bold'>Last Updated: July 2026</p>
        </div>
    </div>
  )
}

export default PrivacyPolicy;
