import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        setLatestProducts(products.slice(0, 6)); 
    }, [products]);

    useEffect(() => {
        if (latestProducts.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(titleRef.current, 
                    { y: 50, opacity: 0 },
                    { 
                        y: 0, opacity: 1, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                    }
                );
                gsap.fromTo(gridRef.current.children,
                    { y: 100, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
                        scrollTrigger: { trigger: gridRef.current, start: "top 75%" }
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }
    }, [latestProducts]);

  return (
    <div ref={sectionRef} className='my-24 max-w-[1200px] mx-auto px-4 overflow-hidden'>
      <div ref={titleRef} className='mb-16 w-max'>
          <h2 className='text-4xl sm:text-5xl font-black text-offside-black mb-2'>NEW ARRIVALS</h2>
          <div className='w-[150px] h-3 bg-offside-primary -mt-4 ml-6 rounded-md -z-10 relative opacity-80'></div>
      </div>

      <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} mainPrice={item.mainPrice} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
