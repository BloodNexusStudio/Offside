import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CultSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div ref={textRef} className="lg:col-span-4 flex flex-col justify-center relative z-40">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Offside Cult
          </p>
          <h2 className="text-6xl sm:text-7xl lg:text-[8rem] font-heading font-bold uppercase text-offside-black leading-[0.8] mb-8 drop-shadow-sm">
            CULT
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 mb-10 max-w-[250px] leading-relaxed">
            More than a brand.<br/>
            It's a mindset.<br/>
            Join the movement.
          </p>
          <Link to="/collection">
            <button className="flex items-center gap-4 bg-offside-black text-white px-8 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity shadow-xl">
              Explore Cult
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Right Images (Polaroids) */}
        <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] lg:h-[700px] w-full flex items-center justify-center mt-12 lg:mt-0">
            
            {/* Polaroid 1 */}
            <div className="absolute left-0 sm:left-[5%] top-1/2 -translate-y-1/2 z-10 -rotate-6 bg-[#fdfbf7] p-2 sm:p-4 pb-12 sm:pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 duration-500 cursor-pointer border border-gray-200">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-8 bg-zinc-800/90 rotate-3 shadow-md"></div>
                <div className="w-[140px] sm:w-[220px] lg:w-[260px] aspect-[4/5] bg-gray-200 overflow-hidden">
                    <img src="/banner3.jpeg" alt="Cult 1" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Polaroid 2 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 rotate-3 bg-[#fdfbf7] p-2 sm:p-4 pb-12 sm:pb-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 duration-500 cursor-pointer border border-gray-200 mt-8 sm:mt-12">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-8 bg-zinc-800/90 -rotate-2 shadow-md"></div>
                <div className="w-[160px] sm:w-[240px] lg:w-[280px] aspect-[4/5] bg-gray-200 overflow-hidden">
                    <img src="/off.jpeg" alt="Cult 2" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Polaroid 3 */}
            <div className="absolute right-0 sm:right-[5%] top-1/2 -translate-y-1/2 z-30 -rotate-2 bg-[#fdfbf7] p-2 sm:p-4 pb-12 sm:pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 duration-500 cursor-pointer border border-gray-200 -mt-10 sm:-mt-16">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-8 bg-zinc-800/90 rotate-2 shadow-md"></div>
                <div className="w-[150px] sm:w-[230px] lg:w-[270px] aspect-[4/5] bg-gray-200 overflow-hidden">
                    <img src="/hero_model_back.jpeg" alt="Cult 3" className="w-full h-full object-cover" />
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default CultSection;
