import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Target, Star, Diamond, Hourglass, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const missionRef = useRef(null);
  const missionImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Hero Text stagger
        const chars = heroTextRef.current.querySelectorAll('.hero-line');
        gsap.from(chars, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
            delay: 0.2
        });

        // Mission Image Parallax
        if (missionImgRef.current && missionRef.current) {
            gsap.fromTo(missionImgRef.current,
                { y: -30, scale: 1.1 },
                {
                    y: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 sm:px-16 py-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">
                    About Offside
                </p>
                <h1 ref={heroTextRef} className="text-5xl sm:text-7xl lg:text-[6rem] font-heading font-bold leading-[0.9] text-offside-black mb-8 uppercase">
                    <div className="overflow-hidden"><div className="hero-line">A NEW BRAND.</div></div>
                    <div className="overflow-hidden"><div className="hero-line">A CLEAR</div></div>
                    <div className="overflow-hidden"><div className="hero-line">VISION.</div></div>
                </h1>
                
                <div className="w-12 h-[1px] bg-offside-black mb-8"></div>
                
                <p className="text-sm sm:text-base font-medium text-gray-800 max-w-sm mb-6 leading-relaxed">
                    OFFSIDE is a just started clothing brand built on the belief that style doesn't have to shout to be noticed.
                </p>
                <p className="text-sm sm:text-base font-medium text-gray-800 max-w-sm mb-10 leading-relaxed">
                    We create minimal, timeless pieces for those who choose to stand apart.
                </p>

                <Link to="/collection">
                    <button className="flex items-center gap-4 bg-offside-black text-white px-8 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                        Our Story
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </motion.div>
        </div>
        {/* Right Image */}
        <div className="h-full bg-gray-100 overflow-hidden">
            <img 
                src="/hero_model_back.png" 
                alt="Model Back" 
                className="w-full h-full object-cover grayscale"
            />
        </div>
      </section>

      {/* 2. OUR BEGINNING */}
      <section className="grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto py-24 px-6 sm:px-12 gap-12 sm:gap-20 items-center">
        {/* Left Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/3] bg-gray-100 overflow-hidden"
        >
            <img 
                src={assets.logo} 
                alt="Offside Tag" 
                className="w-full h-full object-cover grayscale opacity-90"
            />
        </motion.div>
        
        {/* Right Content */}
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">Our Beginning</p>
                <div className="h-[1px] w-16 bg-gray-200"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[0.9] text-offside-black mb-8 uppercase">
                Built From Passion.<br />
                Driven By Purpose.
            </h2>
            
            <p className="text-sm font-medium text-gray-600 mb-4 max-w-md leading-relaxed">
                OFFSIDE started with a simple idea — to build clothing that reflects confidence, clarity, and individuality.
            </p>
            <p className="text-sm font-medium text-gray-600 mb-12 max-w-md leading-relaxed">
                We're a new brand with big dreams and a clear direction. This is just the beginning.
            </p>
            
            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                <div>
                    <Lightbulb className="w-6 h-6 stroke-[1.5] text-offside-black mb-4" />
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">New Start</h4>
                    <p className="text-xs text-gray-500 font-medium">A new brand with a bold mindset.</p>
                </div>
                <div>
                    <Target className="w-6 h-6 stroke-[1.5] text-offside-black mb-4" />
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Clear Vision</h4>
                    <p className="text-xs text-gray-500 font-medium">Focused on quality, design and impact.</p>
                </div>
                <div>
                    <Star className="w-6 h-6 stroke-[1.5] text-offside-black mb-4" />
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Built To Last</h4>
                    <p className="text-xs text-gray-500 font-medium">Timeless pieces made to outlive trends.</p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section ref={missionRef} className="w-full bg-offside-black text-white grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 sm:px-24 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">Our Mission</p>
                    <div className="h-[1px] w-16 bg-white/20"></div>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[0.9] text-white mb-8 uppercase">
                    To Create Essentials<br />
                    That Become Your Everyday<br />
                    Statement.
                </h2>
                
                <p className="text-sm font-medium text-gray-400 max-w-md leading-relaxed mb-8">
                    We design minimal, high-quality clothing that fits into your life and elevates your style.
                </p>

                <div className="italic font-serif text-3xl opacity-80">Offside</div>
            </motion.div>
        </div>
        
        <div className="h-full bg-black overflow-hidden">
            <img 
                ref={missionImgRef}
                src="https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=2000&auto=format&fit=crop" 
                alt="Shirts on rack" 
                className="w-full h-full object-cover opacity-60"
            />
        </div>
      </section>

      {/* 4. WHAT WE STAND FOR */}
      <section className="max-w-[1400px] mx-auto py-24 px-6 sm:px-12 text-center">
        
        <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-[1px] w-16 bg-gray-200"></div>
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black">What We Stand For</h2>
            <div className="h-[1px] w-16 bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-center">
            
            <div className="flex flex-col items-center pt-8 sm:pt-0">
                <Diamond className="w-8 h-8 stroke-[1.2] text-offside-black mb-4" />
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Minimal</h4>
                <p className="text-[11px] text-gray-500 font-medium">Clean designs.<br/>No noise, just purpose.</p>
            </div>
            
            <div className="flex flex-col items-center pt-8 sm:pt-0">
                <Hourglass className="w-8 h-8 stroke-[1.2] text-offside-black mb-4" />
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Timeless</h4>
                <p className="text-[11px] text-gray-500 font-medium">Made to last.<br/>Beyond trends.</p>
            </div>
            
            <div className="flex flex-col items-center pt-8 sm:pt-0">
                <Zap className="w-8 h-8 stroke-[1.2] text-offside-black mb-4" />
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Unapologetic</h4>
                <p className="text-[11px] text-gray-500 font-medium">Be bold. Be real.<br/>Be yourself.</p>
            </div>
            
            <div className="flex flex-col items-center pt-8 sm:pt-0">
                <Shield className="w-8 h-8 stroke-[1.2] text-offside-black mb-4" />
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-offside-black mb-2">Quality</h4>
                <p className="text-[11px] text-gray-500 font-medium">Premium fabrics.<br/>Attention to every detail.</p>
            </div>

        </div>
      </section>

      {/* 5. CONTACT DETAILS */}
      <section className="max-w-[1400px] mx-auto py-16 px-6 sm:px-12 text-center border-t border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-widest text-offside-black mb-8">Get In Touch</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12 sm:gap-24 text-gray-600">
            <div className="flex flex-col items-center">
                <p className="font-bold text-offside-black text-xs uppercase tracking-widest mb-3">Address</p>
                <p className="text-sm leading-relaxed">705, K Tower, Vida A Wing<br />Raymond TenX, Thane West 400604</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-offside-black text-xs uppercase tracking-widest mb-3">Contact</p>
                <p className="text-sm leading-relaxed">support@theoffside.in<br />+91 7208859204</p>
            </div>
        </div>
      </section>

      {/* 6. FOOTER BANNER */}
      <section className="w-full bg-gray-100 py-6 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-offside-black">
            The journey has just begun.<br className="sm:hidden" /> Thank you for being here.
        </h3>
        <Link to="/collection" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-offside-black hover:opacity-60 transition-opacity">
            Join Us
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

    </div>
  );
};

export default About;
