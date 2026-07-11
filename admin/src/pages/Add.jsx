import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

   const [colors, setColors] = useState([
     { name: 'Default', images: [null, null, null, null] }
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
   const [sizes, setSizes] = useState([]);

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
      setColors([...colors, { name: '', images: [null, null, null, null] }]);
   };

   const removeColorBlock = (index) => {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
   };

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("mainPrice",mainPrice)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("productCollection",productCollection)
      formData.append("fit",fit)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      // Append Color Data
      const colorNames = colors.map(c => c.name);
      formData.append("colorsData", JSON.stringify(colorNames));

      // Append images for each color
      colors.forEach((color, colorIdx) => {
         color.images.forEach((img, imgIdx) => {
            if (img) {
               formData.append(`image_${color.name}_${imgIdx}`, img);
            }
         });
      });

      // Also append generic image1..image4 for backward compatibility if no colors named
      if (colors.length > 0) {
         if (colors[0].images[0]) formData.append("image1", colors[0].images[0]);
         if (colors[0].images[1]) formData.append("image2", colors[0].images[1]);
         if (colors[0].images[2]) formData.append("image3", colors[0].images[2]);
         if (colors[0].images[3]) formData.append("image4", colors[0].images[3]);
      }

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setColors([{ name: 'Default', images: [null, null, null, null] }])
        setPrice('')
        setMainPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-8'>
        
        <div className="w-full">
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Product Variants (Colors)</h3>
            <div className="flex flex-col gap-4">
                {colors.map((color, colorIdx) => (
                    <div key={colorIdx} className="border border-gray-200 p-4 rounded bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <input 
                                type="text" 
                                value={color.name} 
                                onChange={(e) => handleColorNameChange(colorIdx, e.target.value)}
                                placeholder="Color Name (e.g., Black, White)"
                                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all min-w-[200px]"
                                required
                            />
                            {colors.length > 1 && (
                                <button type="button" onClick={() => removeColorBlock(colorIdx)} className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700">Remove</button>
                            )}
                        </div>
                        <div className='flex gap-2'>
                            {[0, 1, 2, 3].map((imgIdx) => (
                                <label key={imgIdx} htmlFor={`image_${colorIdx}_${imgIdx}`}>
                                    <img className='w-20 object-cover rounded cursor-pointer border border-gray-100' src={!color.images[imgIdx] ? assets.upload_area : URL.createObjectURL(color.images[imgIdx])} alt="" />
                                    <input onChange={(e)=>handleColorImageChange(colorIdx, imgIdx, e.target.files[0])} type="file" id={`image_${colorIdx}_${imgIdx}`} hidden/>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addColorBlock} className="mt-4 text-xs font-bold uppercase tracking-widest border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-colors">
                + Add Another Color
            </button>
        </div>

        <div className="w-full h-[1px] bg-gray-100 my-2"></div>

        <div className='w-full'>
          <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all h-32 resize-none' placeholder='Write content here' required/>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Collection (Optional)</p>
              <input onChange={(e) => setProductCollection(e.target.value)} value={productCollection} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all' type="text" placeholder='e.g. FIFA' />
            </div>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Fit</p>
              <select onChange={(e) => setFit(e.target.value)} value={fit} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all'>
                  <option value="Regular Fit">Regular Fit</option>
                  <option value="Oversized Fit">Oversized Fit</option>
                  <option value="Slim Fit">Slim Fit</option>
              </select>
            </div>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Main Price</p>
              <input onChange={(e) => setMainPrice(e.target.value)} value={mainPrice} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all' type="Number" placeholder='e.g. 2000' />
            </div>

            <div>
              <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Offer Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all' type="Number" placeholder='e.g. 1500' required />
            </div>

        </div>

        </div>

        <div>
          <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>Product Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            {["S", "M", "L", "XL", "XXL", "Free Size"].map(size => (
              <div key={size} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter( item => item !== size) : [...prev,size])}>
                <p className={`${sizes.includes(size) ? "bg-black text-white" : "bg-gray-100 text-gray-600" } px-4 py-2 rounded-lg cursor-pointer font-bold text-sm transition-colors`}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-3 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black" />
          <label className='cursor-pointer text-sm font-semibold text-gray-900' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type="submit" className='w-full sm:w-auto px-10 py-4 mt-4 bg-black text-white font-bold tracking-widest uppercase rounded-lg hover:bg-gray-900 transition-colors shadow-md'>Add Product</button>

      </form>
    </div>
  )
}

export default Add