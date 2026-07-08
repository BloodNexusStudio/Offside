import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const LookbookSection = () => {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[600px] overflow-hidden">
      
      {/* Left Side - Black Text Content */}
      <div className="w-full md:w-[45%] bg-offside-black text-white p-12 md:p-20 lg:p-32 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Lookbook
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold uppercase leading-[1] md:leading-[0.9] text-white mb-8">
            BUILT FOR<br/>EVERY MOMENT.
          </h2>
          <p className="text-sm font-medium text-gray-400 mb-12 max-w-sm leading-relaxed">
            From the streets to everywhere in between. OFFSIDE fits your vibe.
          </p>
          <Link to="/contact">
            <MagneticButton className="inline-flex items-center gap-4 bg-white text-offside-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Explore Lookbook
              <span>→</span>
            </MagneticButton>
          </Link>
        </motion.div>
      </div>

      {/* Right Side - Image Image */}
      <div className="w-full md:w-[55%] relative h-[400px] md:h-auto overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/lookbook_model.png"
          alt="Lookbook Model"
          className="w-full h-full object-cover"
        />
      </div>

    </section>
  )
}

export default LookbookSection
