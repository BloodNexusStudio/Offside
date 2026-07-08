import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [newDrops, setNewDrops] = useState([]);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const recentProducts = [...products].sort((a, b) => b.date - a.date);
        setNewDrops(recentProducts.slice(0, 4));
    }, [products])

    useEffect(() => {
        if (newDrops.length > 0) {
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
    }, [newDrops]);

    return (
        <section ref={sectionRef} className="w-full bg-offside-white py-24 px-6 sm:px-12">
            <div className="max-w-[1400px] mx-auto">
                
                {/* Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                            New Arrivals
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-offside-black uppercase">
                            New Drops.
                        </h2>
                    </div>
                    <Link to="/collection" className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black hover:opacity-60 transition-opacity mt-6 md:mt-0 pb-1">
                        View All Products 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* Product Grid */}
                <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {newDrops.map((item, index) => (
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

            </div>
        </section>
    )
}

export default BestSeller;
