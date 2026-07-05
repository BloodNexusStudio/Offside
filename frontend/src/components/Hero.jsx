import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="pt-20 px-4 mb-20 overflow-visible max-w-[1200px] mx-auto">
      <div className="bg-offside-light rounded-[2rem] grid grid-cols-1 md:grid-cols-2 items-center isolate relative mt-10">
        
        <div className="p-10 md:py-20 md:px-12 z-10 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-sans font-black leading-[1.3] text-offside-black mb-6"
          >
            <span className="relative isolate before:absolute before:content-[''] before:top-0 before:-left-4 before:h-[95%] before:w-[calc(100%+4rem)] before:-rotate-2 before:-z-10 before:bg-white">
                MINIMAL
            </span>
            <br />
            TIMELESS
            <br />
            <span className="relative isolate before:absolute before:content-[''] before:top-0 before:-left-4 before:h-[95%] before:w-[calc(100%+4rem)] before:-rotate-2 before:-z-10 before:bg-offside-primary">
                UNAPOLOGETIC
            </span>
            <br />
            OFFSIDE.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 text-lg font-medium text-offside-black"
          >
            Live for influential and innovative streetwear!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/collection">
              <MagneticButton className="inline-block bg-offside-black text-white px-8 py-3 rounded-md text-base font-medium hover:bg-offside-primary hover:text-black transition-colors whitespace-nowrap border-none outline-none">
                Shop Now
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
        
        <div className="relative h-[300px] md:h-full w-full">
          <motion.img 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            src={assets.hero_img} 
            alt="Hero Model" 
            className="absolute right-0 md:right-4 bottom-0 h-[120%] md:h-[110%] w-auto object-cover md:object-contain object-bottom -z-10 mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
