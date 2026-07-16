import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BestSellerSection = () => {
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const best = products.filter(item => item.bestseller);
        setBestSellers(best.slice(0, 4));
    }, [products])

    useEffect(() => {
        if (bestSellers.length > 0) {
            const ctx = gsap.context(() => {
                // Header animation
                gsap.from(headerRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                });

                // Staggered grid items animation
                const items = gridRef.current.children;
                gsap.from(items, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                    }
                });

            }, sectionRef);

            return () => ctx.revert();
        }
    }, [bestSellers]);

    if (bestSellers.length === 0) {
        return (
            <section ref={sectionRef} className="w-full py-12 px-6 sm:px-12 bg-gray-50/30">
                <div className="max-w-[1400px] mx-auto text-center py-20">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Most Loved</p>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-300 uppercase mb-4">No Best Sellers Yet</h2>
                    <p className="text-gray-500 text-sm">Head over to the Admin Panel and check "Featured in Best Sellers" on a product.</p>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="w-full py-12 px-6 sm:px-12 bg-gray-50/30">
            <div className="max-w-[1400px] mx-auto">
                
                {/* Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                            Most Loved
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-offside-black uppercase">
                            Best Sellers.
                        </h2>
                    </div>
                    <Link to="/best-sellers" className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black hover:opacity-60 transition-opacity mt-6 md:mt-0 pb-1">
                        View All Best Sellers
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* Product Grid */}
                <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {bestSellers.map((item, index) => (
                        <div key={index}>
                            <ProductItem 
                                id={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                                mainPrice={item.mainPrice}
                            />
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="flex justify-center mt-12">
                    <Link to="/best-sellers">
                        <button className="bg-white border border-gray-300 text-offside-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                            Show More
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default BestSellerSection;
