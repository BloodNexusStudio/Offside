import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CollectionsSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const collections = [
    {
        title: "ESSENTIALS",
        subtitle: "Built for everyday.",
        image: assets.collection_essentials,
        theme: "Essentials"
    },
    {
        title: "FIFA",
        subtitle: "Inspired by the Beautiful Game.",
        image: assets.collection_fifa,
        theme: "FIFA"
    },
    {
        title: "HIP-HOP",
        subtitle: "Music. Culture. Attitude.",
        image: assets.collection_hiphop,
        theme: "Hip-Hop"
    },
    {
        title: "GAMING",
        subtitle: "Play Beyond Reality.",
        image: assets.collection_gaming,
        theme: "Gaming"
    },
    {
        title: "ANIME",
        subtitle: "Wear Your Favorite Worlds.",
        image: assets.collection_anime,
        theme: "Anime"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-offside-black py-20 px-4 sm:px-8">
        
        <div className="max-w-[1600px] mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
                <h2 className="text-[10px] sm:text-xs font-bold text-[#c6a87c] uppercase tracking-[0.3em] mb-2">Our Collections</h2>
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-wide">Explore Our Worlds</h3>
            </div>
            
            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-4">
                <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>
                <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <i className="ri-arrow-right-line text-xl"></i>
                </button>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-[1600px] mx-auto relative group">
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {collections.map((col, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] lg:w-[450px] aspect-[3/4] snap-center relative group overflow-hidden cursor-pointer rounded-md bg-black"
                        onClick={() => navigate(`/collection?theme=${col.theme}`)}
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                            style={{ backgroundImage: `url(${col.image})` }}
                        ></div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                            <span className="text-[#c6a87c] text-xs font-bold tracking-widest mb-3 border border-[#c6a87c]/30 px-3 py-1 self-start rounded-full">
                                0{index + 1}
                            </span>
                            <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide mb-2">
                                {col.title}
                            </h4>
                            <p className="text-sm text-gray-300 mb-6">
                                {col.subtitle}
                            </p>
                            
                            <button className="flex items-center justify-between w-full border border-white/30 bg-transparent px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                                <span>Explore Collection</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Mobile Navigation Indicators (Optional, but scroll is sufficient) */}
        </div>

    </section>
  );
};

export default CollectionsSection;
