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
                At OFFSIDE, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website (theoffside.in) or make a purchase from our store.
            </p>
            
            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>1. Information We Collect</h3>
            <ul className='list-disc pl-5 space-y-2 mb-4'>
                <li><span className='font-bold text-offside-black'>Personal Information:</span> When you create an account, place an order, or subscribe to our newsletter, we collect details such as your name, email address, shipping and billing address, and phone number.</li>
                <li><span className='font-bold text-offside-black'>Device Information:</span> We automatically collect certain information about your device when you interact with our site, including your IP address, browser type, operating system, and browsing behavior.</li>
                <li><span className='font-bold text-offside-black'>Payment Information:</span> We use secure third-party payment processors (Razorpay). We do not directly collect, store, or process your credit card, UPI, or banking information on our servers.</li>
            </ul>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>2. How We Use Your Information</h3>
            <p className='mb-4'>
                We use the collected data for the following purposes:
            </p>
            <ul className='list-disc pl-5 space-y-2 mb-4'>
                <li>To process and fulfill your orders, including sending order confirmations and shipping updates.</li>
                <li>To provide responsive customer support and handle any inquiries.</li>
                <li>To improve and optimize our website layout, product offerings, and overall customer experience.</li>
                <li>To send promotional emails, exclusive drops, and marketing communications (only if you have explicitly opted in).</li>
            </ul>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>3. Data Sharing and Third Parties</h3>
            <p className='mb-4'>
                We respect your privacy and <span className='font-bold text-offside-black'>do not sell</span> your personal data to third parties. We only share necessary information with trusted service providers who assist us in operating our website, conducting our business, or servicing you (e.g., courier partners like Delhivery/BlueDart, payment processors, and email hosting services). These parties are bound by strict confidentiality agreements.
            </p>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>4. Cookies and Tracking Technologies</h3>
            <p className='mb-4'>
                Our website utilizes "cookies" (small data files stored on your device) to enhance your browsing experience, remember the items in your shopping cart, and analyze site traffic. You can choose to disable cookies through your browser settings; however, doing so may affect the functionality of our checkout process.
            </p>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>5. Data Security</h3>
            <p className='mb-4'>
                We implement robust, industry-standard security protocols, including SSL (Secure Socket Layer) encryption, to protect your sensitive information during transmission. While no method of transmission over the Internet is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.
            </p>

            <h3 className='text-lg text-offside-black font-bold mt-8 mb-2 uppercase tracking-wide'>6. Your Rights</h3>
            <p className='mb-4'>
                If you are a registered user, you have the right to access, correct, update, or request the deletion of your personal information at any time. You may also opt out of marketing communications by clicking the "unsubscribe" link in any of our promotional emails.
            </p>

            <p className='mt-12 font-bold uppercase text-xs tracking-widest text-gray-400'>Last Updated: July 2026</p>
        </div>
    </div>
  )
}

export default PrivacyPolicy;
