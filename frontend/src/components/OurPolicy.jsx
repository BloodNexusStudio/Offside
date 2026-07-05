import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../assets/assets';

gsap.registerPlugin(ScrollTrigger);

const OurPolicy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imgRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
            gsap.fromTo(contentRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} className="my-32 overflow-hidden max-w-[1200px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        <div ref={contentRef} className="order-2 md:order-1 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-offside-black">
            DOWNLOAD APP & <br /> GET THE VOUCHER!
          </h2>
          <p className="mb-10 text-lg font-medium text-gray-500 max-w-sm mx-auto md:mx-0">
            Get 30% off for first transaction using our new mobile app for now.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="bg-black text-white px-6 py-3 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <p className="text-[10px] leading-none text-gray-300">Download on the</p>
                <p className="text-sm font-bold leading-tight">App Store</p>
              </div>
            </div>
            <div className="bg-black text-white px-6 py-3 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-2xl">▶️</span>
              <div className="text-left">
                <p className="text-[10px] leading-none text-gray-300">GET IT ON</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <img 
            ref={imgRef}
            src={assets.hero_img} 
            alt="App" 
            className="max-w-[400px] w-full mix-blend-multiply drop-shadow-xl" 
          />
        </div>

      </div>
    </section>
  );
};

export default OurPolicy;
