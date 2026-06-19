/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Compass, Sparkles, Wind } from "lucide-react";

export default function Hero() {
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById("catalogo");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-radial from-brand-50 via-white to-brand-100">
      {/* Decorative organic shapes simulating southern mist & peaks */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] bg-brand-100/30 rounded-full blur-3xl" />
      <div className="absolute top-12 right-1/4 w-72 h-72 bg-brand-300/20 rounded-full blur-3xl" />

      {/* Pine branch decorative subtle overlay (CSS generated style context) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.9))] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        {/* Subtle, minimalist brand badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-200/50 backdrop-blur-md text-brand-900 text-xs font-display font-medium tracking-widest uppercase mb-6 shadow-sm border border-brand-300/30"
        >
          <Wind className="w-4.5 h-4.5 text-brand-700 animate-pulse" />
          <span>ALTA PERFUMERÍA ARTESANAL</span>
        </motion.div>

        {/* Brand Title with elegant typography pairings */}
        <motion.h1 
          initial={{ opacity: 0, s: 0.95 }}
          animate={{ opacity: 1, s: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7.5xl font-serif font-semibold tracking-tight text-brand-950 mb-6 drop-shadow-sm leading-tight"
        >
          Brisa Sur Aromas
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-2xl font-light font-sans text-brand-800 max-w-2xl mx-auto tracking-wide mb-12"
        >
          La esencia del sur en cada gota
        </motion.p>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToCatalog}
            className="group relative cursor-pointer px-8 py-4 bg-brand-900 text-white rounded-full font-display font-medium text-sm tracking-wider uppercase shadow-xl hover:bg-brand-950 hover:shadow-brand-900/10 transition-all duration-300 transform active:scale-98 overflow-hidden z-10"
          >
            {/* Soft gloss hover state */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="flex items-center gap-2">
              Ver Catálogo
              <Compass className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" />
            </span>
          </button>
          
          <a
            href="#valores"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("valores")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer px-6 py-4 text-brand-800 hover:text-brand-950 rounded-full font-display font-medium text-sm tracking-wider uppercase transition-colors"
          >
            Sobre Nosotros
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-xs font-display tracking-widest text-brand-600 uppercase font-medium">Deslizar</span>
        <div className="w-1 h-3.5 bg-brand-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
