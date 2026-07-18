import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CollectionProductItem from '../components/CollectionProductItem';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';

const BestSellers = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sizeFilter,setSizeFilter] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSize = (size) => {
    if (sizeFilter.includes(size)) {
      setSizeFilter(prev=> prev.filter(item => item !== size))
    }
    else{
      setSizeFilter(prev => [...prev,size])
    }
  }

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSizeFilter([]);
  }

  const applyFilter = () => {
    let productsCopy = products.filter(item => item.bestseller);

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category) || (category.includes('Unisex') && item.unisex));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if (sizeFilter.length > 0 ) {
      // Assuming item.sizes is an array of strings like ["S", "M", "L"]
      productsCopy = productsCopy.filter(item => item.sizes && item.sizes.some(size => sizeFilter.includes(size)))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,sizeFilter,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='w-full'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-8 py-10 flex flex-col lg:flex-row gap-10'>
        
        {/* Left Sidebar (Filters) */}
        <div className={`lg:w-64 flex-shrink-0 ${showFilter ? 'block' : 'hidden lg:block'}`}>
          
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-offside-black'>Filters</h2>
            <button onClick={clearAllFilters} className='flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-500 hover:text-offside-black transition-colors'>
              <RefreshCw className='w-3 h-3' /> Clear All
            </button>
          </div>

          {/* Categories */}
          <div className='border-t border-gray-200 py-6'>
            <h3 className='text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex justify-between'>
              Categories <span>—</span>
            </h3>
            <div className='flex flex-col gap-3'>
              {['Men', 'Women', 'Unisex'].map(cat => (
                <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${category.includes(cat) ? 'bg-offside-black border-offside-black' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {category.includes(cat) && <span className='w-2 h-2 bg-white rounded-sm'></span>}
                  </div>
                  <input type="checkbox" value={cat} onChange={toggleCategory} checked={category.includes(cat)} className="hidden" />
                  <span className='text-xs font-medium text-gray-700'>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className='border-t border-gray-200 py-6'>
            <h3 className='text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex justify-between'>
              Type <span>—</span>
            </h3>
            <div className='flex flex-col gap-3'>
              {['Topwear', 'Bottomwear'].map(type => (
                <label key={type} className='flex items-center gap-3 cursor-pointer group'>
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${subCategory.includes(type) ? 'bg-offside-black border-offside-black' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {subCategory.includes(type) && <span className='w-2 h-2 bg-white rounded-sm'></span>}
                  </div>
                  <input type="checkbox" value={type} onChange={toggleSubCategory} checked={subCategory.includes(type)} className="hidden" />
                  <span className='text-xs font-medium text-gray-700'>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className='border-t border-gray-200 py-6'>
            <h3 className='text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex justify-between'>
              Size <span>—</span>
            </h3>
            <div className='grid grid-cols-4 gap-2'>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`py-2 text-[10px] font-bold rounded-sm border transition-colors ${sizeFilter.includes(size) ? 'border-offside-black text-offside-black bg-gray-50' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side (Products) */}
        <div className='flex-1'>
          
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4'>
              <div>
                  <p className='text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1'>All Products</p>
                  <div className='flex items-baseline gap-3'>
                    <h1 className='text-3xl sm:text-4xl font-heading font-bold text-offside-black uppercase tracking-wide'>
                        Best Sellers
                    </h1>
                    <span className='text-[11px] font-bold uppercase tracking-widest text-gray-400'>
                        / {filterProducts.length} Products
                    </span>
                  </div>
              </div>
              
              <div className='flex items-center gap-2 mt-4 sm:mt-0'>
                  {/* Mobile Filter Toggle */}
                  <button onClick={() => setShowFilter(!showFilter)} className='lg:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-sm text-offside-black transition-colors'>
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                  
                  {/* Sort */}
                  <select onChange={(e)=>setSortType(e.target.value)} className='border border-offside-black text-xs font-bold uppercase tracking-widest text-offside-black px-4 py-2.5 rounded-md cursor-pointer outline-none hover:bg-gray-50 transition-colors'>
                    <option value="relavent">Sort By: Featured</option>
                    <option value="low-high">Sort By: Low to High</option>
                    <option value="high-low">Sort By: High to Low</option>
                  </select>
              </div>
          </div>

          {/* Map Products */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filterProducts.map((item,index)=>(
                <CollectionProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} mainPrice={item.mainPrice} />
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default BestSellers
