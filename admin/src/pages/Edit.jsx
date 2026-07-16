import React, { useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({token}) => {

   const { id } = useParams();
   const navigate = useNavigate();

   const [colors, setColors] = useState([
     { name: 'Default', images: [null, null, null, null, null, null] }
   ]);

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [mainPrice, setMainPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [productCollection, setProductCollection] = useState("None");
   const [fit, setFit] = useState("Regular Fit");
   const [bestseller, setBestseller] = useState(false);
   const [newDrop, setNewDrop] = useState(false);
   const [sizes, setSizes] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
            if (response.data.success) {
               const p = response.data.product;
               setName(p.name);
               setDescription(p.description);
               setPrice(p.price);
               setMainPrice(p.mainPrice);
               setCategory(p.category);
               setSubCategory(p.subCategory);
               setProductCollection(p.productCollection);
               setFit(p.fit);
               setBestseller(p.bestseller);
               setNewDrop(p.newDrop);
               setSizes(p.sizes);
               setReviews(p.reviews || []);
               
               if (p.colors && p.colors.length > 0) {
                  const populatedColors = p.colors.map(c => {
                     // Pad images array to 6 elements
                     const paddedImages = [...c.images];
                     while (paddedImages.length < 6) paddedImages.push(null);
                     return { name: c.colorName, images: paddedImages };
                  });
                  setColors(populatedColors);
               }
            } else {
               toast.error(response.data.message);
            }
         } catch (error) {
            console.log(error);
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
   }, [id]);

   const handleColorImageChange = (colorIndex, imageIndex, file) => {
      const newColors = [...colors];
      newColors[colorIndex].images[imageIndex] = file;
      setColors(newColors);
   };

   const handleColorNameChange = (colorIndex, newName) => {
      const newColors = [...colors];
      newColors[colorIndex].name = newName;
      setColors(newColors);
   };

   const addColorBlock = () => {
      setColors([...colors, { name: '', images: [null, null, null, null, null, null] }]);
   };

   const removeColorBlock = (index) => {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
   };

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("id", id)
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("mainPrice",mainPrice)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("productCollection",productCollection)
      formData.append("fit",fit)
      formData.append("bestseller",bestseller)
      formData.append("newDrop",newDrop)
      formData.append("sizes",JSON.stringify(sizes))

      // Append Existing Colors Data (urls vs new files)
      const existingColors = colors.map(c => {
         return {
            colorName: c.name,
            images: c.images.map(img => typeof img === 'string' ? img : null)
         };
      });
      formData.append("existingColors", JSON.stringify(existingColors));

      // Append new images for each color
      colors.forEach((color, colorIdx) => {
         color.images.forEach((img, imgIdx) => {
            if (img && typeof img !== 'string') {
               formData.append(`image_${color.name}_${imgIdx}`, img);
            }
         });
      });

      // Also append generic image1..image6 for backward compatibility if no colors named
      if (colors.length > 0) {
         if (colors[0].images[0]) formData.append("image1", colors[0].images[0]);
         if (colors[0].images[1]) formData.append("image2", colors[0].images[1]);
         if (colors[0].images[2]) formData.append("image3", colors[0].images[2]);
         if (colors[0].images[3]) formData.append("image4", colors[0].images[3]);
         if (colors[0].images[4]) formData.append("image5", colors[0].images[4]);
         if (colors[0].images[5]) formData.append("image6", colors[0].images[5]);
      }

      const response = await axios.post(backendUrl + "/api/product/update",formData,{headers:{token}})

      if (response.data.success) {
        toast.success("Product Updated Successfully")
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

   const deleteReviewHandler = async (reviewId) => {
      try {
         const response = await axios.post(backendUrl + "/api/product/review/delete", { productId: id, reviewId }, { headers: { token } });
         if (response.data.success) {
            toast.success("Review deleted");
            setReviews(prev => prev.filter(r => r._id !== reviewId));
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   const [replyingTo, setReplyingTo] = useState(null);
   const [replyText, setReplyText] = useState("");

   const adminReplyHandler = async (e, reviewId) => {
      e.preventDefault();
      try {
         const response = await axios.post(backendUrl + "/api/product/review/reply/admin", {
            productId: id,
            reviewId,
            text: replyText,
            name: "Admin",
            isAdmin: true
         }, { headers: { token } });
         
         if (response.data.success) {
            toast.success("Reply submitted");
            setReplyText('');
            setReplyingTo(null);
            
            // Optimistically update
            setReviews(prev => {
                const newReviews = [...prev];
                const rIndex = newReviews.findIndex(r => r._id === reviewId);
                if (rIndex !== -1) {
                    newReviews[rIndex].replies = [
                        ...(newReviews[rIndex].replies || []), 
                        { _id: Math.random().toString(), name: "Admin", text: replyText, date: Date.now(), isAdmin: true }
                    ];
                }
                return newReviews;
            });
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   const deleteReplyHandler = async (reviewId, replyId) => {
      try {
         const response = await axios.post(backendUrl + "/api/product/review/reply/delete", { productId: id, reviewId, replyId }, { headers: { token } });
         if (response.data.success) {
            toast.success("Reply deleted");
            setReviews(prev => {
                const newReviews = [...prev];
                const rIndex = newReviews.findIndex(r => r._id === reviewId);
                if (rIndex !== -1 && newReviews[rIndex].replies) {
                    newReviews[rIndex].replies = newReviews[rIndex].replies.filter(rep => rep._id !== replyId);
                }
                return newReviews;
            });
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading product data...</div>
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5'>
        
        <div className="w-full">
            <h3 className="text-lg font-bold mb-4">Product Variants (Colors)</h3>
            <div className="flex flex-col gap-6">
                {colors.map((color, colorIdx) => (
                    <div key={colorIdx} className="border border-gray-200 p-4 rounded bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <input 
                                type="text" 
                                value={color.name} 
                                onChange={(e) => handleColorNameChange(colorIdx, e.target.value)}
                                placeholder="Color Name (e.g., Black, White)"
                                className="px-3 py-2 border border-gray-300 min-w-[200px]"
                                required
                            />
                            {colors.length > 1 && (
                                <button type="button" onClick={() => removeColorBlock(colorIdx)} className="text-red-500 text-sm font-bold">Remove</button>
                            )}
                        </div>
                        <div className='flex gap-2 flex-wrap'>
                            {[0, 1, 2, 3, 4, 5].map((imgIdx) => {
                                const currentImg = color.images[imgIdx];
                                const imgSrc = !currentImg 
                                    ? assets.upload_area 
                                    : (typeof currentImg === 'string' ? currentImg : URL.createObjectURL(currentImg));
                                return (
                                <label key={imgIdx} htmlFor={`image_${colorIdx}_${imgIdx}`}>
                                    <img className='w-20 h-20 object-cover rounded cursor-pointer border border-gray-100' src={imgSrc} alt="" />
                                    <input onChange={(e)=>handleColorImageChange(colorIdx, imgIdx, e.target.files[0])} type="file" id={`image_${colorIdx}_${imgIdx}`} hidden/>
                                </label>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addColorBlock} className="mt-4 border border-black text-black px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                + Add Another Color
            </button>
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-2"></div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Collection (Optional)</p>
              <input onChange={(e) => setProductCollection(e.target.value)} value={productCollection} className='w-full px-3 py-2 sm:w-[150px]' type="text" placeholder='e.g. FIFA' />
            </div>

            <div>
              <p className='mb-2'>Fit</p>
              <select onChange={(e) => setFit(e.target.value)} value={fit} className='w-full px-3 py-2'>
                  <option value="Regular Fit">Regular Fit</option>
                  <option value="Oversized Fit">Oversized Fit</option>
                  <option value="Slim Fit">Slim Fit</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Main Price</p>
              <input onChange={(e) => setMainPrice(e.target.value)} value={mainPrice} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='e.g. 2000' />
            </div>

            <div>
              <p className='mb-2'>Offer Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='e.g. 1500' required />
            </div>

        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])}>
              <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
            </div>
            
            <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])}>
              <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])}>
              <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("Free Size") ? prev.filter( item => item !== "Free Size") : [...prev,"Free Size"])}>
              <p className={`${sizes.includes("Free Size") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Free Size</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <div className='flex gap-2 items-center'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
            <label className='cursor-pointer' htmlFor="bestseller">Featured in Best Sellers</label>
          </div>
          <div className='flex gap-2 items-center'>
            <input onChange={() => setNewDrop(prev => !prev)} checked={newDrop} type="checkbox" id='newDrop' />
            <label className='cursor-pointer' htmlFor="newDrop">Featured in New Drops</label>
          </div>
        </div>

        {reviews && reviews.length > 0 && (
            <div className="w-full mt-6">
               <h3 className="text-lg font-bold mb-4 border-t pt-6">Product Reviews</h3>
               <div className="flex flex-col gap-4">
                  {reviews.map((rev) => (
                     <div key={rev._id} className="border border-gray-200 p-4 rounded bg-white flex flex-col gap-4">
                        <div className="flex justify-between items-start gap-4 border-b border-gray-100 pb-4">
                           <div>
                              <p className="font-bold text-sm">{rev.name}</p>
                              <p className="text-xs text-yellow-500 mb-1">{"★".repeat(rev.rating)}</p>
                              <p className="text-sm text-gray-700">{rev.text}</p>
                           </div>
                           <div className="flex flex-col gap-2">
                               <button type="button" onClick={() => deleteReviewHandler(rev._id)} className="text-red-500 text-xs font-bold border border-red-200 px-3 py-1 hover:bg-red-50">Delete</button>
                               <button type="button" onClick={() => { setReplyingTo(rev._id); setReplyText(''); }} className="text-blue-500 text-xs font-bold border border-blue-200 px-3 py-1 hover:bg-blue-50">Reply</button>
                           </div>
                        </div>

                        {/* Admin Reply Input */}
                        {replyingTo === rev._id && (
                            <form onSubmit={(e) => adminReplyHandler(e, rev._id)} className="flex flex-col gap-2">
                                <textarea 
                                    required
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write an admin reply..."
                                    className="border border-gray-300 p-2 text-xs focus:outline-none focus:border-black w-full min-h-[60px]"
                                ></textarea>
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-black text-white px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:opacity-80">Post Reply</button>
                                    <button type="button" onClick={() => setReplyingTo(null)} className="bg-gray-100 text-black px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200">Cancel</button>
                                </div>
                            </form>
                        )}

                        {/* Display Replies */}
                        {rev.replies && rev.replies.length > 0 && (
                            <div className="pl-6 border-l-2 border-gray-100 flex flex-col gap-3">
                                {rev.replies.map((reply, rIndex) => (
                                    <div key={rIndex} className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-sm">{reply.name}</p>
                                                {reply.isAdmin && (
                                                    <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest">Admin</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-700 mt-1">{reply.text}</p>
                                        </div>
                                        <button type="button" onClick={() => deleteReplyHandler(rev._id, reply._id)} className="text-red-500 text-[10px] font-bold hover:underline">Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
        )}

        <button type="submit" className='w-32 py-3 mt-4 bg-black text-white'>UPDATE</button>

    </form>
  )
}

export default Edit