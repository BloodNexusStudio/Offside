import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CultSection = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
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

      // Parallax effect on images
      const images = [
        { el: img1Ref.current, y: -40 },
        { el: img2Ref.current, y: 40 },
        { el: img3Ref.current, y: -40 }
      ];

      images.forEach((img) => {
        gsap.fromTo(img.el,
            { y: img.y },
            {
                y: -img.y,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-offside-white py-24 px-6 sm:px-12 overflow-hidden border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div ref={textRef} className="lg:col-span-1 flex flex-col justify-center">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Offside Cult
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold uppercase text-offside-black leading-[0.8] mb-6">
            CULT
          </h2>
          <p className="text-sm font-medium text-gray-600 mb-10 max-w-[200px] leading-relaxed">
            More than a brand.<br/>
            It's a mindset.<br/>
            Join the movement.
          </p>
          <Link to="/collection">
            <button className="flex items-center gap-4 bg-offside-black text-white px-6 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
              Explore Cult
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Right Images */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="aspect-square bg-gray-200 overflow-hidden relative group cursor-pointer">
                <img ref={img1Ref} src="/cult_1.png" alt="Cult Lifestyle" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.3] transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <div className="aspect-square bg-gray-200 overflow-hidden relative group cursor-pointer mt-0 sm:mt-12">
                <img ref={img2Ref} src="/cult_2.png" alt="Cult Lifestyle" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.3] transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <div className="aspect-square bg-gray-200 overflow-hidden relative group cursor-pointer">
                <img ref={img3Ref} src="/hero_model_back.png" alt="Cult Lifestyle" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.3] transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default CultSection;
