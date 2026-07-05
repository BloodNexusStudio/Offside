import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 4)); // Using 4 or 2 items to match the grid
    }, [products]);

    useEffect(() => {
        if (bestSeller.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(titleRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                    }
                );

                gsap.fromTo(cardsRef.current.children,
                    { scale: 0.9, opacity: 0, y: 50 },
                    {
                        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "expo.out",
                        scrollTrigger: { trigger: cardsRef.current, start: "top 70%" }
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }
    }, [bestSeller]);

  return (
    <div ref={sectionRef} className='my-24 max-w-[1200px] mx-auto px-4 overflow-hidden'>
      <div ref={titleRef} className='mb-16 w-max'>
          <h2 className='text-4xl sm:text-5xl font-black text-offside-black mb-2'>YOUNG'S FAVOURITE</h2>
          <div className='w-[150px] h-3 bg-offside-primary -mt-4 ml-6 rounded-md -z-10 relative opacity-80'></div>
      </div>

      <div ref={cardsRef} className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {
            bestSeller.map((item, index) => (
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
