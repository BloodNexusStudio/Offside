import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { User, Mail, Phone, ChevronDown, ArrowRight, Lock } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('razorpay');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Indian States and Cities Data
    const indiaData = {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan", "Aurangabad", "Navi Mumbai"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
        "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
        "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"]
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'India', // Default to India
        phone: ''
    })

    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        if (formData.state && indiaData[formData.state]) {
            setAvailableCities(indiaData[formData.state]);
        } else {
            setAvailableCities([]);
        }
    }, [formData.state]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
        
        // Reset city if state changes
        if (name === 'state') {
            setFormData(data => ({ ...data, city: '' }));
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        setCartItems({})
                        if (!token) {
                            localStorage.removeItem('guestCart');
                            toast.success("Order placed successfully!");
                            navigate('/');
                        } else {
                            navigate('/orders');
                        }
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            },
            modal: {
                ondismiss: function() {
                    setIsSubmitting(false);
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response){
            setIsSubmitting(false);
        });
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {

            let orderItems = []

            for (const items in cartItems) {
                const [baseId, color] = items.split('_');
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === baseId))
                        if (itemInfo) {
                            if (color) {
                                itemInfo.name = `${itemInfo.name} (${color})`;
                                // Also update image if we have one for this color
                                if (itemInfo.colors && itemInfo.colors.length > 0) {
                                    const colorData = itemInfo.colors.find(c => c.colorName === color);
                                    if (colorData && colorData.images[0]) {
                                        itemInfo.image[0] = colorData.images[0];
                                    }
                                }
                            }
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let finalAmount = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee;

            let orderData = {
                address: formData,
                items: orderItems,
                amount: finalAmount > 0 ? finalAmount : 0
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        if (!token) {
                            localStorage.removeItem('guestCart');
                            toast.success("Order placed successfully!");
                            navigate('/');
                        } else {
                            navigate('/orders');
                        }
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    } else {
                        setIsSubmitting(false);
                    }

                    break;

                default:
                    setIsSubmitting(false);
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setIsSubmitting(false);
        }
    }


    return (
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pb-24">
            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded flex flex-col items-center shadow-2xl">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="font-bold tracking-widest text-offside-black uppercase text-sm">Processing...</p>
                    </div>
                </div>
            )}

            <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 pt-16 min-h-[80vh]'>
                
                {/* ------------- Left Side (Form) ---------------- */}
                <div className='flex flex-col w-full max-w-[600px]'>
                    
                    {/* Headers */}
                    <div className="mb-12">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">CHECKOUT ///</p>
                        <h1 className="text-6xl sm:text-7xl xl:text-[6rem] font-heading font-black text-offside-black uppercase leading-[0.8] tracking-tighter mb-6">
                            DETAILS
                        </h1>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                            LET'S GET YOUR ORDER TO YOU.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-offside-black">DELIVERY INFORMATION</p>
                        <div className="h-[1px] flex-1 bg-gray-300"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className='flex gap-4'>
                            <div className="relative w-full">
                                <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="text" placeholder='First name' />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[1.5]" />
                            </div>
                            <div className="relative w-full">
                                <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="text" placeholder='Last name' />
                            </div>
                        </div>

                        <div className="relative w-full">
                            <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="email" placeholder='Email address' />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[1.5]" />
                        </div>

                        <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="text" placeholder='Street address' />

                        <div className='flex gap-4'>
                            {/* City Input */}
                            <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="text" placeholder='City' />
                            
                            {/* State Dropdown */}
                            <div className="relative w-full">
                                <select required onChange={onChangeHandler} name='state' value={formData.state} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors appearance-none'>
                                    <option value="" disabled>State / Province</option>
                                    {Object.keys(indiaData).map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 stroke-[1.5] pointer-events-none" />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="number" placeholder='Zipcode' />
                            
                            <div className="relative w-full">
                                <select required onChange={onChangeHandler} name='country' value={formData.country} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors appearance-none'>
                                    <option value="India">India</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 stroke-[1.5] pointer-events-none" />
                            </div>
                        </div>

                        <div className="relative w-full">
                            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full bg-[#fdfbf7]/50 backdrop-blur-sm border border-gray-300/60 rounded px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-offside-black transition-colors placeholder:text-gray-500' type="number" placeholder='Phone number' />
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[1.5]" />
                        </div>
                    </div>
                </div>

                {/* ------------- Right Side (Cart & Payment) ------------------ */}
                <div className='w-full lg:w-[450px] lg:mt-32'>
                    <div className="bg-[#ebe9e1]/40 backdrop-blur-sm border border-gray-300/50 p-8 sm:p-10 rounded-xl shadow-sm relative overflow-hidden">
                        
                        <CartTotal />
                        
                        <div className="flex items-center gap-4 mb-6 mt-10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-offside-black">PAYMENT METHOD</p>
                            <div className="h-[1px] flex-1 bg-gray-300"></div>
                        </div>

                        {/* Payment Selection Box */}
                        <div className="border border-gray-300/60 bg-[#fdfbf7]/60 rounded p-4 flex items-center gap-4 cursor-pointer hover:border-gray-400 transition-colors">
                            <div className="w-4 h-4 rounded-full border-4 border-offside-black bg-white"></div>
                            <img className='h-5 opacity-90' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        <button disabled={isSubmitting} type='submit' className={`mt-8 w-full bg-offside-black text-white px-8 py-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center justify-between group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isSubmitting ? 'PROCESSING...' : 'CONFIRM ORDER'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-3 text-gray-600">
                            <Lock className="w-4 h-4 stroke-[1.5]" />
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-offside-black mb-1">SECURE CHECKOUT</p>
                                <p className="text-[11px] font-medium text-gray-500">Your data is safe with us.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder
