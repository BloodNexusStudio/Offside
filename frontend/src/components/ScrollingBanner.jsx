import React from 'react';

const ScrollingBanner = () => {
  return (
    <section className="bg-offside-primary py-8 overflow-hidden">
      <div className="flex whitespace-nowrap items-center w-max animate-marquee">
        <div className="flex gap-20 items-center px-10">
            <h2 className="text-4xl font-black text-black">STREETWEAR</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">INNOVATIVE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">FASHION</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">LIFESTYLE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">OFFSIDE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
        </div>
        <div className="flex gap-20 items-center px-10">
            <h2 className="text-4xl font-black text-black">STREETWEAR</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">INNOVATIVE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">FASHION</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">LIFESTYLE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
            <h2 className="text-4xl font-black text-black">OFFSIDE</h2>
            <h2 className="text-2xl font-black text-white">★</h2>
        </div>
      </div>
    </section>
  );
};

export default ScrollingBanner;
