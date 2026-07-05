import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewsletterBox = () => {
    const sectionRef = useRef(null);

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} className="bg-offside-primary py-20 px-4 mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO
        </h2>
        <p className="text-white text-lg font-medium mb-10">
          Type your email down below and be young wild generation
        </p>
        
        <form onSubmit={onSubmitHandler} className="bg-white p-2 flex items-center rounded-lg max-w-md mx-auto shadow-lg">
          <input 
            className="flex-1 px-4 py-2 outline-none text-offside-black text-base placeholder:text-gray-400 font-medium" 
            type="email" 
            placeholder="Add your email here" 
            required
          />
          <button type="submit" className="bg-black text-white px-8 py-3 rounded text-sm font-bold hover:bg-gray-800 transition-colors uppercase tracking-wider">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsletterBox;
