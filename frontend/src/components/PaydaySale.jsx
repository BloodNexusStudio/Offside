import React, { useRef, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PaydaySale = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imgRef.current,
                { x: -100, opacity: 0 },
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
    <section ref={sectionRef} className="bg-offside-primary overflow-hidden my-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4">
        <div className="pt-10 md:pt-0">
          <img 
            ref={imgRef}
            src="/hero_secondary.png" 
            alt="Sale" 
            className="w-full max-w-[500px] mx-auto drop-shadow-2xl mix-blend-multiply" 
          />
        </div>
        <div ref={contentRef} className="pb-16 md:py-20 z-10 text-center md:text-left">
          <h2 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] mb-6 text-offside-black">
            <span className="relative isolate before:absolute before:content-[''] before:top-2 before:-left-4 before:h-[90%] before:w-[calc(100%+4rem)] before:-rotate-2 before:-z-10 before:bg-white inline-block">
              PAYDAY
            </span>
            <br />
            SALE NOW
          </h2>
          <p className="mb-6 text-lg font-medium text-offside-black max-w-sm mx-auto md:mx-0">
            Spend minimal $100 get 30% off voucher code for your next purchase
          </p>
          <h4 className="font-bold text-2xl text-offside-black mb-2">
            1 July - 10 July 2026
          </h4>
          <p className="text-offside-black font-medium mb-8">*Terms and conditions apply</p>
          <div>
            <Link to="/collection">
              <MagneticButton className="inline-block bg-offside-black text-white px-8 py-4 rounded-md text-base font-bold hover:bg-white hover:text-black transition-colors">
                Shop Now
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaydaySale;
