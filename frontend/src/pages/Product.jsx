import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart, token, backendUrl, navigate, favourites, toggleFavourite } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')

  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        if (item.colors && item.colors.length > 0) {
            setSelectedColor(item.colors[0].colorName)
            setImage(item.colors[0].images[0])
        } else {
            setImage(item.image[0])
        }
        return null;
      }
    })
  }

  const onSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
        toast.error("Please login to submit a review");
        return;
    }
    try {
        const response = await axios.post(backendUrl + '/api/product/review', {
            productId: productData._id,
            rating,
            text: reviewText
        }, { headers: { token } });

        if (response.data.success) {
            toast.success("Review submitted successfully");
            setReviewText('');
            setProductData(prev => ({
                ...prev,
                reviews: [...(prev.reviews || []), { name: "You", rating, text: reviewText, date: Date.now(), replies: [] }]
            }))
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  const onSubmitReply = async (e, reviewId) => {
    e.preventDefault();
    if (!token) {
        toast.error("Please login to submit a reply");
        return;
    }
    try {
        const response = await axios.post(backendUrl + '/api/product/review/reply', {
            productId: productData._id,
            reviewId,
            text: replyText,
            name: "You"
        }, { headers: { token } });

        if (response.data.success) {
            toast.success("Reply submitted successfully");
            setReplyText('');
            setReplyingTo(null);
            
            // Optimistically update
            setProductData(prev => {
                const newReviews = [...prev.reviews];
                const reviewIndex = newReviews.findIndex(r => r._id === reviewId);
                if (reviewIndex !== -1) {
                    newReviews[reviewIndex].replies = [
                        ...(newReviews[reviewIndex].replies || []), 
                        { name: "You", text: replyText, date: Date.now(), isAdmin: false }
                    ];
                }
                return { ...prev, reviews: newReviews };
            })
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  const reviewsCount = productData?.reviews?.length || 0;

  // Calculate average rating
  let averageRating = 5;
  if (reviewsCount > 0) {
      const sum = productData.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      averageRating = Math.round(sum / reviewsCount);
  }

  const currentImages = (productData.colors && productData.colors.length > 0 && selectedColor)
     ? productData.colors.find(c => c.colorName === selectedColor)?.images || productData.image
     : productData.image;

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                currentImages.map((item,index)=>(
                  item && <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              {image && <img className='w-full h-auto object-cover' src={image} alt="" />}
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          {productData.fit && (
              <p className='text-xs font-bold uppercase tracking-widest text-gray-500 mt-1'>{productData.fit}</p>
          )}
          <div className='flex items-center gap-1 mt-2'>
              {[...Array(5)].map((_, i) => (
                  <img key={i} src={i < averageRating ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3 5" />
              ))}
              <p className='pl-2'>({reviewsCount})</p>
          </div>
          <div className='flex items-center gap-4 mt-5'>
              {productData.mainPrice > 0 && <p className='text-3xl font-medium text-gray-400 line-through'>{currency}{productData.mainPrice}</p>}
              <p className='text-3xl font-bold text-offside-black'>{currency}{productData.price}</p>
          </div>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          
          {productData.colors && productData.colors.length > 0 && (
              <div className='flex flex-col gap-4 mt-8'>
                  <p>Select Color</p>
                  <div className='flex gap-2 flex-wrap'>
                    {productData.colors.map((c,index)=>(
                      <button onClick={()=>{
                          setSelectedColor(c.colorName);
                          setImage(c.images[0]);
                      }} className={`border py-2 px-4 bg-gray-100 ${c.colorName === selectedColor ? 'border-orange-500' : ''}`} key={index}>{c.colorName}</button>
                    ))}
                  </div>
              </div>
          )}

          <div className={`flex flex-col gap-4 ${productData.colors && productData.colors.length > 0 ? 'my-4' : 'my-8'}`}>
              <p>Select Size</p>
              <div className='flex gap-2 flex-wrap'>
                {
                  [...productData.sizes]
                    .sort((a, b) => {
                      const order = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
                      let indexA = order.indexOf(a);
                      let indexB = order.indexOf(b);
                      // If a size isn't in the predefined list, put it at the end
                      if (indexA === -1) indexA = 999;
                      if (indexB === -1) indexB = 999;
                      return indexA - indexB;
                    })
                    .map((item,index)=>(
                      <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                  ))
                }
              </div>
          </div>
          <div className='flex items-center gap-4'>
              <button onClick={()=>{
                  const idToPass = selectedColor ? `${productData._id}_${selectedColor}` : productData._id;
                  addToCart(idToPass, size);
              }} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 sm:min-w-[200px]'>ADD TO CART</button>
              
              <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.preventDefault(); toggleFavourite(productData._id); }}
                  className={`w-11 h-11 flex items-center justify-center border transition-all ${favourites?.includes(productData._id) ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-offside-black bg-white shadow-sm'}`}
              >
                  <motion.div
                      initial={false}
                      animate={favourites?.includes(productData._id) ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                  >
                      <Heart className={`w-5 h-5 transition-colors stroke-[1.5] ${favourites?.includes(productData._id) ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-gray-500'}`} />
                  </motion.div>
              </motion.button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy exchange policy within 48 hours of delivery.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className='flex cursor-pointer'>
          <b onClick={() => setActiveTab('description')} className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'bg-gray-50 text-offside-black' : 'text-gray-500'}`}>Description</b>
          <p onClick={() => setActiveTab('reviews')} className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-50 text-offside-black font-bold' : 'text-gray-500'}`}>Reviews ({reviewsCount})</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          
          {activeTab === 'description' ? (
              <>
                <p>Crafted for those who refuse to blend in, OFFSIDE pieces are engineered with an uncompromising focus on quality and silhouette. Every garment is cut from premium heavy-weight fabrics, delivering an oversized, structured fit that effortlessly bridges the gap between high-end fashion and everyday streetwear.</p>
                <p>Our commitment to the "Minimal. Timeless. Unapologetic." ethos means stripping away the unnecessary and leaving only raw attitude. Each drop is meticulously designed to be a versatile staple in your wardrobe, ensuring you look distinct whether you're on the streets or in the studio.</p>
              </>
          ) : (
              <div className="flex flex-col gap-8">
                  {/* Reviews List */}
                  {reviewsCount === 0 ? (
                      <p>No reviews yet. Be the first to review this product!</p>
                  ) : (
                      <div className="flex flex-col gap-6">
                          {productData.reviews.map((review, index) => (
                              <div key={index} className="flex flex-col gap-2 pb-6 border-b border-gray-100 last:border-none">
                                  <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-offside-black text-white flex items-center justify-center font-bold uppercase">
                                          {review.name.charAt(0)}
                                      </div>
                                      <div>
                                          <p className="font-bold text-offside-black">{review.name}</p>
                                          <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <img key={i} src={i < review.rating ? assets.star_icon : assets.star_dull_icon} alt="" className="w-2.5 h-2.5" />
                                            ))}
                                            <span className="text-[10px] ml-2 text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                                          </div>
                                      </div>
                                  </div>
                                  <p className="text-gray-600 mt-2">{review.text}</p>

                                  <div className="mt-2 flex items-center gap-4">
                                      <button 
                                        onClick={() => { setReplyingTo(review._id); setReplyText(''); }} 
                                        className="text-xs font-bold text-gray-500 hover:text-offside-black uppercase tracking-widest"
                                      >
                                          Reply
                                      </button>
                                  </div>

                                  {/* Replies Section */}
                                  {review.replies && review.replies.length > 0 && (
                                      <div className="mt-4 pl-6 sm:pl-10 border-l-2 border-gray-100 flex flex-col gap-4">
                                          {review.replies.map((reply, rIndex) => (
                                              <div key={rIndex} className="flex flex-col gap-1">
                                                  <div className="flex items-center gap-2">
                                                      <p className="font-bold text-offside-black text-xs sm:text-sm">{reply.name}</p>
                                                      {reply.isAdmin && (
                                                          <span className="bg-offside-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest">Admin</span>
                                                      )}
                                                      <span className="text-[10px] text-gray-400">{new Date(reply.date).toLocaleDateString()}</span>
                                                  </div>
                                                  <p className="text-gray-600 text-xs sm:text-sm">{reply.text}</p>
                                              </div>
                                          ))}
                                      </div>
                                  )}

                                  {/* Reply Input Form */}
                                  {replyingTo === review._id && (
                                      <div className="mt-4 pl-6 sm:pl-10">
                                          <form onSubmit={(e) => onSubmitReply(e, review._id)} className="flex flex-col gap-2">
                                              <textarea 
                                                required
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Write a reply..."
                                                className="border border-gray-300 p-2 text-xs focus:outline-none focus:border-offside-black w-full max-w-lg min-h-[60px]"
                                              ></textarea>
                                              <div className="flex gap-2">
                                                <button type="submit" className="bg-offside-black text-white px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity">Post Reply</button>
                                                <button type="button" onClick={() => setReplyingTo(null)} className="bg-gray-100 text-offside-black px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors">Cancel</button>
                                              </div>
                                          </form>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                  )}

                  {/* Review Form */}
                  <div className="mt-4 pt-6 border-t border-gray-200">
                      <h3 className="font-bold text-lg text-offside-black mb-4">Leave a Review</h3>
                      {token ? (
                          <form onSubmit={onSubmitReview} className="flex flex-col gap-4 max-w-lg">
                              <div className="flex items-center gap-2">
                                  <label className="font-medium text-offside-black mr-2">Rating:</label>
                                  {[1,2,3,4,5].map((star) => (
                                      <img 
                                        key={star}
                                        src={star <= rating ? assets.star_icon : assets.star_dull_icon}
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => setRating(star)}
                                        alt={`Rate ${star} stars`}
                                      />
                                  ))}
                              </div>
                              <textarea 
                                required
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your thoughts about this product..."
                                className="border border-gray-300 p-3 rounded-none focus:outline-none focus:border-offside-black min-h-[100px] text-gray-800"
                              ></textarea>
                              <button type="submit" className="bg-offside-black text-white px-6 py-3 font-bold text-xs uppercase tracking-widest self-start hover:opacity-80 transition-opacity">Submit Review</button>
                          </form>
                      ) : (
                          <p className="text-offside-black bg-gray-50 p-4 font-medium">Please <span className="underline cursor-pointer" onClick={() => navigate('/login')}>log in</span> to write a review.</p>
                      )}
                  </div>
              </div>
          )}
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts currentId={productData._id} category={productData.category} subCategory={productData.subCategory} productCollection={productData.productCollection} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
