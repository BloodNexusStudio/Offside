import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewDrops = () => {
    const { products } = useContext(ShopContext);
    const [newDrops, setNewDrops] = useState([]);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Filter by newDrop flag and get top 4
        const drops = products.filter(item => item.newDrop);
        setNewDrops(drops.slice(0, 4));
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
        <section ref={sectionRef} className="w-full py-24 px-6 sm:px-12">
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

                    {/* Editorial Spacer for empty columns */}
                    {newDrops.length < 4 && (
                        <div className={`col-span-2 hidden lg:flex flex-col justify-end p-8 xl:p-12 border border-gray-300/50 rounded-xl bg-[#ebe9e1]/40 backdrop-blur-sm shadow-sm relative overflow-hidden group`}>
                            <div className="absolute top-8 right-8 w-12 h-12 border border-gray-400/50 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-gray-600">01</span>
                            </div>
                            <h3 className="text-[4rem] xl:text-[5.5rem] font-heading font-black text-offside-black opacity-[0.08] leading-[0.8] mb-6 whitespace-nowrap group-hover:scale-105 transition-transform duration-700">
                                THE ARCHIVE
                            </h3>
                            <p className="text-sm font-medium text-gray-700 max-w-sm leading-relaxed">
                                Explore our full collection of minimal, timeless, and unapologetic essentials designed to outlast trends.
                            </p>
                            <Link to="/collection" className="mt-8 text-[10px] font-bold uppercase tracking-widest text-offside-black border-b border-offside-black self-start hover:opacity-60 transition-opacity pb-1">
                                View Entire Archive →
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}

export default NewDrops;
