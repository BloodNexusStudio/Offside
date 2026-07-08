import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CollectionsSection = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  const collections = [
    {
        title: "FIFA\nCOLLECTION",
        image: "/hero_model_back.png",
        link: "#"
    },
    {
        title: "HIPHOP\nCOLLECTION",
        image: "/hiphop_collection.png",
        link: "#"
    },
    {
        title: "ANIME\nCOLLECTION",
        image: "/anime_collection.png",
        link: "#"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Parallax zoom effect on images as you scroll
        imagesRef.current.forEach((img) => {
            gsap.fromTo(img, 
                { scale: 1 }, 
                {
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
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
    <section ref={sectionRef} className="w-full bg-offside-black py-16 px-4 sm:px-8">
        
        <div className="text-center mb-10">
            <h2 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.3em]">Launching Soon</h2>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    className="group relative aspect-[4/3] md:aspect-square overflow-hidden cursor-pointer bg-black"
                >
                    <img 
                        ref={(el) => (imagesRef.current[index] = el)}
                        src={col.image} 
                        alt={col.title} 
                        className="w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 pointer-events-none">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white uppercase whitespace-pre-line mb-6">
                            {col.title}
                        </h3>
                        <button className="self-start border border-white/50 text-white px-6 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-auto hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                            Launching Soon
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>

    </section>
  );
};

export default CollectionsSection;
