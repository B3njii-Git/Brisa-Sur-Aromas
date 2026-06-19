/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Sparkles, AlertCircle, Bookmark, Compass } from "lucide-react";
import { Perfume } from "../types";

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
}

export default function PerfumeDetailModal({ perfume, onClose }: PerfumeDetailModalProps) {
  if (!perfume) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isLowStock = perfume.stock > 0 && perfume.stock <= 5;
  const isOutOfStock = perfume.stock === 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-950/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-200/40 z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        >
          {/* Left Column: Fragrance Aesthetics Close-up */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-brand-50 flex items-center justify-center min-h-[300px]">
            <img
              src={perfume.imageUrl}
              alt={perfume.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Visual ambient glass backdrop element */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Float volume badge */}
            <div className="absolute top-6 left-6 bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-md">
              <span className="text-xs font-display tracking-widest text-brand-950 font-semibold">{perfume.volume}</span>
            </div>
          </div>

          {/* Right Column: Sensory descriptions & Information */}
          <div className="p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
            {/* Top Close icon */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-6 right-6 p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-800 hover:text-brand-950 transition-all shadow-sm border border-brand-200/20"
              aria-label="Cerrar detalles"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              {/* Product Subtitle */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <Compass className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-display tracking-widest text-brand-500 uppercase font-semibold">
                  {perfume.brand}
                </span>
                <span className="text-brand-300">•</span>
                <span className="text-xs font-sans text-brand-600 font-medium">Extracto Pureza</span>
              </div>

              {/* Fragrance Name */}
              <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-950 mb-4 leading-tight">
                {perfume.name}
              </h2>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl md:text-3.5xl font-display font-medium text-brand-900">
                  {formatPrice(perfume.price)}
                </span>
                <span className="text-xs text-brand-400 uppercase tracking-widest font-semibold font-display">CLP / Envío Gratuito</span>
              </div>

              {/* Fragrance Narrative */}
              <div className="mb-8">
                <h4 className="text-xs font-display text-brand-500 uppercase tracking-widest font-semibold mb-2">
                  La Historia
                </h4>
                <p className="text-brand-800 font-light font-sans leading-relaxed text-sm md:text-base">
                  {perfume.description}
                </p>
              </div>

              {/* Scent Pyramids / Olfactory Notes */}
              <div className="mb-8">
                <h4 className="text-xs font-display text-brand-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
                  Pirámide Olfativa
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {perfume.notes.map((note, index) => {
                    // Simulating a structured sensory map
                    const intensityLabel = index === 0 ? "Nota de Salida (Inicio)" : 
                                         index === 1 ? "Nota de Corazón (Cuerpo)" : 
                                         index === 2 ? "Nota de Base (Sostén)" : "Acorde de Perfume";
                    return (
                      <div key={index} className="flex flex-col p-3 rounded-xl bg-brand-50/50 border border-brand-100/30">
                        <span className="text-[9px] font-display text-brand-500 uppercase tracking-wider font-semibold">
                          {intensityLabel}
                        </span>
                        <span className="text-sm font-sans font-medium text-brand-900 mt-0.5">
                          {note}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions and Warnings */}
            <div className="pt-6 border-t border-brand-100/60 mt-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Stock tracker visual indicator */}
                <div className="flex items-center gap-2">
                  {isOutOfStock ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium text-red-650 text-red-600 leading-none">Agotado Temporalmente</p>
                        <p className="text-[10px] text-brand-400 mt-1">Avísame al estar disponible</p>
                      </div>
                    </>
                  ) : isLowStock ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-500 animate-bounce" />
                      <div>
                        <p className="text-sm font-medium text-amber-600 leading-none">Disponibilidad Limitada</p>
                        <p className="text-[10px] text-brand-550 mt-1">Últimas {perfume.stock} botellas en almacén</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute" />
                      <div className="pl-1">
                        <p className="text-sm font-medium text-brand-850 leading-none">En Stock ({perfume.stock} disp.)</p>
                        <p className="text-[10px] text-brand-400 mt-1">Listo para embalaje inmediato</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Primary Button */}
                <button
                  onClick={() => {
                    alert(`¡Muchas gracias por tu interés en ${perfume.name}! Esta hermosa tienda es un prototipo interactivo para Brisa Sur Aromas. Pronto habilitaremos la plataforma de compra completa.`);
                  }}
                  className={`cursor-pointer px-6 py-3.5 rounded-full font-display font-medium text-xs tracking-wider uppercase transition-all duration-300 text-center ${
                    isOutOfStock
                      ? "bg-brand-100 text-brand-400 cursor-not-allowed"
                      : "bg-brand-900 hover:bg-brand-950 text-white shadow-lg hover:shadow-brand-900/10 active:scale-97"
                  }`}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? "Agotado" : "Consultar Consultor"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
