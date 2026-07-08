import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Shirt, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text slide up staggered animation
      const chars = textRef.current.querySelectorAll('.hero-line');
      
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Image slow scale effect
      gsap.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        delay: 0.2
      });
      
    }, heroRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[calc(100vh-160px)] min-h-[600px] flex items-center bg-offside-white overflow-hidden my-6 sm:my-10">
      
      {/* Content Container */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 h-full">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center h-full px-6 sm:px-12 pt-20 md:pt-0 pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 text-offside-black">
              Just Launched
            </p>
            
            <h1 ref={textRef} className="text-5xl sm:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] font-heading font-bold leading-[0.9] text-offside-black mb-6 uppercase">
              <div className="overflow-hidden"><div className="hero-line">MINIMAL</div></div>
              <div className="overflow-hidden"><div className="hero-line">TIMELESS</div></div>
              <div className="overflow-hidden"><div className="hero-line">UNAPOLOGETIC</div></div>
            </h1>
            
            <p className="text-sm sm:text-base font-medium text-gray-800 max-w-sm mb-8 leading-relaxed">
              Oversized. Minimal. Unapologetic.<br/>
              Crafted from 240 GSM premium cotton <br/>
              for all-day comfort and attitude.
            </p>
            
            <Link to="/collection" className="inline-block mb-12">
                <button className="flex items-center gap-4 bg-offside-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </button>
            </Link>

            {/* Badges */}
            <div className="flex items-center gap-6 sm:gap-10 border-t border-gray-200 pt-8 mt-auto">
                <div className="flex items-center gap-3">
                    <Box className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-offside-black" />
                    <div>
                        <h4 className="text-[10px] sm:text-xs font-bold uppercase">240 GSM</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Premium Cotton</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-offside-black" />
                    <div>
                        <h4 className="text-[10px] sm:text-xs font-bold uppercase">Oversized Fit</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Street Ready</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-offside-black" />
                    <div>
                        <h4 className="text-[10px] sm:text-xs font-bold uppercase">Limited Drop</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Don't Miss Out</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="relative h-full flex items-center justify-center bg-offside-black overflow-hidden group">
          <img 
            ref={imageRef}
            src="/hero_model_back.png" 
            alt="Hero Model" 
            className="w-full h-full object-cover"
          />
          
          {/* Slider Controls */}
          <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-12 right-6 sm:right-12 flex items-center gap-2">
            <div className="w-8 h-[2px] bg-white"></div>
            <div className="w-8 h-[2px] bg-white/30"></div>
            <div className="w-8 h-[2px] bg-white/30"></div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
