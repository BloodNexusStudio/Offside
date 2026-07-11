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
    <div className="max-w-4xl">
      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Add New Product</h3>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
          
          <div className="w-full bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Product Variants (Colors)</h3>
              <div className="flex flex-col gap-6">
                  {colors.map((color, colorIdx) => (
                      <div key={colorIdx} className="border border-white/10 p-5 rounded-lg bg-[#0a0a0a]/50">
                          <div className="flex items-center justify-between mb-4">
                              <input 
                                  type="text" 
                                  value={color.name} 
                                  onChange={(e) => handleColorNameChange(colorIdx, e.target.value)}
                                  placeholder="COLOR NAME (E.G., BLACK, WHITE)"
                                  className="px-4 py-2 border border-white/20 bg-transparent text-white placeholder-gray-600 font-bold uppercase tracking-wider text-xs min-w-[200px] outline-none focus:border-white transition-colors rounded-md"
                                  required
                              />
                              {colors.length > 1 && (
                                  <button type="button" onClick={() => removeColorBlock(colorIdx)} className="text-red-500 hover:text-red-400 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">Remove</button>
                              )}
                          </div>
                          <div className='flex gap-4 overflow-x-auto pb-2'>
                              {[0, 1, 2, 3].map((imgIdx) => (
                                  <label key={imgIdx} htmlFor={`image_${colorIdx}_${imgIdx}`} className="shrink-0 group">
                                      <div className={`w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed flex items-center justify-center rounded-lg cursor-pointer transition-all ${!color.images[imgIdx] ? 'border-white/20 hover:border-white/50 bg-white/5' : 'border-transparent'}`}>
                                          {!color.images[imgIdx] ? (
                                              <img className='w-8 h-8 opacity-50 filter invert group-hover:opacity-100 transition-opacity' src={assets.upload_area} alt="Upload" />
                                          ) : (
                                              <img className='w-full h-full object-cover rounded-lg' src={URL.createObjectURL(color.images[imgIdx])} alt="Preview" />
                                          )}
                                      </div>
                                      <input onChange={(e)=>handleColorImageChange(colorIdx, imgIdx, e.target.files[0])} type="file" id={`image_${colorIdx}_${imgIdx}`} hidden/>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
              <button type="button" onClick={addColorBlock} className="mt-6 border border-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded-lg">
                  + Add Another Color
              </button>
          </div>

          <div className="w-full bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm grid grid-cols-1 gap-6">
            <div className='w-full'>
              <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Product name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors' type="text" placeholder='TYPE PRODUCT NAME HERE' required/>
            </div>

            <div className='w-full'>
              <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Product description</p>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors min-h-[120px]' type="text" placeholder='WRITE CONTENT HERE' required/>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 w-full'>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Category</p>
                  <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors'>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Sub category</p>
                  <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors'>
                      <option value="Topwear">Topwear</option>
                      <option value="Bottomwear">Bottomwear</option>
                      <option value="Winterwear">Winterwear</option>
                  </select>
                </div>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Collection (Optional)</p>
                  <input onChange={(e) => setProductCollection(e.target.value)} value={productCollection} className='w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors uppercase' type="text" placeholder='E.G. FIFA' />
                </div>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Fit</p>
                  <select onChange={(e) => setFit(e.target.value)} value={fit} className='w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors'>
                      <option value="Regular Fit">Regular Fit</option>
                      <option value="Oversized Fit">Oversized Fit</option>
                      <option value="Slim Fit">Slim Fit</option>
                  </select>
                </div>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Main Price</p>
                  <input onChange={(e) => setMainPrice(e.target.value)} value={mainPrice} className='w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors' type="Number" placeholder='E.G. 2000' />
                </div>

                <div>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2'>Offer Price</p>
                  <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-3 bg-transparent border border-white/20 text-white rounded-lg outline-none focus:border-white transition-colors' type="Number" placeholder='E.G. 1500' required />
                </div>

            </div>
          </div>

          <div className="w-full bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4'>Product Sizes</p>
            <div className='flex gap-3 flex-wrap'>
              {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map((size) => (
                <div key={size} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter( item => item !== size) : [...prev, size])}>
                  <p className={`${sizes.includes(size) ? "bg-white text-black font-black" : "bg-transparent text-gray-400 hover:text-white hover:border-white/50" } border border-white/20 px-5 py-2 cursor-pointer transition-all rounded uppercase tracking-wider text-sm`}>
                    {size}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='flex gap-3 mt-2 items-center'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className="w-5 h-5 accent-white cursor-pointer bg-[#0a0a0a]" />
            <label className='cursor-pointer text-sm font-bold uppercase tracking-wider text-white' htmlFor="bestseller">Add to bestseller</label>
          </div>

          <button type="submit" className='w-full sm:w-auto px-12 py-4 mt-4 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors rounded-lg'>
            Add Product
          </button>

      </form>
    </div>
  )
}

export default Add