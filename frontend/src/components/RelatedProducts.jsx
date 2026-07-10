import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({currentId, category, subCategory, productCollection}) => {

    const { products } = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{

        if (products.length > 0) {
            
            let productsCopy = products.slice();
            
            // Exclude the current product
            if (currentId) {
                productsCopy = productsCopy.filter((item) => item._id !== currentId);
            }

            // Filter by collection if it exists and isn't "None"
            if (productCollection && productCollection !== "None") {
                 productsCopy = productsCopy.filter((item) => item.productCollection === productCollection);
            } else {
                 // Fallback to standard category matching
                 if (category) productsCopy = productsCopy.filter((item) => category === item.category);
                 if (subCategory) productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            }

            setRelated(productsCopy.slice(0,5));
        }
        
    },[products, currentId, category, subCategory, productCollection])

  return (
    <div className='my-24'>
      <div className=' text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={"PRODUCTS"} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} mainPrice={item.mainPrice} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
